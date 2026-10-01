import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { QUOTE_LINK } from '../content'
import { subscribe } from '../fx'

/** Fixo; troca de cor conforme o fundo que passa por baixo e só mostra o logo depois do hero. */
export function Header() {
  const [tone, setTone] = useState<'dark' | 'light'>('dark')
  const [past, setPast] = useState(false)

  useEffect(
    () =>
      subscribe(() => {
        const under = document.elementFromPoint(innerWidth / 2, 34)?.closest<HTMLElement>('[data-tone]')
        setTone(under?.dataset.tone === 'light' ? 'light' : 'dark')
        setPast(scrollY > innerHeight * 0.55)
      }),
    [],
  )

  const light = tone === 'light'
  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? 'text-ink' : 'text-paper'
      } ${past ? (light ? 'max-md:bg-paper' : 'max-md:bg-ink') : ''}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a
          href="#top"
          aria-label="ÚNICA — início"
          className={`pointer-events-auto transition-opacity duration-500 ${past ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <Logo tone={light ? 'light' : 'dark'} className="h-7 w-auto md:h-9" />
        </a>
        <nav className="label pointer-events-auto flex items-center gap-6 md:gap-9">
          <a href="#servicos" className="ulink hidden sm:inline">Serviços</a>
          <a href="#projetos" className="ulink hidden sm:inline">Projetos</a>
          <a href="#sobre" className="ulink hidden md:inline">Sobre</a>
          <a
            href={QUOTE_LINK}
            className={`border px-3.5 py-2 transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-ink ${light ? 'border-ink/40' : 'border-paper/40'}`}
          >
            Orçamento
          </a>
        </nav>
      </div>
    </header>
  )
}
