// ÚNICA — conteúdo essencial da nova landing.
export const CONTACT = {
  whatsapp: '5551998127367',
}
export const whatsappLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`

export const QUOTE_LINK = whatsappLink('Olá! Gostaria de conversar sobre uma solução digital para meu negócio.')
