// Tudo que é texto/link editável da página mora aqui.

export const CONTACT = {
  // WhatsApp: DDI + DDD + número, só dígitos (55 51 99812-7367).
  whatsapp: '5551998127367',
  // TODO: perfil do Instagram (ex.: 'https://instagram.com/seuusuario'). Vazio = o link não aparece.
  instagram: '',
}

export const whatsappLink = (msg: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`

export const QUOTE_LINK = whatsappLink('Olá! Quero começar um projeto.')
export const IDEA_LINK = whatsappLink('Olá! Tenho uma ideia e quero conversar sobre ela.')

export const formatFrom = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`

/**
 * Parcelamento: preparado, mas desligado.
 * Quando integrar o checkout, preencha `installments` com o texto real
 * (ex.: 'ou em até 12x'). Nada é calculado nem inventado aqui.
 */
export type ServiceId = 'landing' | 'site' | 'webapp' | 'app' | 'custom'
export type Service = {
  id: ServiceId
  name: string
  from: number
  what: string
  cta: string
  href: string
  installments: string | null
}

export const SERVICES: Service[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    from: 999,
    what: 'Uma página profissional para apresentar, divulgar ou vender.',
    cta: 'Quero uma',
    href: whatsappLink('Olá! Quero um orçamento de Landing Page.'),
    installments: null,
  },
  {
    id: 'site',
    name: 'Site',
    from: 1699,
    what: 'Uma presença digital completa para empresas, marcas e profissionais.',
    cta: 'Quero um',
    href: whatsappLink('Olá! Quero um orçamento de Site.'),
    installments: null,
  },
  {
    id: 'webapp',
    name: 'Web App',
    from: 1999,
    what: 'Uma aplicação que funciona no celular e pode ser adicionada à tela inicial.',
    cta: 'Quero um',
    href: whatsappLink('Olá! Quero um orçamento de Web App.'),
    installments: null,
  },
  {
    id: 'app',
    name: 'Aplicativo',
    from: 3999,
    what: 'Aplicativo desenvolvido para publicação em lojas como Google Play.',
    cta: 'Quero um',
    href: whatsappLink('Olá! Quero um orçamento de Aplicativo.'),
    installments: null,
  },
  {
    id: 'custom',
    name: 'Aplicação personalizada',
    from: 2499,
    what: 'Uma solução criada especificamente para sua necessidade.',
    cta: 'Contar minha necessidade',
    href: whatsappLink('Olá! Tenho uma necessidade específica e quero conversar sobre uma solução personalizada.'),
    installments: null,
  },
]

/**
 * Cena de projeto = mockups reais (iPhone/MacBook) apoiados numa bancada de pedra, em perspectiva e com sombra projetada,
 * para não parecer um print. A bancada (foto de travertino) e a luz são as mesmas nos três; a composição muda.
 * Posições e larguras em "cqw" (1cqw = 1% da largura da moldura). Moldura 3:2 = altura de 66,7cqw.
 */
export type Device = {
  src: string
  x: number
  y: number
  w: number
  z?: number
  k?: number // profundidade: quanto o aparelho se move no parallax (maior = mais à frente)
  rx?: number // inclinação (graus) — o aparelho "deitado" na bancada, visto de cima em perspectiva
  ry?: number
  rz?: number // giro no plano
}

export type Project = {
  name: string
  kind: string
  desc: string
  url: string
  year: string
  devices: Device[] // composição de aparelhos da capa (16:10)
}

export const PROJECTS: Project[] = [
  {
    name: 'DOE+ RS',
    kind: 'Aplicativo',
    year: '2026',
    desc: 'Aplicativo digital de apoio à doação de sangue.',
    url: 'https://doe-mais-rs.vercel.app/',
    devices: [
      { src: '/projects/doe-login.webp', x: 6, y: 9, w: 24, rx: 30, rz: 16, k: 0.8 },
      { src: '/projects/doe-locais.webp', x: 62, y: 10, w: 24, rx: 28, rz: 9, k: 1 },
      { src: '/projects/doe-home.webp', x: 33, y: 3, w: 27, z: 2, rx: 26, rz: 12, k: 1.6 },
    ],
  },
  {
    name: 'Bruto',
    kind: 'Site',
    year: '2026',
    desc: 'Experiência digital para uma hamburgueria.',
    url: 'https://borapedir-delivery.vercel.app/bruto',
    devices: [
      { src: '/projects/bruto-laptop.webp', x: -3, y: 6, w: 72, rx: 8, ry: -20, rz: -2, k: 0.9 },
      { src: '/projects/bruto-phone.webp', x: 66, y: 12, w: 25, z: 2, rx: 30, rz: 18, k: 1.7 },
    ],
  },
  {
    name: 'Marmoraria',
    kind: 'Web App',
    year: '2026',
    desc: 'Presença digital para uma empresa de marmoraria.',
    url: 'https://vertice-marmores.vercel.app/',
    devices: [
      { src: '/projects/marm-laptop.webp', x: 9, y: 7, w: 80, rx: 8, ry: -20, rz: -2, k: 1 },
      { src: '/projects/marm-phone.webp', x: 72, y: 24, w: 19, z: 2, rx: 30, rz: 20, k: 1.7 },
    ],
  },
]

export const projectLink = (p: Project) => whatsappLink(`Olá! Vi o projeto ${p.name} e quero algo assim.`)

// Referência de movimento (landing conceitual, não é cliente).
export const BALY_URL = 'https://baly-sabores.vercel.app'

export const IDEA_EXAMPLES = [
  'Quero uma forma melhor de apresentar minha empresa.',
  'Tenho uma ideia de aplicativo.',
]
