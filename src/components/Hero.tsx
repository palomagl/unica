import { useEffect, useRef } from 'react'
import { Logo } from './Logo'
import { Btn } from './Btn'
import { QUOTE_LINK, SERVICES, formatFrom } from '../content'
import { prefersReducedMotion, subscribe } from '../fx'

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n))
const ease = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const LOGO = { w: 920, h: 370 }
const ZOOM = 7 // quantas vezes o logo cresce antes de se dissolver no vídeo

/**
 * Entrada do site: tela preta com o ÚNICA gigante e branco.
 * Ao rolar, o logo cresce reto, sempre centralizado, e se dissolve em preto, onde aparece o título. A página rola normalmente (nada de scroll hijacking).
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const knock = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const final = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const stage = el?.firstElementChild as HTMLElement | null
    const kn = knock.current
    const wrap = logoRef.current
    const it = intro.current
    const fn = final.current
    if (!el || !stage || !kn || !wrap || !it || !fn) return
    if (prefersReducedMotion()) {
      el.classList.add('hx-static')
      return
    }
    const logoWrap = wrap
    return subscribe(() => {
      const r = el.getBoundingClientRect()
      if (r.bottom < -50) return
      const vh = stage.offsetHeight
      const vw = innerWidth
      const pin = Math.max(1, el.offsetHeight - vh)
      const prog = clamp(-r.top / pin)
      const k = clamp(prog / 0.6) // fase de expansão
      const e = ease(k)
      const small = vw < 768

      const w0 = small ? vw * 0.88 : Math.min(vw * 0.56, vh * 1.05, 1000) // largura do logo em repouso
      const w = w0 * Math.pow(ZOOM, e) // zoom exponencial = velocidade constante, sem deslizar de lado
      const cy = lerp(vh * (small ? 0.36 : 0.4), vh / 2, e) // o logo sobe de leve para o centro enquanto cresce

      kn.style.setProperty('--mw', `${w.toFixed(1)}px`)
      kn.style.setProperty('--ml', `${(vw / 2 - w / 2).toFixed(1)}px`)
      kn.style.setProperty('--mt', `${(cy - (w * LOGO.h) / LOGO.w / 2).toFixed(1)}px`)
      const fade = 1 - clamp((e - 0.45) / 0.5) // preto e letras brancas se dissolvem juntos, revelando o vídeo
      logoWrap.style.opacity = fade.toFixed(3)
      logoWrap.style.visibility = fade <= 0 ? 'hidden' : 'visible'

      const ko = 1 - clamp(k * 4)
      const kt = clamp((k - 0.65) / 0.35)
      it.style.opacity = ko.toFixed(3)
      it.style.visibility = ko <= 0 ? 'hidden' : 'visible'
      fn.style.opacity = kt.toFixed(3)
      fn.style.transform = `translate3d(0, ${((1 - kt) * 28).toFixed(1)}px, 0)`
      fn.style.visibility = kt <= 0.02 ? 'hidden' : 'visible'
    })
  }, [])

  return (
    <section id="top" data-tone="dark" className="relative bg-ink text-paper">
      <div ref={root} className="hx">
        <div className="hx-stage">
          {/* O ÚNICA branco: um painel branco com o logo vazado em um painel preto */}
          <div ref={logoRef} className="hero-logo absolute inset-0 z-10">
            <div className="absolute inset-0 bg-paper" />
            <div ref={knock} className="knock" aria-hidden />
          </div>
          <Logo tone="dark" className="hx-staticlogo" />

          {/* Entrada: o que a ÚNICA vende, o preço e o CTA, já na primeira tela */}
          <div ref={intro} className="hx-intro">
            <p className="fade-in mx-auto max-w-md text-balance text-base leading-relaxed text-paper/75 md:text-lg" style={{ '--d': '1.6s' } as React.CSSProperties}>
              Landing pages, sites, aplicações e produtos digitais desenvolvidos sob medida.
            </p>
            <div className="fade-in mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4" style={{ '--d': '1.8s' } as React.CSSProperties}>
              <Btn href={QUOTE_LINK} variant="signal-on-dark">Começar um projeto</Btn>
              <span className="label text-ash">A partir de {formatFrom(SERVICES[0].from)}</span>
            </div>
            <span className="hx-cue fade-in" style={{ '--d': '2.2s' } as React.CSSProperties} aria-hidden>Role</span>
          </div>

          {/* Depois do zoom: o título sobre o vídeo */}
          <div ref={final} className="hx-final">
            <h1 className="hx-title">
              Ideias que <em className="text-signal">ganham forma.</em>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-8">
              <Btn href={QUOTE_LINK} variant="signal-on-dark">Começar um projeto</Btn>
              <a href="#projetos" className="ulink text-sm font-medium">Ver projetos →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
