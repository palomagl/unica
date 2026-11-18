#!/usr/bin/env python3
"""ROXO: mesmas molduras originais da Karoane, substituindo SOMENTE o conteúdo das telas.

Os dois SVGs da Karoane são a fonte única de notebook e celular.
Nenhum notebook/telefone novo é desenhado. Os dispositivos, sombra e recortes
mantêm os pixels da Karoane; ROXO entra nas coordenadas internas do display.
"""
import base64
import io
import re
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

URL = "https://roxo-acaiteria.vercel.app/roxo"
ROOT = Path(__file__).resolve().parent.parent / "public" / "screens"
BUDGET = 250 * 1024
ITEMS = [
    dict(
        name="desktop",
        source="karoane-desktop-alpha.svg",
        target="roxo-desktop-alpha.svg",
        width=1237, height=774,
        x=102, y=47, w=1037, h=647,
        viewport=dict(width=1200,height=748),
        scale=2,
        ratio="desktop",
    ),
    dict(
        name="mobile",
        source="karoane-mobile-alpha.svg",
        target="roxo-mobile-alpha.svg",
        width=393, height=790,
        x=23, y=19, w=347, h=746,
        viewport=dict(width=390,height=838),
        scale=2,
        ratio="phone",
    ),
]

def source_frame(item):
    svg = (ROOT / item["source"]).read_text()
    matched = re.search(r'data:image/webp;base64,([A-Za-z0-9+/=]+)', svg)
    if not matched:
        raise RuntimeError("Não encontrei o frame de referência da Karoane")
    return matched.group(1)

def webp_screenshot(raw, item):
    with Image.open(io.BytesIO(raw)) as im:
        # Screenshot em DPR 2, sem distorcer: recorta para a proporção do display.
        target_w, target_h = item["w"], item["h"]
        expected = target_w / target_h
        w,h = im.size
        current = w / h
        if current > expected:
            new_w = round(h * expected)
            left = (w-new_w)//2
            im = im.crop((left,0,left+new_w,h))
        else:
            new_h = round(w/expected)
            # Priorizar o topo de catálogo e cabeçalho, como na Karoane.
            im = im.crop((0,0,w,new_h))
        im = im.convert("RGB").resize((target_w,target_h),Image.Resampling.LANCZOS)
        for q in (87,83,79,74,68,62):
            result = io.BytesIO()
            im.save(result,format="WEBP",quality=q,method=6)
            yield base64.b64encode(result.getvalue()).decode("ascii"),q

def build(item, base, screenshot):
    w,h=item["width"],item["height"]
    x,y,sw,sh=(item[k] for k in ("x","y","w","h"))
    clip=f'<rect x="{x}" y="{y}" width="{sw}" height="{sh}"'
    if item["name"]=="mobile":clip+=' rx="32"'
    clip+="/>"
    overlay=f'<image x="{x}" y="{y}" width="{sw}" height="{sh}" preserveAspectRatio="none" clip-path="url(#screen)" href="data:image/webp;base64,{screenshot}"/>'
    if item["name"]=="mobile":
        # Notch e câmera originais ficam acima da tela ROXO, sem inventar nova moldura.
        on_top='<use href="#frame" clip-path="url(#notch)"/>'
        masks='<clipPath id="notch"><rect x="120" y="10" width="152" height="45"/></clipPath>'
    else:
        on_top=''
        masks=''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
            f'role="img" aria-label="ROXO no mesmo dispositivo padrão da Karoane">'
            f'<defs><clipPath id="screen">{clip}</clipPath>{masks}</defs>'
            f'<image id="frame" width="{w}" height="{h}" href="data:image/webp;base64,{base}"/>'
            f'{overlay}{on_top}</svg>')

def main():
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path="/usr/bin/google-chrome",
                                  headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
        new_contents=[]
        for item in ITEMS:
            context=browser.new_context(viewport=item["viewport"],device_scale_factor=item["scale"],
                is_mobile=item["name"]=="mobile",has_touch=item["name"]=="mobile",
                locale="pt-BR",reduced_motion="reduce")
            page=context.new_page()
            response=page.goto(URL,wait_until="domcontentloaded",timeout=45000)
            page.locator("body").wait_for()
            page.wait_for_timeout(3200)
            if not response or response.status!=200 or "ROXO" not in page.content().upper():
                raise RuntimeError(f"ROXO indisponível em {item['name']}")
            raw=page.screenshot(type="png",animations="disabled",full_page=False)
            base=source_frame(item)
            for screenshot,q in webp_screenshot(raw,item):
                svg=build(item,base,screenshot)
                if len(svg.encode("utf-8"))<BUDGET:
                    new_contents.append((item["target"],svg))
                    print(f"OK: {item['name']} {len(svg)} bytes, qualidade {q}; frame original Karoane preservado")
                    break
            else:
                raise RuntimeError(f"Imagem {item['name']} excedeu orçamento de 250KB")
            context.close()
        browser.close()
    for filename,svg in new_contents:
        (ROOT/filename).write_text(svg,encoding="utf8")
    print("Concluído: Karoane e ROXO usam exatamente a mesma moldura em ambas as telas.")

if __name__=="__main__":
    sys.exit(main() or 0)
