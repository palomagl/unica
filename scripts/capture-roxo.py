#!/usr/bin/env python3
"""Captura ROXO publicado em desktop e celular, sem redesenhar a interface.

Executado apenas no CI da branch de revisão. Requer playwright + Pillow
instalados temporariamente no runner (não entram no bundle da landing).
"""
from __future__ import annotations

import base64
import io
import os
from pathlib import Path
import shutil
import sys
from xml.etree import ElementTree as ET
from PIL import Image, ImageOps

URL = "https://roxo-acaiteria.vercel.app/roxo"
SECOND_URL = "https://dashboard-three-khaki-68.vercel.app/"
ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "public" / "screens"
DEST.mkdir(parents=True, exist_ok=True)
BUDGET = 250 * 1024


def encoded_webp(raw: bytes, output_size: tuple[int, int], quality: int) -> str:
    image = Image.open(io.BytesIO(raw)).convert("RGB")
    resized = ImageOps.fit(image, output_size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.15))
    buf = io.BytesIO()
    resized.save(buf, "WEBP", quality=quality, method=6)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def frame_svg(kind: str, encoded: str) -> str:
    if kind == "desktop":
        return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1237" height="774" viewBox="0 0 1237 774" role="img" aria-label="Interface real publicada do ROXO em notebook">
<title>ROXO — loja de açaí no notebook</title>
<defs><clipPath id="roxo-screen"><rect x="95" y="48" width="1048" height="592" rx="7"/></clipPath></defs>
<rect x="71" y="23" width="1095" height="638" rx="21" fill="#242026" stroke="#56525B" stroke-width="5"/>
<rect x="88" y="42" width="1061" height="605" rx="10" fill="#101015"/>
<image x="95" y="48" width="1048" height="592" preserveAspectRatio="xMidYMid slice" clip-path="url(#roxo-screen)" href="data:image/webp;base64,{encoded}"/>
<path d="M16 660 L1221 660 L1165 719 Q1157 729 1137 729 L99 729 Q80 729 72 719Z" fill="#BEBBC1" stroke="#8A878F" stroke-width="3"/>
<path d="M476 660 L763 660 L737 678 L503 678Z" fill="#99969D"/>
<path d="M97 728 L1139 728" stroke="#656269" stroke-linecap="round" stroke-width="3"/>
</svg>'''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="393" height="790" viewBox="0 0 393 790" role="img" aria-label="Interface real publicada do ROXO no celular">
<title>ROXO — loja de açaí no celular</title>
<defs><clipPath id="roxo-phone-screen"><rect x="18" y="21" width="357" height="747" rx="35"/></clipPath></defs>
<rect x="5" y="5" width="383" height="780" rx="49" fill="#19181A" stroke="#36333B" stroke-width="5"/>
<image x="18" y="21" width="357" height="747" preserveAspectRatio="xMidYMid slice" clip-path="url(#roxo-phone-screen)" href="data:image/webp;base64,{encoded}"/>
<rect x="141" y="18" width="111" height="24" rx="12" fill="#19181A"/>
<rect x="145" y="773" width="103" height="5" rx="3" fill="#F7F3F9"/>
</svg>'''


def write_svg(kind: str, raw: bytes) -> Path:
    dims = (1048, 592) if kind == "desktop" else (357, 747)
    name = DEST / f"roxo-{kind}-alpha.svg"
    for quality in (82, 76, 69, 62, 55):
        encoded = encoded_webp(raw, dims, quality)
        svg = frame_svg(kind, encoded)
        if len(svg.encode("utf-8")) < BUDGET:
            ET.fromstring(svg)
            name.write_text(svg, encoding="utf-8")
            print(f"Captura {kind}: {name.stat().st_size} bytes, webp qualidade {quality}")
            return name
    raise RuntimeError(f"Não foi possível manter {kind} abaixo de 250 KB")


def main() -> int:
    from playwright.sync_api import sync_playwright

    chrome = shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser")
    if not chrome:
        print("Chrome não instalado; mantendo prévias existentes.")
        return 0

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(executable_path=chrome, headless=True, args=["--no-sandbox"])
            screenshots = {}
            for kind, viewport in (
                ("desktop", {"width": 1280, "height": 742}),
                ("mobile", {"width": 393, "height": 790}),
            ):
                context = browser.new_context(
                    viewport=viewport,
                    device_scale_factor=1,
                    is_mobile=kind == "mobile",
                    has_touch=kind == "mobile",
                    reduced_motion="reduce",
                    locale="pt-BR",
                )
                page = context.new_page()
                response = page.goto(URL, wait_until="domcontentloaded", timeout=45000)
                page.wait_for_timeout(4000)
                html = page.content().lower()
                title = page.title()
                code = response.status if response else 0
                print(f"ROXO {kind}: HTTP {code}, título: {title!r}")
                if code != 200 or "roxo" not in html:
                    print("Conteúdo inesperado; capturas atuais foram preservadas.")
                    browser.close()
                    return 0
                screenshots[kind] = page.screenshot(type="png", animations="disabled", full_page=False)
                context.close()

            # A segunda URL foi enviada separadamente: identificar apenas o título.
            # Não associar seu conteúdo ao ROXO sem confirmação.
            try:
                page = browser.new_page()
                resp = page.goto(SECOND_URL, wait_until="domcontentloaded", timeout=12000)
                print(f"LINK DO DASHBOARD: HTTP {resp.status if resp else 'sem resposta'}, título: {page.title()!r}")
                page.close()
            except Exception as exc:
                print(f"LINK DO DASHBOARD não identificado: {type(exc).__name__}")
            browser.close()

            for kind, raw in screenshots.items():
                write_svg(kind, raw)
        return 0
    except Exception as exc:
        # Sem screenshot real verificado, não alteramos as prévias do repositório.
        print(f"Captura indisponível; mantendo versões atuais: {exc}", file=sys.stderr)
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
