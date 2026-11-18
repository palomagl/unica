# ÚNICA — revisão antes da prospecção

Documento de apoio técnico. O site preserva a identidade original, a navegação, os seis projetos, as animações, o seletor de cores e os componentes interativos.

## Serviços e valores exibidos
- Landing page — a partir de **R$ 699**
- Catálogo online — a partir de **R$ 1.499**
- Loja virtual — a partir de **R$ 4.990**
- Sistemas e apps — **sob orçamento**

Valores e textos são mantidos em `src/commercial-content.ts`. Os demais serviços e integrações são tratados conforme a proposta.

## Contato e abrangência
- Atendimento online para todo o Brasil.
- WhatsApp profissional: **+55 51 99187-2507**.
- Configuração central em `src/content.ts` (`5551991872507`).
- Em Projetos, além de conhecer cada trabalho, o visitante pode pedir pelo WhatsApp uma solução parecida; a mensagem identifica o projeto escolhido.

## Confiança, SEO e acessibilidade
- Nenhuma métrica comercial ou avaliação inventada; ROXO é identificado como demonstração.
- Metadados de compartilhamento atualizados, com `robots.txt` e `sitemap.xml`.
- Atalho de teclado para o conteúdo e preferência por movimento reduzido.
- Seis perguntas frequentes, respostas sobre investimento e contato por WhatsApp.

## Publicação
Executar `npm ci`, `npm run security:check`, `npm run perf:check` e `npm run build`. A CI de responsividade usa Playwright e verifica treze larguras (320–1920 px), ofertas, FAQs, seis projetos e seus links.

Não mesclar sem revisão da prévia desktop e mobile.
