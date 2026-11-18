#!/usr/bin/env python3
"""Validação visual da seção de projetos e das interações da ÚNICA.

Roda contra o build local; nenhuma screenshot ou dado de cliente é enviado.
"""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173/"
CASES = [(320, 720), (390, 844), (768, 900), (1024, 768), (1440, 900)]
PROJECTS = ("Karoane", "Bruto", "Vértice Mármores", "DOE+ RS", "Minha Rotina", "ROXO")

def check(condition, message):
    if not condition:
        raise AssertionError(message)

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path="/usr/bin/google-chrome",
        headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"],
    )
    try:
        for width, height in CASES:
            context = browser.new_context(
                viewport={"width":width,"height":height},
                reduced_motion="reduce",
                device_scale_factor=1,
            )
            page = context.new_page()
            page.goto(URL, wait_until="domcontentloaded", timeout=30000)
            page.wait_for_timeout(550)
            overflow = page.evaluate("document.documentElement.scrollWidth - innerWidth")
            check(overflow <= 1, f"{width}: rolagem horizontal de {overflow}px")
            for index, name in enumerate(PROJECTS):
                page.locator(".u-project-preview").nth(index).click()
                stage = page.locator("#projetos .u-project-visual")
                stage.scroll_into_view_if_needed()
                page.wait_for_timeout(230)
                check(page.locator("#projetos .u-project-copy h3").inner_text().strip()==name,
                      f"{width}: conteúdo não alternou para {name}")
                if name == "DOE+ RS":
                    continue
                check(page.locator("#projetos .u-device-laptop").count()==1,
                      f"{width}: notebook ausente em {name}")
                check(page.locator("#projetos .u-device-phone").count()==1,
                      f"{width}: celular ausente em {name}")
                result = page.evaluate("""() => {
                  const stage=document.querySelector('#projetos .u-project-visual').getBoundingClientRect();
                  const laptop=document.querySelector('#projetos .u-device-laptop').getBoundingClientRect();
                  const phone=document.querySelector('#projetos .u-device-phone').getBoundingClientRect();
                  return {
                    stage: {x:stage.x,y:stage.y,right:stage.right,bottom:stage.bottom},
                    laptop:{x:laptop.x,y:laptop.y,right:laptop.right,bottom:laptop.bottom},
                    phone:{x:phone.x,y:phone.y,right:phone.right,bottom:phone.bottom}
                  }
                }""")
                s=result["stage"]
                for kind in ("laptop","phone"):
                    d=result[kind]
                    for a,b,axis in ((d["y"],s["y"],"topo"),(d["bottom"],s["bottom"],"rodapé"),
                                     (d["x"],s["x"],"esquerda"),(d["right"],s["right"],"direita")):
                        limit=2
                        if axis in ("topo","esquerda"):
                            check(a >= b-limit, f"{width}: {kind} cortou no {axis} do {name}: {result}")
                        else:
                            check(a <= b+limit, f"{width}: {kind} cortou na {axis} do {name}: {result}")
            # Seletores e respostas devem ser utilizáveis por clique/toque.
            page.locator("#u-investment-tab-vendas").click()
            check(page.get_by_role("heading",name="Loja virtual",exact=True).count()==1,
                  f"{width}: catálogo de vendas não abre")
            check("5.900" in page.locator("#u-investment-results").inner_text(),
                  f"{width}: investimento da loja não aparece")
            page.get_by_role("button",name="Preciso pagar tudo de uma vez?").click()
            if width<=650:
                check("condições" in page.locator(".u-faq-mobile-answer").inner_text().lower(),
                      f"{width}: FAQ não abriu abaixo da pergunta")
            else:
                check("condições" in page.locator(".u-faq-response").inner_text().lower(),
                      f"{width}: FAQ não abriu na resposta lateral")
            print(f"PASS: {width}px, 6 projetos completos, catálogo e FAQ")
            if width in (390,1440):
                target=Path("visual-check")/f"unica-{width}-projetos.png"
                target.parent.mkdir(parents=True,exist_ok=True)
                page.locator("#projetos").scroll_into_view_if_needed()
                page.screenshot(path=str(target),full_page=False)
            context.close()
    finally:
        browser.close()
print("PASS: sem dispositivos cortados ou rolagem horizontal")
