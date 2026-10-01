import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { BALY_URL, PROJECTS, QUOTE_LINK, projectLink, type Project } from '../content'
import { Btn } from './Btn'
import { ClipBox } from './ClipBox'
import { CtaStrip } from './CtaStrip'
import { Cover } from './Cover'
import { Reveal } from './Reveal'
import { Words } from './Words'

const N = PROJECTS.length
const STEP = 85 // vh de rolagem por projeto no palco (desktop): curto o bastante para passar rápido

function Caption({ p, i }: { p: Project; i: number }) {
  return (
    <div>
      <p className="label text-ash">0{i + 1} / 0{N} — {p.kind}</p>
      <h3 className="mt-4 font-display text-[clamp(3rem,5.4vw,5.6rem)] leading-[0.92]">{p.name}</h3>
      <p className="mt-5 max-w-xs leading-relaxed text-paper/70">{p.desc}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Btn href={p.url} variant="signal-on-dark">Ver projeto</Btn>
        <a href={projectLink(p)} target="_blank" rel="noreferrer" className="ulink text-sm font-medium">Quero algo assim →</a>
      </div>
    </div>
  )
}

/**
 * Projetos como prova de qualidade (3, mostrando versatilidade: aplicativo, alimentação, negócio visual).
 * Desktop: palco sticky — a página rola normalmente; a cada "cena" a imagem troca por máscara,
 * o texto acompanha e o fundo muda de tom, como cada sabor da landing da Baly.
 * Mobile: sequência compacta, uma imagem grande por projeto.
 */
export function Projects() {
  const [active, setActive] = useState(0)
  const [warm, setWarm] = useState(false) // pré-carrega as capas do palco (só desktop)
  const marks = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Só no desktop (no celular o palco fica oculto e não vale baixar as imagens dele).
    const t = setTimeout(() => {
      if (matchMedia('(min-width: 768px)').matches) setWarm(true)
    }, 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    marks.current.forEach((m) => m && io.observe(m))
    return () => io.disconnect()
  }, [])

  // Movimento de mouse bem sutil sobre a imagem.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
    e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
  }

  return (
    <section id="projetos" data-tone="dark" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10 md:pb-20 md:pt-40">
        <p className="label mb-4 text-ash">Projetos</p>
        <Words text="Algumas coisas | que já *ganharam forma.*" className="font-display text-[clamp(2.8rem,8.5vw,8.5rem)] leading-[0.93]" />
      </div>

      {/* Desktop: palco sticky */}
      <div className="relative hidden md:block" style={{ height: `${N * STEP + 100}vh` }}>
        <div aria-hidden>
          {PROJECTS.map((_, i) => (
            <div
              key={i}
              data-i={i}
              ref={(el) => { marks.current[i] = el }}
              className="absolute inset-x-0"
              style={{ top: `${50 + i * STEP}vh`, height: `${STEP}vh` }}
            />
          ))}
        </div>

        <div
          onPointerMove={onMove}
          className="sticky top-0 h-screen overflow-hidden transition-colors duration-1000"
          style={{ background: PROJECTS[active].tone }}
        >
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-12 items-center gap-8 px-10">
            <div className="col-span-5">
              <div className="grid">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.name}
                    inert={active !== i}
                    className={`col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-out ${
                      active === i ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none -translate-y-3 opacity-0'
                    }`}
                  >
                    <Caption p={p} i={i} />
                  </div>
                ))}
              </div>
              <div className="mt-12 flex gap-2" aria-hidden>
                {PROJECTS.map((_, i) => (
                  <span key={i} className="relative h-px w-14 bg-paper/20">
                    <span className={`absolute inset-0 origin-left bg-paper transition-transform duration-700 ${active === i ? 'scale-x-100' : 'scale-x-0'}`} />
                  </span>
                ))}
              </div>
            </div>

            <div className="relative col-span-7 h-[70vh]">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.name}
                  inert={active !== i}
                  className={`absolute inset-0 grid place-items-center transition-[clip-path,opacity] duration-[1100ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
                    active === i ? 'opacity-100 [clip-path:inset(0)]' : 'opacity-0 [clip-path:inset(0_0_100%_0)]'
                  }`}
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Ver projeto"
                    aria-label={`Abrir ${p.name}`}
                    className="flex w-full justify-center transition-transform duration-300 ease-out"
                    style={{ transform: 'translate3d(calc(var(--mx, 0) * -14px), calc(var(--my, 0) * -10px), 0)' }}
                  >
                    <Cover p={p} eager={i === 0 || warm} style={{ width: 'min(100%, 105vh)' }} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: uma imagem grande por projeto, compacto */}
      <div className="md:hidden">
        {PROJECTS.map((p, i) => (
          <article key={p.name} className="border-t border-paper/15 px-5 py-8">
            <ClipBox>
              <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${p.name}`} className="block">
                <Cover p={p} eager={i === 0} className="w-full" />
              </a>
            </ClipBox>
            <Reveal className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="label text-ash">0{i + 1} / 0{N} — {p.kind}</p>
                <h3 className="mt-2 font-display text-[2.6rem] leading-[0.95]">{p.name}</h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-paper/70">{p.desc}</p>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-signal-on-dark shrink-0 !px-4 !py-3">
                <span>Ver</span><span className="btn-arrow" aria-hidden>→</span>
              </a>
            </Reveal>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-32">
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
