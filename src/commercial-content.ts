// ÚNICA — quatro pontos de partida aprovados para exibição na landing.
// Serviços complementares e escopos especiais são apresentados via WhatsApp.
// Valores são iniciais; hospedagem, domínio, integrações e manutenção à parte.
export type InvestmentOption = {
  id: string
  title: string
  summary: string
  startingAtBRL: number | null
  note?: string
}
export const investments: InvestmentOption[] = [
  {
    id: 'landing',
    title: 'Landing page',
    summary: 'Uma página para apresentar sua marca, ideia ou serviço e abrir conversas.',
    startingAtBRL: 700,
    note: 'Soluções personalizadas têm investimento próprio.',
  },
  {
    id: 'site',
    title: 'Site para empresas',
    summary: 'Seu negócio com as informações certas, bem organizado e fácil de encontrar.',
    startingAtBRL: 1500,
    note: 'Páginas e recursos definidos na proposta.',
  },
  {
    id: 'loja',
    title: 'Loja virtual',
    summary: 'Produtos, carrinho, pagamentos e pedidos num só lugar, de acordo com sua operação.',
    startingAtBRL: 5900,
    note: 'Implantação com escopo delimitado.',
  },
  {
    id: 'personalizado',
    title: 'Sistemas e apps',
    summary: 'Uma solução pensada para processos, necessidades e ideias que não cabem no padrão.',
    startingAtBRL: null,
    note: 'Escopo e investimento definidos em conversa.',
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
