import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { BALY_URL, PROJECTS, QUOTE_LINK } from '../content'
import { Btn } from './Btn'
import { Cover } from './Cover'
import { Decode } from './Decode'
import { Words } from './Words'
import { prefersReducedMotion, subscribe } from '../fx'
import { useReveal } from '../useReveal'

const N = PROJECTS.length
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n))
const pad = (n: number) => String(n).padStart(2, '0')

/** Uma linha da lista: número, nome, descrição, categoria · ano e seta. As linhas se desenham ao entrar. */
function Row({ i, active, pos, onActivate, onRelease }: { i: number; active: boolean; pos: number; onActivate: () => void; onRelease: () => void }) {
  const p = PROJECTS[i]
  const ref = useReveal<HTMLLIElement>()

  // Sem hover (toque): o 1º toque mostra o preview, o 2º abre o projeto.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (matchMedia('(hover: hover)').matches || active) return
    e.preventDefault()
    onActivate()
  }

  return (
    <li ref={ref} className="pj-row" data-active={active} data-pos={pos} style={{ ['--d' as string]: `${i * 120}ms` }}>
      <span className="pj-rule" aria-hidden />
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        data-cursor="Ver projeto"
        aria-label={`${p.name} — ${p.kind}, ${p.year}. Abrir projeto`}
        onMouseEnter={onActivate}
        onMouseLeave={onRelease}
        onFocus={onActivate}
        onBlur={onRelease}
        onClick={onClick}
        className="pj-link"
      >
        <span className="pj-num pj-in">{pad(i + 1)}</span>
        <span className="pj-name pj-in">{p.name}</span>
        <span className="pj-meta pj-in">
          <span className="pj-meta-in">
            <span className="pj-desc">{p.desc}</span>
            <span className="label pj-tag">{p.kind} · {p.year}</span>
          </span>
        </span>
        <span className="pj-arrow pj-in" aria-hidden>→</span>
      </a>
    </li>
  )
}

/**
 * Projetos como galeria editorial: lista à esquerda, preview à direita.
 * A seção fica "presa" por um trecho curto e o projeto ativo muda com a rolagem
 * (ou ao passar o mouse/tocar). O preview troca por máscara + opacity + escala sutis.
 */
export function Projects() {
  const root = useRef<HTMLDivElement>(null)
  const sideRef = useReveal<HTMLDivElement>()
  const [auto, setAuto] = useState(0) // definido pela rolagem
  const [manual, setManual] = useState<number | null>(null) // hover / toque (vale até a rolagem mudar de projeto)
  const [view, setView] = useState({ on: 0, off: -1 }) // projeto visível e o que está saindo
  const active = manual ?? auto

  useEffect(() => {
    setView((v) => (v.on === active ? v : { on: active, off: v.on }))
  }, [active])

  // Rolagem: define o projeto ativo e as variáveis de progresso.
  useEffect(() => {
    const el = root.current
    const stage = el?.firstElementChild as HTMLElement | null
    if (!el || !stage || prefersReducedMotion()) return
    return subscribe(() => {
      const r = el.getBoundingClientRect()
      const vh = stage.offsetHeight
      if (r.bottom < -50 || r.top > vh + 50) return
      const p = clamp(-r.top / Math.max(1, el.offsetHeight - vh))
      el.style.setProperty('--sy', ((p - 0.5) * -14).toFixed(1))
      const idx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2
      setAuto((prev) => {
        if (prev !== idx) setManual(null) // a rolagem retoma o controle
        return idx
      })
    })
  }, [])

  // Reação sutil do preview ao mouse.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
  }
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--mx', '0')
    e.currentTarget.style.setProperty('--my', '0')
  }

  const p = PROJECTS[active]

  return (
    <section id="projetos" data-tone="light" className="bg-paper-2">
      <div ref={root} className="pj">
        <div className="pj-stage">
          <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
            <Decode text="02 / Projetos" as="p" className="label mb-3 text-ash md:mb-4" />
            <Words
              text="Algumas coisas que já *ganharam forma.*"
              className="font-display text-[clamp(2.3rem,5.2vw,5.2rem)] leading-[0.98]"
            />

            <div className="pj-grid">
              <ul className="pj-list">
                {PROJECTS.map((_, i) => (
                  <Row key={i} i={i} active={active === i} pos={Math.max(-1, Math.min(2, i - active))} onActivate={() => setManual(i)} onRelease={() => setManual(null)} />
                ))}
                <li className="pj-end" aria-hidden><span className="pj-rule" /></li>
              </ul>

              <div ref={sideRef} className="pj-side">
                <div className="pj-count label" aria-hidden>
                  <span className="pj-counter"><span className="mask-box"><span key={active} className="mask-in">{pad(active + 1)}</span></span> / {pad(N)}</span>
                  <span className="pj-ticks">
                    {PROJECTS.map((_, i) => (
                      <button key={i} type="button" tabIndex={-1} className={i === active ? 'is-on' : ''} onClick={() => setManual(i)}>{pad(i + 1)}</button>
                    ))}
                  </span>
                </div>

                <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${p.name}`} data-cursor="Ver projeto" className="pv" onPointerMove={onMove} onPointerLeave={onLeave}>
                  <div className="pv-par">
                    {PROJECTS.map((q, i) => (
                      <div key={q.name} className={`pv-item ${view.on === i ? 'is-on' : view.off === i ? 'is-off' : ''}`}>
                        <Cover p={q} eager={i === 0} />
                      </div>
                    ))}
                  </div>
                </a>

              </div>
            </div>

            {/* Celular: contador, progresso e atalhos (o desktop usa o contador acima da moldura) */}
            <div className="pj-foot label" aria-hidden>
              <span>{pad(active + 1)} / {pad(N)}</span>
              <span className="pj-prog"><span style={{ transform: `scaleX(${(active + 1) / N})` }} /></span>
              <span className="pj-ticks">
                {PROJECTS.map((_, i) => (
                  <button key={i} type="button" tabIndex={-1} className={i === active ? 'is-on' : ''} onClick={() => setManual(i)}>{pad(i + 1)}</button>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fecho em faixa preta: o convite depois da prova */}
      <div data-tone="dark" className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10 md:py-14">
          <div>
            <p className="font-display text-3xl italic leading-tight md:text-5xl">Quer algo assim para o seu negócio?</p>
            <p className="label mt-3 text-ash">
              Gosta de movimento?{' '}
              <a href={BALY_URL} target="_blank" rel="noreferrer" className="ulink text-paper">Veja a Baly, uma landing conceitual →</a>
            </p>
          </div>
          <Btn href={QUOTE_LINK} variant="signal-on-dark" className="shrink-0">Quero algo assim</Btn>
        </div>
      </div>
    </section>
  )
}
