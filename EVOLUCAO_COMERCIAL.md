# ÚNICA — revisão do catálogo, dúvidas e portfólio

Esta revisão acontece **após** o merge das PRs #2 e #3.
Os ajustes estão na **PR #4**, sem publicação automática na `main`.

## O que permaneceu
- Hero e tipografia de destaque (somente texto lateral atualizado)
- Cores marrom/creme/verde-limão e seletor de paletas
- Conversa animada do iPhone
- Interação de serviços, identidade e fechamento “Você imagina. A gente constrói.”
- Seis projetos, links e imagens; layouts de notebook e celular reutilizados
- Número do WhatsApp definido em `src/content.ts` (não alterado)

## Investimento — valores configurados em `src/commercial-content.ts`
- Presença digital:
  - Landing page essencial: **R$ 700**
  - Landing page personalizada: **R$ 1.490**
  - Site para empresas: **R$ 1.500**
- Vendas online:
  - Catálogo digital: **R$ 990**
  - Cardápio com pedidos: **R$ 1.590**
  - Loja virtual: **R$ 5.900**
- Funcionalidades:
  - Site com agendamentos: **R$ 2.490**
  - Sistema personalizado: **Sob orçamento**
  - Aplicativo: **Sob orçamento**

Os preços são de entrada e pressupõem escopos definidos.
Domínio, hospedagem, terceiros e manutenção são tratados separadamente.
Cada item envia mensagem contextual pelo WhatsApp, sem alterar seu número.

## FAQ
- A seção “DO PRIMEIRO OI À ENTREGA” foi eliminada.
- Sete perguntas clicáveis, com uma resposta por vez.
- Desktop: perguntas à esquerda e resposta editorial à direita.
- Mobile: resposta aparece imediatamente abaixo da pergunta selecionada.
- Nenhum segundo iPhone, cards tradicionais nem accordion de biblioteca.

## Portfólio
- Restituída a altura/escala do palco dos mockups no desktop.
- CSS garante enquadramento nos pontos intermediários (celular largo/tablet).
- Textos mais compactos, sem barra vertical interna.
- Seletor de projetos agora tem miniaturas e nomes.
- O ROXO usa capturas da loja publicada, com molduras de MacBook Air e iPhone.
- Classificações “comercial / autoral / portfólio” não aparecem na interface,
  conforme pedido mais recente. ROXO mantém nota de demonstração, sem inventar resultados.

## Testes
A revisão inclui:
- `npm run perf:check`
- `npm run build` com checagem TypeScript
- `node scripts/build-audit.mjs`
- Lighthouse desktop e mobile
- `scripts/check-portfolio-layout.py`: Playwright confere os seis projetos,
  cortes de notebooks/celulares em diversas larguras, FAQ, valores do catálogo
  e ausência de rolagem horizontal indesejada.

## Pontos que merecem revisão visual antes do merge
- Posição dos mockups em telas 320, 390, 430, 480, 600, 768, 900, 1024 e 1440 px.
- Seletor de miniaturas em celulares pequenos.
- Composição editorial dos preços e navegação por categorias.
- Alinhamento e movimento das respostas da FAQ.
- Imagens do ROXO nos dispositivos, comparando com Bruto.
