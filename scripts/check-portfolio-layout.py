#!/usr/bin/env python3
"""Teste real no navegador: hero, 6 projetos, 4 investimentos, FAQ, links, atalhos e layout."""
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173/"
CASES = [(320, 720), (360, 760), (390, 844), (430, 932), (480, 820),
         (600, 900), (768, 900), (900, 850), (1024, 768), (1280, 800),
         (1440, 900), (1600, 900), (1920, 1080)]
PROJECTS = ["Karoane", "Bruto", "Vértice Mármores", "DOE+ RS", "Minha Rotina", "ROXO"]
OFFERS = [("Landing page", "R$ 700"), ("Site para empresas", "R$ 1.500"),
          ("Loja virtual", "R$ 5.900"), ("Sistemas e apps", "Sob orçamento")]
PHONE = "5551991872507"


def check(ok, text):
    if not ok:
        raise AssertionError(text)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path="/usr/bin/google-chrome",
        headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"],
    )
    try:
        for width, height in CASES:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                device_scale_factor=1,
                reduced_motion="reduce",
                locale="pt-BR",
            )
            page = context.new_page()
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.goto(URL, wait_until="domcontentloaded", timeout=30000)
            page.wait_for_timeout(600)
            overflow = page.evaluate("document.documentElement.scrollWidth - innerWidth")
            check(overflow <= 1, f"{width}px: rolagem horizontal de {overflow}px")

            # Hero tem uma única versão visível: 3 linhas no celular, desktop intacto.
            mobile = page.locator(".u-heading-mobile")
            desktop = page.locator(".u-heading-desktop")
            check(mobile.is_visible() if width <= 600 else desktop.is_visible(),
                  f"{width}px: título responsivo errado")
            check(not (desktop.is_visible() and mobile.is_visible()), f"{width}px: dois títulos visíveis")
            if width <= 600:
                spans = mobile.locator(":scope > span")
                check(spans.count() == 3, "Hero móvel precisa de três linhas")
                for i in range(3):
                    r = spans.nth(i).bounding_box()
                    check(r is not None and r["x"] >= -1 and r["x"] + r["width"] <= width + 1,
                          f"{width}px: linha {i+1} do hero extrapolou largura: {r}")

            # Botões de WhatsApp: nenhum contato antigo.
            links = page.locator('a[href*="wa.me/"]').evaluate_all(
                "(nodes) => nodes.map(n => n.getAttribute('href'))"
            )
            check(links and all("wa.me/" + PHONE in link for link in links),
                  f"{width}px: contato de WhatsApp não corresponde ao profissional")
            check(page.locator(".u-floating-whatsapp").is_visible(),
                  f"{width}px: WhatsApp fixo não aparece")

            # Nova composicao: 4 cards alongados em desktop, modal de detalhes.
            # No mobile, os detalhes ficam dentro do card selecionado.
            cards = page.locator(".u-investment-card")
            check(cards.count() == 4, f"{width}px: devem existir quatro cards")
            check("u-investment-card--entry" in cards.first.get_attribute("class"),
                  f"{width}px: landing deve ser destacada")
            check("u-investment-card--bespoke" in cards.nth(3).get_attribute("class"),
                  f"{width}px: sistemas devem ter estilo proprio")
            heading = page.locator("#u-investment-title")
            check("Escolha como" in heading.inner_text() and "começar." in heading.inner_text(),
                  f"{width}px: título do investimento errado")
            if width >= 1041:
                first = cards.first.bounding_box()
                fourth = cards.last.bounding_box()
                check(first is not None and fourth is not None and fourth["x"] > first["x"] + first["width"],
                      f"{width}px: cards precisam ficar na mesma linha")
            for i, (title, expected_value) in enumerate(OFFERS):
                card = cards.nth(i)
                check(card.locator("h3").inner_text().strip() == title,
                      f"{width}px: opcao incorreta: {title}")
                val = "".join(card.locator(".u-investment-card-value strong").inner_text().split())
                check("".join(expected_value.split()) in val,
                      f"{width}px: valor incorreto de {title}")
                trigger = card.locator(".u-investment-card-toggle")
                trigger.click()
                check(trigger.get_attribute("aria-expanded") == "true",
                      f"{width}px: detalhe nao abriu em {title}")
                if width <= 700:
                    detail = card.locator(".u-investment-card-mobile-detail")
                    check(detail.is_visible() and detail.locator("li").count() == 3,
                          f"{width}px: accordion mobile nao abriu: {title}")
                    check(page.locator(".u-investment-dialog").is_hidden(),
                          f"{width}px: modal desktop apareceu no celular")
                else:
                    detail = page.locator(".u-investment-dialog")
                    check(detail.is_visible() and detail.locator("li").count() == 3,
                          f"{width}px: modal nao abriu: {title}")
                    check(title in detail.locator("h3").inner_text(),
                          f"{width}px: modal apresentou outro serviço")
                check("wa.me/" + PHONE in detail.locator(".u-price-detail-cta").get_attribute("href"),
                      f"{width}px: link WhatsApp incorreto em {title}")
                if width <= 700:
                    trigger.click()
                else:
                    page.locator(".u-investment-dialog-top button").click()
                check(page.locator(".u-investment-dialog").count() == 0 and
                      page.locator(".u-investment-card-mobile-detail .u-price-explanation").count() == 0,
                      f"{width}px: detalhes nao fecharam")
            if width >= 701 and width == 1440:
                cards.first.locator(".u-investment-card-toggle").click()
                page.keyboard.press("Escape")
                check(page.locator(".u-investment-dialog").count() == 0,
                      "Escape nao fecha detalhes")

            # FAQ: quatro perguntas com expansão e fechamento.
            questions = page.locator(".u-faq-entry button")
            check(questions.count() == 4, f"{width}px: perguntas demais")
            questions.nth(1).click()
            check(page.locator(".u-faq-answer").count() == 1,
                  f"{width}px: a segunda dúvida não abre")
            questions.nth(1).click()
            check(page.locator(".u-faq-answer").count() == 0,
                  f"{width}px: dúvida não fecha")

            if width == 390:
                trigger = cards.nth(1).locator(".u-investment-card-toggle")
                trigger.focus()
                page.keyboard.press("Enter")
                check(trigger.get_attribute("aria-expanded") == "true",
                      "Accordion nao responde ao teclado")
                trigger.click()
                page.locator(".u-faq-entry button").first.focus()
                page.keyboard.press("Enter")
                check(page.locator(".u-faq-answer").count() == 1,
                      "FAQ nao responde ao teclado")

            # Carrossel: seis projetos, dispositivos dentro do palco.
            check(page.locator(".u-project-preview").count() == 6, "Faltam projetos")
            for index, name in enumerate(PROJECTS):
                page.locator(".u-project-preview").nth(index).click()
                stage = page.locator("#projetos .u-project-visual")
                stage.scroll_into_view_if_needed()
                page.wait_for_timeout(95)
                check(page.locator("#projetos .u-project-copy h3").inner_text().strip() == name,
                      f"{width}px: projeto {name} incorreto")
                if name == "DOE+ RS":
                    continue
                result = page.evaluate("""() => {
                  let rect = sel => {
                    let r=document.querySelector(sel).getBoundingClientRect();
                    return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};
                  };
                  return {stage:rect('#projetos .u-project-visual'),
                    laptop:rect('#projetos .u-device-laptop'),
                    phone:rect('#projetos .u-device-phone')};
                }""")
                stage_bounds = result["stage"]
                for kind in ("laptop", "phone"):
                    el = result[kind]
                    check(el["x"] >= stage_bounds["x"] - 3 and el["right"] <= stage_bounds["right"] + 3 and
                          el["y"] >= stage_bounds["y"] - 3 and el["bottom"] <= stage_bounds["bottom"] + 3,
                          f"{width}px: {kind} cortou no {name}: {result}")

            # Topo aparece após rolagem, botão realmente leva ao começo.
            page.evaluate("window.scrollTo({top: 1250, behavior: 'instant'})")
            page.wait_for_timeout(210)
            btn = page.locator(".u-floating-top")
            check(btn.is_visible(), f"{width}px: botão voltar ao topo não apareceu")
            btn.click()
            page.wait_for_timeout(200)
            check(page.evaluate("window.scrollY") < 10, f"{width}px: voltar ao topo não funciona")
            check(not errors, f"{width}px: erro de runtime: {errors}")
            if width in (320, 390, 768, 1440, 1920):
                folder = Path("visual-check")
                folder.mkdir(exist_ok=True)
                page.locator("#investimento").screenshot(path=str(folder / f"investimento-{width}.png"), animations="disabled")
                page.locator("#duvidas").screenshot(path=str(folder / f"duvidas-{width}.png"), animations="disabled")
                page.evaluate("window.scrollTo(0,0)")
                page.screenshot(path=str(folder / f"hero-{width}.png"))
            print(f"PASS: {width}px — hero, WhatsApp, investimentos, FAQ, seis projetos, topo, sem overflow")
            context.close()
    finally:
        browser.close()
print("PASS: 13 larguras, com movimento reduzido e sem erros de runtime")
