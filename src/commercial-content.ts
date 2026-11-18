// Valores em reais aprovados devem ser cadastrados APENAS aqui.
// null mantém "A definir" e evita publicar preços estimados.
export type InvestmentId = 'landing' | 'institucional' | 'loja' | 'personalizado'
export type InvestmentOption = {
  id: InvestmentId
  title: string
  summary: string
  deliverables: string
  benefit: string
  startingAtBRL: number | null
  customQuote?: boolean
}
export const investments: InvestmentOption[] = [
  {
    id: 'landing',
    title: 'Landing page',
    summary: 'Uma página com foco em apresentar uma oferta e abrir conversas.',
    deliverables: 'Estrutura, design, versão mobile e um caminho claro para entrar em contato.',
    benefit: 'Para quem precisa explicar o que vende sem fazer o visitante procurar demais.',
    startingAtBRL: null,
  },
  {
    id: 'institucional',
    title: 'Site institucional',
    summary: 'Seu negócio bem apresentado, com as informações certas no lugar certo.',
    deliverables: 'Páginas essenciais, serviços, projetos e canais de contato.',
    benefit: 'Ajuda quem está pesquisando a entender o que você faz e a confiar no seu trabalho.',
    startingAtBRL: null,
  },
  {
    id: 'loja',
    title: 'Loja virtual',
    summary: 'Uma experiência para mostrar produtos e facilitar pedidos.',
    deliverables: 'Catálogo navegável e fluxo de compra conforme a operação de cada loja.',
    benefit: 'Deixa a escolha mais simples e dá mais organização à venda online.',
    startingAtBRL: null,
  },
  {
    id: 'personalizado',
    title: 'Sistema ou aplicativo',
    summary: 'Uma solução criada em volta de um processo ou ideia específica.',
    deliverables: 'Funcionalidades e integrações definidas depois de entender o objetivo.',
    benefit: 'Ajuda a trocar tarefas improvisadas por um fluxo que faça sentido na prática.',
    startingAtBRL: null,
    customQuote: true,
  },
]
export const testimonials: Array<{
  quote: string
  name: string
  company: string
  approved: boolean
}> = [] // Não exibir até receber depoimentos reais autorizados.
