# ÚNICA — acabamento comercial e mobile

## Branch e revisão
- Branch: `feat/unica-hero-investimento-duvidas-autoral`
- PR #7 em rascunho: revisar antes de mesclar à `main`.
- A landing existente, o iPhone animado, o seletor de cores, os seis projetos
  e o fechamento “Você imagina. A gente constrói.” foram preservados.

## Mudanças
- Hero: mesma direção visual, com frase em três linhas no celular.
- Investimento: **quatro pontos de partida** em um índice editorial,
  mostrando um único projeto em destaque por vez:
  - Landing page — a partir de R$ 700
  - Site para empresas — a partir de R$ 1.500
  - Loja virtual — a partir de R$ 5.900
  - Sistemas e apps — sob orçamento
- Outros serviços não deixam de existir; são conversados pelo WhatsApp.
- Dúvidas: quatro perguntas com respostas curtas e acessíveis; composição
  diferente do investimento, sem cartões de aparência genérica.
- Atalhos fixos de contato e, após rolagem, para voltar ao início.

## Canal de contato (confirmado)
WhatsApp profissional: **55 51 99187-2507**. Configuração em `src/content.ts`:
`5551991872507`. Todos os botões que usam `QUOTE_LINK` ou `whatsappLink`
apontam para ele, inclusive os CTAs contextuais de cada solução.

## Valores e condições
Os valores iniciais ficam centralizados em `src/commercial-content.ts`.
Não são pacotes fechados. Custos com domínio, hospedagem, terceiros e
manutenção são combinados separadamente. Evitar prometer prazos fixos
sem um escopo aprovado.

## Desempenho e qualidade
Nenhum pacote novo em produção; SVGs e imagens dos projetos preservados.
Os checks incluem build, auditoria de arquivos e Lighthouse desktop/mobile.
`scripts/check-portfolio-layout.py` executa verificação de navegador nas larguras
320, 360, 390, 430, 480, 600, 768, 900, 1024 e 1440 px, incluindo:
- Hero visível sem duplicação e sem rolagem horizontal
- WhatsApp correto e acessível
- Quatro bases de preço e botão de conversa contextual
- Dúvidas abre/fecha e navegação por teclado
- Seis projetos com dispositivos dentro do palco
- Botão voltar ao topo
- Capturas para revisão visual

Não realizar merge sem confirmar a composição real da prévia no celular.
