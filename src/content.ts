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
 * Capa de projeto = composição de aparelhos sobre um fundo de atmosfera.
 * Posições e larguras em "cqw" (1cqw = 1% da largura da capa), então escala igual em qualquer tela.
 * A capa tem proporção 16:10 (altura = 62,5cqw).
 */
export type Device = {
  kind: 'monitor' | 'phone' | 'window'
  src: string
  x: number
  y: number
  w: number
  z?: number
}

export type Project = {
  name: string
  kind: string
  desc: string
  url: string
  bg: string // imagem minúscula, ampliada = fundo desfocado (atmosfera)
  year: string
  theme: { bg: string; fg: string; acc: string; tone: 'light' | 'dark' } // "mundo de cor" do projeto na seção
  devices: Device[] // composição de aparelhos da capa (16:10)
}

export const PROJECTS: Project[] = [
  {
    name: 'DOE+ RS',
    kind: 'Aplicativo',
    year: '2026',
    theme: { bg: '#c31f27', fg: '#f7ede7', acc: '#ffd9c9', tone: 'dark' },
    desc: 'Aplicativo digital de apoio à doação de sangue.',
    url: 'https://doe-mais-rs.vercel.app/',
    bg: '/projects/doe-bg.jpg',
    devices: [
      { kind: 'phone', src: '/projects/doe-login.webp', x: 13, y: 13, w: 21 },
      { kind: 'phone', src: '/projects/doe-locais.webp', x: 66, y: 13, w: 21 },
      { kind: 'phone', src: '/projects/doe-home.webp', x: 37.5, y: 5, w: 25, z: 2 },
    ],
  },
  {
    name: 'Bruto',
    kind: 'Site',
    year: '2026',
    theme: { bg: '#17110d', fg: '#f1eee7', acc: '#ff4b1f', tone: 'dark' },
    desc: 'Experiência digital para uma hamburgueria.',
    url: 'https://borapedir-delivery.vercel.app/bruto',
    bg: '/projects/bruto-bg.jpg',
    devices: [
      { kind: 'monitor', src: '/projects/bruto-desktop.webp', x: 7, y: 7, w: 72 },
      { kind: 'phone', src: '/projects/bruto-mobile.webp', x: 71, y: 14, w: 21, z: 2 },
    ],
  },
  {
    name: 'Marmoraria',
    kind: 'Web App',
    year: '2026',
    theme: { bg: '#d8d2c6', fg: '#0b0b0b', acc: '#ff4b1f', tone: 'light' },
    desc: 'Presença digital para uma empresa de marmoraria.',
    url: 'https://vertice-marmores.vercel.app/',
    bg: '/projects/marm-bg.jpg',
    devices: [
      { kind: 'monitor', src: '/projects/marm-hero.jpg', x: 8, y: 6, w: 74 },
      { kind: 'window', src: '/projects/marm-ilha.jpg', x: 59, y: 34, w: 36, z: 2 },
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
