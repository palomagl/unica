import { Logo } from './Logo'
import { HeroVisual } from './HeroVisual'
import { Btn } from './Btn'
import { Parallax } from './Parallax'
import { QUOTE_LINK, SERVICES } from '../content'
import { cssVars } from '../fx'

/**
 * Mobile: logo → frase → texto → CTA, e logo abaixo o vídeo em largura total.
 * Desktop: texto à esquerda, vídeo à direita, numa tela só.
 */
export function Hero() {
  return (
    <section id="top" data-tone="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 content-start gap-9 px-5 pb-0 pt-24 md:min-h-[100svh] md:grid-cols-12 md:content-center md:items-center md:gap-8 md:px-10 md:pb-14 md:pt-28">
        <div className="md:col-span-6">
          <Parallax speed={-0.05}>
            <Logo tone="dark" className="hero-logo -ml-[1%] w-[62%] max-w-[560px] md:w-full" />
          </Parallax>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,6.3vw,6rem)] leading-[0.95] md:mt-12">
            <span className="hero-line"><span style={cssVars({ '--d': '1s' })}>Ideias que</span></span>
            <span className="hero-line"><span style={cssVars({ '--d': '1.15s' })}>ganham <em className="text-signal">forma.</em></span></span>
          </h1>

          <p className="fade-in mt-4 max-w-sm leading-relaxed text-paper/70 md:mt-8" style={cssVars({ '--d': '1.7s' })}>
            Landing pages, sites, aplicações e produtos digitais desenvolvidos sob medida.
          </p>

          <div className="fade-in mt-6 md:mt-10" style={cssVars({ '--d': '1.9s' })}>
            <Btn href={QUOTE_LINK} variant="signal-on-dark">Começar um projeto</Btn>
          </div>
        </div>

        {/* No celular o vídeo sangra até as bordas da tela (anula o padding de 1.25rem). */}
        <div className="fade-in -mx-5 md:col-span-6 md:mx-0" style={cssVars({ '--d': '2.1s' })}>
          <HeroVisual />
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1400px] px-10 pb-6 md:block">
        <div className="label flex justify-between border-t border-paper/15 pt-4 text-ash">
          <span>A partir de R$ {SERVICES[0].from}</span>
          <span>Role ↓</span>
        </div>
      </div>
    </section>
  )
}
