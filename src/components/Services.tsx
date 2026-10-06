import { useState, type MouseEvent } from 'react'
import { SERVICES, IDEA_LINK, formatFrom } from '../content'
import { CtaStrip } from './CtaStrip'
import { ServicePreview } from './ServicePreview'
import { Words } from './Words'
import { Decode } from './Decode'
import { Count } from './Count'

const isExternal = (h: string) => h.startsWith('http')
/**
 * Lista editorial. Desktop: passar o mouse destaca o item, apaga os outros e
 * troca o painel (mockup, descrição, preço). Mobile: lista compacta; tocar expande.
 */
export function Services() {
  const [active, setActive] = useState(0)
  const [engaged, setEngaged] = useState(false)
  const [open, setOpen] = useState(-1)
  const [picked, setPicked] = useState<number | null>(null) // aparelhos de toque ≥ tablet
  const s = SERVICES[active]
  const focused = engaged || picked !== null

  // Sem hover (tablet): o 1º toque mostra o painel, o 2º abre o link.
  const onRowClick = (e: MouseEvent<HTMLAnchorElement>, i: number) => {
    if (matchMedia('(hover: hover)').matches || picked === i) return
    e.preventDefault()
    setActive(i)
    setPicked(i)
  }

  return (
    <section id="servicos" data-tone="light" className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-40">
        <div className="mb-10 md:mb-20">
          <Decode text="01 / Serviços" as="p" className="label mb-4 text-ash" />
          <Words text="O que você quer *criar?*" className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]" />
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <ul className="md:col-span-7" onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)}>
            {SERVICES.map((sv, i) => {
              const isActive = active === i
              const dim = focused && !isActive
              const mobileOpen = open === i
              return (
                <li key={sv.id} className="border-t border-ink">
                  {/* Desktop */}
                  <a
                    href={sv.href}
                    {...(isExternal(sv.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                    data-cursor={sv.cta}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={(e) => onRowClick(e, i)}
                    className={`hidden grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-7 transition-opacity duration-300 md:grid ${dim ? 'opacity-25' : ''}`}
                  >
                    <span className={`label transition-colors ${focused && isActive ? 'text-signal' : 'text-ash'}`}>0{i + 1}</span>
                    <h3 className={`font-display text-5xl leading-none transition-transform duration-500 ease-out lg:text-7xl ${focused && isActive ? 'translate-x-3' : ''}`}>
                      {sv.name}
                    </h3>
                    <span className="font-display text-2xl tabular-nums lg:text-3xl"><Count value={sv.from} /></span>
                  </a>

                  {/* Mobile: linha compacta, toque expande */}
                  <button
                    type="button"
                    aria-expanded={mobileOpen}
                    onClick={() => setOpen(mobileOpen ? -1 : i)}
                    className="grid min-h-16 w-full grid-cols-[1fr_auto_1.25rem] items-center gap-x-3 py-4 text-left md:hidden"
                  >
                    <h3 className="font-display text-[1.9rem] leading-none">{sv.name}</h3>
                    <span className="font-display text-xl tabular-nums"><Count value={sv.from} /></span>
                    <span className={`label text-center text-base transition-transform duration-300 ${mobileOpen ? 'rotate-45' : ''}`} aria-hidden>+</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out md:hidden ${mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-xs leading-relaxed text-ink/80">{sv.what}</p>
                      {sv.installments && <p className="label mt-2 text-signal">{sv.installments}</p>}
                      <a
                        href={sv.href}
                        {...(isExternal(sv.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="ulink label mb-6 mt-4 inline-block py-1"
                      >
                        {sv.cta} →
                      </a>
                    </div>
                  </div>
                </li>
              )
            })}
            <li className="border-t border-ink" aria-hidden />
          </ul>

          {/* Painel (desktop) */}
          <aside className="hidden md:col-span-5 md:block">
            <div className="sticky top-24 flex h-[min(40rem,calc(100vh-8rem))] flex-col bg-ink p-7 text-paper">
              <div className="label flex justify-between text-ash">
                <span>0{active + 1} / 0{SERVICES.length}</span>
                <span>{s.name}</span>
              </div>

              <div className="relative flex-1">
                {SERVICES.map((sv, i) => (
                  <div
                    key={sv.id}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 grid place-items-center transition-all duration-700 ease-out ${
                      active === i ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <ServicePreview id={sv.id} />
                  </div>
                ))}
              </div>

              <div key={s.id} className="panel-swap border-t border-paper/20 pt-5">
                <p className="text-sm leading-relaxed text-paper/85">{s.what}</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="label text-ash">a partir de</p>
                    <span className="mask-box"><span key={s.id} className="mask-in whitespace-nowrap font-display text-4xl leading-none tabular-nums lg:text-6xl">{formatFrom(s.from)}+</span></span>
                    {s.installments && <p className="label mt-1 text-signal">{s.installments}</p>}
                  </div>
                  <a
                    href={s.href}
                    {...(isExternal(s.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="ulink label whitespace-nowrap pb-1"
                  >
                    {s.cta} →
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <p className="label mt-8 max-w-sm leading-relaxed text-ash">
          Valores iniciais. O investimento final depende da estrutura e funcionalidades.
        </p>

        <div className="mt-20 md:mt-28">
          <CtaStrip lead="Conte o que você precisa." label="Não sei qual escolher" href={IDEA_LINK} />
        </div>
      </div>
    </section>
  )
}
