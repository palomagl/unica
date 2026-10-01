import { CONTACT, QUOTE_LINK, whatsappLink } from '../content'
import { Btn } from './Btn'
import { Logo } from './Logo'
import { Reveal } from './Reveal'
import { Words } from './Words'

export function FinalCTA() {
  return (
    <footer id="contato" data-tone="dark" className="overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10 md:pt-36">
        <Reveal className="text-center">
          <Logo tone="dark" className="mx-auto w-[88%] max-w-[900px]" />
        </Reveal>
        <div className="mt-10 text-center md:mt-20">
          <Words text="Tem uma ideia?" className="font-display text-4xl leading-tight md:text-7xl" />
          <Reveal delay={200}>
            <p className="mt-2 font-display text-2xl text-paper/70 md:text-5xl">Vamos colocar ela no mundo.</p>
            <div className="mt-9 md:mt-12"><Btn href={QUOTE_LINK} variant="signal-on-dark">Começar meu projeto</Btn></div>
          </Reveal>
        </div>

        <div className="label mt-16 flex items-center justify-between gap-6 border-t border-paper/15 py-5 md:mt-28">
          <div className="flex gap-8">
            <a href={whatsappLink('Olá!')} target="_blank" rel="noreferrer" className="ulink py-2">WhatsApp</a>
            {CONTACT.instagram && (
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="ulink py-2">Instagram</a>
            )}
          </div>
          <p className="text-ash">© {new Date().getFullYear()} ÚNICA</p>
        </div>
      </div>
    </footer>
  )
}
