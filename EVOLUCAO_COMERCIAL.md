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
- **Sexto projeto:** `src/App.tsx` possui `sixthProject = null`. Para ativar,
  fornecer nome, tipo, problema/objetivo, o que foi desenvolvido, natureza do
  projeto, link e arquivos de desktop/mobile ou imagem aprovada.
- **Natureza dos projetos:** Karoane está como comercial; DOE+ RS e Minha
  Rotina como autorais. Bruto e Vértice foram definidos conservadoramente como
  **Projeto de portfólio**, sem supor contratação. Confirmar antes de mudar
  para comercial ou demonstração.
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
- Projetos preservados e com objetivo, entrega e vínculo explicitados.
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
