import { useEffect, useRef } from 'react'
import { BALY_URL, PROJECTS, QUOTE_LINK, projectLink, type Project } from '../content'
import { Btn } from './Btn'
import { Cover } from './Cover'
import { CtaStrip } from './CtaStrip'
import { prefersReducedMotion, subscribe, useMediaQuery } from '../fx'

const N = PROJECTS.length
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n))
const ease = (t: number) => t * t * (3 - 2 * t)

// Logo (920×370) e o ponto dentro das letras (perna do "A") para onde o zoom "entra".
const LOGO = { w: 920, h: 370 }
const ANCHOR = { x: 785, y: 229, r: 26.2 } // r = raio do maior círculo cabendo na letra

/**
 * Uma cena de tela cheia por projeto. A página rola normalmente: cada cena fica "presa" por um trecho
 * e o aparelho sobe de baixo. A primeira abre com tela preta e o ÚNICA gigante, que se expande
 * (zoom para dentro da letra) e revela o projeto.
 */
function Scene({ p, i }: { p: Project; i: number }) {
  const root = useRef<HTMLDivElement>(null)
  const knock = useRef<HTMLDivElement>(null)
  const first = i === 0
  const mobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    const el = root.current
    const stage = el?.firstElementChild as HTMLElement | null
    if (!el || !stage) return
    const kn = knock.current
    if (prefersReducedMotion()) {
      el.style.setProperty('--a', '1')
      el.style.setProperty('--t', '1')
      el.style.setProperty('--ko', '0')
      if (kn) kn.style.display = 'none'
      return
    }
    return subscribe(() => {
      const r = el.getBoundingClientRect()
      const vh = stage.offsetHeight
      const vw = innerWidth
      if (r.bottom < -50 || r.top > vh + 50) return
      const pin = Math.max(1, el.offsetHeight - vh)
      const entering = clamp((vh - r.top) / vh)
      const prog = clamp(-r.top / pin)
      let a = entering
      let t = clamp((entering - 0.35) / 0.5)

      if (first) {
        const k = clamp(prog / 0.55) // fase de expansão do ÚNICA
        const e = ease(k)
        a = e
        t = clamp((k - 0.6) / 0.4)
        el.style.setProperty('--ko', (1 - clamp(k * 2.4)).toFixed(3))
        if (kn) {
          if (e >= 1) {
            kn.style.visibility = 'hidden'
          } else {
            kn.style.visibility = 'visible'
            const w0 = Math.min(vw * 0.86, 1100)
            const wEnd = (Math.hypot(vw, vh) * 0.53 * LOGO.w) / ANCHOR.r // largura em que a letra cobre a tela
            const w = w0 * Math.pow(wEnd / w0, e) // zoom exponencial = sensação constante
            const s = w / LOGO.w
            const ax = LOGO.w / 2 + (ANCHOR.x - LOGO.w / 2) * e // o foco migra do centro do logo para dentro da letra
            const ay = LOGO.h / 2 + (ANCHOR.y - LOGO.h / 2) * e
            kn.style.setProperty('--mw', `${w.toFixed(1)}px`)
            kn.style.setProperty('--ml', `${(vw / 2 - ax * s).toFixed(1)}px`)
            kn.style.setProperty('--mt', `${(vh / 2 - ay * s).toFixed(1)}px`)
          }
        }
      }
      el.style.setProperty('--a', a.toFixed(3))
      el.style.setProperty('--t', t.toFixed(3))
      el.style.setProperty('--p', prog.toFixed(3))
    })
  }, [first])

  return (
    <div ref={root} className="sc" style={{ height: first ? '240svh' : '150svh' }}>
      <div className="sc-stage" style={{ background: p.tone }}>
        <img className="sc-bg" src={p.bg} alt="" aria-hidden decoding="async" draggable={false} />

        <div className="sc-body">
          <div className="sc-text">
            <p className="label text-ash">0{i + 1} / 0{N} — {p.kind}</p>
            <h3 className="sc-name">{p.name}</h3>
            <p className="sc-desc">{p.desc}</p>
            <div className="sc-cta">
              <Btn href={p.url} variant="signal-on-dark">Ver projeto</Btn>
              <a href={projectLink(p)} target="_blank" rel="noreferrer" className="ulink text-sm font-medium">Quero algo assim →</a>
            </div>
          </div>

          <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${p.name}`} data-cursor="Ver projeto" className="sc-dev">
            <Cover p={p} bare tall={mobile} eager={first} className="sc-cover" />
          </a>
        </div>

        {first && (
          <>
            <div ref={knock} className="knock" aria-hidden />
            <div className="knock-text">
              <p className="label text-ash">Projetos</p>
              <p className="font-display text-[clamp(1.7rem,3.4vw,3rem)] leading-tight">
                Algumas coisas que já ganharam <em className="text-signal">forma.</em>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projetos" data-tone="dark" className="bg-ink text-paper">
      <h2 className="sr-only">Projetos</h2>
      {PROJECTS.map((p, i) => (
        <Scene key={p.name} p={p} i={i} />
      ))}
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-6 md:px-10 md:pb-32">
        <CtaStrip dark lead="Quer algo assim para o seu negócio?" label="Quero algo assim" href={QUOTE_LINK} />
        <p className="label mt-2 text-ash">
          Gosta de movimento?{' '}
          <a href={BALY_URL} target="_blank" rel="noreferrer" className="ulink text-paper">
            Veja a Baly, uma landing conceitual com efeitos no scroll →
          </a>
        </p>
      </div>
    </section>
  )
}
