# ÚNICA — evolução comercial (revisão)

Este branch não substitui a landing. O hero, seletor de cores, conversa animada,
marca, animações originais e fechamento foram mantidos.

## Antes de publicar

- **WhatsApp:** o número atual em `src/content.ts` permanece **5551998127367**.
  Confirmar com a responsável que é o número correto antes da publicação.
- **Valores:** em `src/commercial-content.ts`, as três categorias têm
  `startingAtBRL: null`, exibindo **A definir**, nunca valores inventados.
  Informar os valores autorizados em reais para landing, institucional e loja.
  Sistemas e aplicativos permanecem **Sob orçamento**.
- **Sexto projeto:** ROXO — Açaí do seu jeito incluído, com capturas do site
  público em desktop e celular, mesmos dispositivos e efeitos dos outros.
  O ROXO é uma loja demonstrativa; não inferir vendas nem resultados reais.
- **Classificação dos projetos:** rótulos de comercial/autoral/portfólio
  removidos da interface por solicitação. Não incluir promessas ou números.
- **Links:** ROXO abre https://roxo-acaiteria.vercel.app/roxo e Minha Rotina
  abre https://dashboard-three-khaki-68.vercel.app/, conforme páginas publicadas.
- **Depoimentos:** `testimonials = []`, e o componente não renderiza
  enquanto não houver autorização e conteúdo real.
- **Imagem social:** reutiliza `/unica-logo-black.png`, que já existe.
  Convém substituir futuramente por uma capa 1200×630 aprovada, sem alterar
  o layout da landing.

## Comportamento

- Menu desktop e mobile: Projetos, Soluções, Investimento, Contato.
- A seção de cores continua disponível no corpo do site.
- Hero intacto; CTA principal atualizado para **Começar um projeto**.
- Quatro opções originais de serviços mantidas, textos revisados.
- Seis projetos preservados, com descrições objetivas e links quando disponíveis, sem selos classificatórios.
- Investimento interativo com preços em configuração central.
- Método editorial com quatro etapas, sem cards genéricos.
- Depoimentos condicionais e nenhuma avaliação falsa.
- CTAs usam o contato existente; novo seletor também preserva o número.

## Verificações

A CI inclui `npm ci`, `npm run perf:check`, `npm run build`,
`node scripts/build-audit.mjs` e Lighthouse desktop/mobile.

Além dos testes automatizados, validar manualmente em Chrome/Safari reais:
menu mobile, iPhone com som opcional, troca de paletas, controles do
portfólio, foco por teclado, 320/360/390/430/768/1024/1440 px,
preferência de movimento reduzido e links externos.

Não foi adicionado nenhum pacote de produção.
