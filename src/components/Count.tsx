import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../fx'

const fmt = (n: number) => `R$ ${Math.round(n).toLocaleString('pt-BR')}+`

/** Preço que "conta" de 0 até o valor quando aparece na tela (uma vez). */
export function Count({ value, className = '' }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    let started = false
    const run = () => {
      const t0 = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 1100)
        el.textContent = fmt(value * (1 - Math.pow(1 - t, 3)))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true
          run()
          io.disconnect()
        }
      },
      { threshold: 0.8 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = fmt(value)
    }
  }, [value])

  return (
    <span ref={ref} className={className} aria-label={fmt(value)}>
      {fmt(value)}
    </span>
  )
}
