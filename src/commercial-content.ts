// ÚNICA — catálogo comercial centralizado. Valores de entrada informados pela responsável.
// Os preços não são pacotes fechados: escopo, recursos e serviços externos são avaliados na proposta.
export type InvestmentCategoryId = 'presenca' | 'vendas' | 'funcionalidades'
export type InvestmentOption = {
  id: string
  category: InvestmentCategoryId
  title: string
  summary: string
  startingAtBRL: number | null
  details?: string
}
export const investmentCategories: { id: InvestmentCategoryId; label: string; note: string }[] = [
  { id: 'presenca', label: 'Presença digital', note: 'Para ser encontrado e bem apresentado.' },
  { id: 'vendas', label: 'Vendas online', note: 'Para facilitar escolhas e pedidos.' },
  { id: 'funcionalidades', label: 'Funcionalidades', note: 'Para resolver o que seu negócio precisa.' },
]

export const investments: InvestmentOption[] = [
  {
    id: 'landing-essencial', category: 'presenca', title: 'Landing page essencial',
    summary: 'Uma página simples e responsiva para apresentar sua oferta e direcionar para o WhatsApp.',
    startingAtBRL: 700,
  },
  {
    id: 'landing-personalizada', category: 'presenca', title: 'Landing page personalizada',
    summary: 'Identidade mais exclusiva, elementos próprios e interações pensadas para sua marca.',
    startingAtBRL: 1490,
  },
  {
    id: 'site-empresas', category: 'presenca', title: 'Site para empresas',
    summary: 'Serviços, diferenciais, informações e contato organizados de um jeito claro.',
    startingAtBRL: 1500,
    details: 'Quantidade de páginas e funcionalidades definida na proposta.',
  },
  {
    id: 'catalogo', category: 'vendas', title: 'Catálogo digital',
    summary: 'Produtos com fotos e categorias, com pedidos direcionados ao WhatsApp.',
    startingAtBRL: 990,
    details: 'Sem checkout online no escopo inicial.',
  },
  {
    id: 'cardapio', category: 'vendas', title: 'Cardápio com pedidos',
    summary: 'Cardápio digital com categorias e montagem de pedidos para envio por WhatsApp.',
    startingAtBRL: 1590,
    details: 'Gestão avançada e pagamentos online são orçados à parte.',
  },
  {
    id: 'loja', category: 'vendas', title: 'Loja virtual',
    summary: 'E-commerce com catálogo, busca, carrinho, checkout, pagamentos, frete básico e painel de produtos e pedidos.',
    startingAtBRL: 5900,
    details: 'Implantação de escopo delimitado com soluções existentes; integrações especiais e recursos avançados são orçados à parte.',
  },
  {
    id: 'agendamento', category: 'funcionalidades', title: 'Site com agendamentos',
    summary: 'Site integrado a uma ferramenta de agenda para profissionais e estabelecimentos.',
    startingAtBRL: 2490,
    details: 'O valor inicial utiliza uma solução de agenda existente, sem desenvolver uma plataforma do zero.',
  },
  {
    id: 'sistema', category: 'funcionalidades', title: 'Sistema personalizado',
    summary: 'Controle de operações, organização de informações e automação de processos próprios.',
    startingAtBRL: null,
  },
  {
    id: 'aplicativo', category: 'funcionalidades', title: 'Aplicativo',
    summary: 'Aplicativos e plataformas definidos pelas funcionalidades, público e objetivos do projeto.',
    startingAtBRL: null,
  },
]

export const faqItems = [
  {
    question: 'Quanto tempo demora para meu projeto ficar pronto?',
    answer: 'Depende do escopo. Uma landing page simples costuma levar de 5 a 7 dias úteis; um site empresarial, de 10 a 20; e uma loja virtual básica, de 15 a 30. Sistemas e aplicativos têm cronograma próprio. São estimativas confirmadas na proposta, depois de definirmos o escopo e recebermos os materiais.',
  },
  {
    question: 'Como funciona a contratação?',
    answer: 'Conversamos sobre a ideia, entendemos o que o negócio precisa e apresentamos uma proposta com funcionalidades, investimento, prazo e condições. Depois da aprovação, começamos o desenvolvimento.',
  },
  {
    question: 'Preciso pagar tudo de uma vez?',
    answer: 'As condições são definidas na proposta. Dependendo do projeto, podemos combinar o pagamento em etapas.',
  },
  {
    question: 'Domínio e hospedagem estão incluídos?',
    answer: 'Domínio, hospedagem, banco de dados e outros serviços externos dependem do projeto. Esses custos são apresentados separadamente e, preferencialmente, contratados em nome do cliente.',
  },
  {
    question: 'E a manutenção depois da entrega?',
    answer: 'Suporte e manutenção podem ser contratados separadamente, conforme o projeto, a frequência das atualizações e o acompanhamento necessário.',
  },
  {
    question: 'Posso pedir alterações depois que ficar pronto?',
    answer: 'Sim. As revisões previstas na proposta estão incluídas. Alterações posteriores, novas funcionalidades e atualizações são avaliadas e orçadas separadamente.',
  },
  {
    question: 'Vocês criam algo fora do catálogo?',
    answer: 'Sim. Podemos avaliar ideias, processos e necessidades específicas e propor uma solução personalizada.',
  },
]

export const testimonials: Array<{
  quote: string
  name: string
  company: string
  approved: boolean
}> = [] // Nenhum depoimento fictício.
