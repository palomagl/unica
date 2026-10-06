import { useEffect, useRef, useState, type CSSProperties } from 'react'

/** Permite passar custom properties no style sem brigar com o TS. */
export const cssVars = (v: Record<string, string | number>) => v as CSSProperties

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n))

/* Um único listener de scroll para a página inteira, throttled por rAF. */
type Fn = () => void
const subs = new Set<Fn>()
let queued = false
let bound = false

function run() {
  queued = false
  subs.forEach((f) => f())
}
function request() {
  if (!queued) {
    queued = true
    requestAnimationFrame(run)
  }
}
export function subscribe(fn: Fn) {
  if (!bound) {
    bound = true
    addEventListener('scroll', request, { passive: true })
    addEventListener('resize', request)
  }
  subs.add(fn)
  request()
  return () => {
    subs.delete(fn)
  }
}

/**
 * Escreve --p (0 → 1) no elemento conforme ele atravessa a tela.
 * `from`: em que fração da altura da janela o topo do elemento está quando p = 0.
 * `span`: quantas alturas de janela de rolagem levam de 0 a 1.
 */
export function useScrollVar<T extends HTMLElement>(from = 0.9, span = 0.8) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1')
      return
    }
    return subscribe(() => {
      const r = el.getBoundingClientRect()
      const vh = innerHeight
      if (r.bottom < 0 || r.top > vh) {
        el.style.setProperty('--p', r.top > vh ? '0' : '1')
        return
      }
      el.style.setProperty('--p', clamp((vh * from - r.top) / (vh * span)).toFixed(3))
    })
  }, [from, span])
  return ref
}

/**
 * Parallax discreto: o wrapper (medido) fica parado; só o filho se move.
 * `speed` pequeno (0.03–0.08) e só enquanto visível.
 */
export function useParallax<T extends HTMLElement, U extends HTMLElement>(speed: number) {
  const outer = useRef<T>(null)
  const inner = useRef<U>(null)
  useEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i || prefersReducedMotion()) return
    return subscribe(() => {
      const r = o.getBoundingClientRect()
      const vh = innerHeight
      if (r.bottom < -150 || r.top > vh + 150) return
      const d = (r.top + r.height / 2 - vh / 2) * speed
      i.style.transform = `translate3d(0, ${(-d).toFixed(1)}px, 0)`
    })
  }, [speed])
  return { outer, inner }
}

/** Segue uma media query (ex.: celular) e reage a mudanças de tamanho/rotação. */
export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}
