<p align="center">
  <img src="./public/unica-logo-black.png" alt="Símbolo da ÚNICA — Estúdio Digital" width="104" />
</p>

<h1 align="center">ÚNICA<span>®</span></h1>
<p align="center"><strong>Soluções digitais que movem negócios.</strong></p>
<p align="center">
  Design com personalidade. Tecnologia com propósito.<br />
  Sites, lojas virtuais, sistemas e experiências digitais pensadas para a vida real.
</p>

<p align="center">
  <a href="https://unica-solucoes.vercel.app/"><strong>Conhecer a landing</strong></a>
  &nbsp;·&nbsp;
  <a href="#o-que-tem-aqui">Explorar o projeto</a>
  &nbsp;·&nbsp;
  <a href="#rodar-localmente">Rodar localmente</a>
</p>

---

## Mais do que uma vitrine

A ÚNICA é um estúdio digital que transforma desafios de negócios em experiências simples de usar e marcantes de lembrar. Esta landing é a própria demonstração do nosso jeito de trabalhar: **tipografia forte, identidade reconhecível, movimento com intenção e navegação pensada para celular.**

Nada de layout genérico de agência. Cada seção tem uma função e uma linguagem visual própria, sem perder o fio da marca.

## O que tem aqui

| Experiência | O que ela faz |
| :--- | :--- |
| **Hero autoral** | Apresenta a marca com tipografia de impacto e composição própria. |
| **Soluções interativas** | Mostra diferentes formas de ajudar um negócio sem uma grade de cards tradicionais. |
| **Conversa animada** | Simulação de atendimento num iPhone, com controles e som opcional. |
| **Cores em movimento** | Permite experimentar acentos de cor sem mudar a identidade principal. |
| **Projetos** | Seis trabalhos com capturas em notebook/celular e navegação responsiva. |
| **Investimento** | Quatro pontos de partida; detalhes aparecem por seleção, sem tabela interminável. |
| **Dúvidas** | Respostas objetivas e expansíveis, acessíveis por teclado. |
| **Contato** | Atalhos para WhatsApp e botão de retorno ao topo. |

### Projetos apresentados

**Karoane** · loja virtual &nbsp; / &nbsp; **Bruto** · experiência de pedidos &nbsp; / &nbsp; **Vértice Mármores** · visualização e orçamento &nbsp; / &nbsp; **DOE+ RS** · doação de sangue &nbsp; / &nbsp; **Minha Rotina** · organização pessoal &nbsp; / &nbsp; **ROXO** · demonstração de loja de açaí.

Os links e as capturas ficam na seção **Projetos** da landing. O ROXO é uma demonstração; nenhuma métrica de vendas ou depoimento fictício é apresentado.

## Identidade visual

A base é **marrom quente + creme + verde-limão**, com Hanken Grotesk, contrastes bem definidos, formas gráficas e animações curtas. O seletor permite testar outros acentos sem criar outra marca.

A interface foi construída com atenção especial à **legibilidade em celulares pequenos**, imagens carregadas sob demanda, preferência por movimento reduzido e navegação por teclado.

## Tecnologias

`React` · `TypeScript` · `Vite` · `CSS autoral` · `Vercel`

Fontes servidas localmente via `@fontsource`. Sem bibliotecas pesadas de animação nem backend desnecessário para uma landing institucional.

### Estrutura

```text
src/
  App.tsx                  # Hero, identidade, navegação e projetos
  content.ts              # Canal de contato centralizado
  commercial-content.ts   # Soluções, valores e perguntas
  studio.css              # Linguagem visual da landing
  components/
    Conversation.tsx       # iPhone animado
    SolutionsShowcase.tsx  # Apresentação interativa de serviços
    CommercialSections.tsx # Investimento e dúvidas
public/
  screens/                 # Capturas otimizadas dos projetos
scripts/
  perf-check.mjs           # Verificação de imagens e orçamento
  security-check.mjs       # Auditoria de proteções essenciais
vercel.json                # Cabeçalhos de segurança e cache
```

## Rodar localmente

Requisitos: **Node.js 22+** e npm.

```bash
git clone https://github.com/palomagl/unica.git
cd unica
npm ci
npm run dev
```

Para conferir a versão de produção:

```bash
npm run perf:check
npm run security:check
npm run build
npm run preview
```

O build é estático, e a Vercel serve os arquivos gerados em `dist/`. As verificações de CI incluem também teste de navegador em várias larguras de tela.

## Conteúdo e manutenção

- **WhatsApp:** altere apenas `src/content.ts`; mantenha links e textos de fallback sincronizados.
- **Preços e dúvidas:** edite `src/commercial-content.ts`; publique somente valores e informações aprovados.
- **Projetos:** adicione dados reais em `src/App.tsx` e capturas leves em `public/screens/`.
- **Cores e composição:** preserve os tokens existentes e valide alterações em desktop **e** celular.
- **Mudanças maiores:** abra uma pull request, revise a prévia Vercel e só então publique.

## Segurança, privacidade e qualidade

Esta é uma **landing pública sem login, banco de clientes ou processamento de pagamentos**. O site não deve guardar dados pessoais no navegador nem conter chaves privadas no código. O atendimento começa somente após a pessoa escolher abrir o WhatsApp.

As proteções incluem:

- **CSP restritiva:** scripts apenas da própria origem, sem `eval` ou JavaScript inline; a exceção para estilos de elementos atende aos efeitos controlados pela interface.
- **Proteção contra incorporação em iframe**, `nosniff`, referrer policy, permissões de navegador restritas e HTTPS/HSTS na hospedagem.
- **Links externos protegidos** com `noopener noreferrer`.
- **Arquivos estáticos sem source maps de produção** e imagens otimizadas.
- **CI de segurança** para conferir cabeçalhos, padrões de risco e vulnerabilidades nas dependências.
- **Dependabot** para revisão recorrente das dependências e GitHub Actions.

> Segurança é um processo contínuo. Configuração de repositório, permissões da conta GitHub/Vercel, domínio, MFA e atualizações também precisam ser mantidos em dia. Não existe “site invulnerável”.

---

<p align="center"><strong>Você imagina. A gente constrói.</strong></p>
<p align="center"><a href="https://unica-solucoes.vercel.app/">ÚNICA — Estúdio Digital</a></p>

<sub>Projeto e identidade reservados à ÚNICA. Este repositório não concede licença de reutilização do design, código ou marca.</sub>
