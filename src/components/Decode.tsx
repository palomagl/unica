import { useEffect, useRef, type ElementType } from 'react'
import { prefersReducedMotion } from '../fx'

const GLYPHS = '01▮/<>_#*+'

/** Rótulo "tecnológico": os caracteres embaralham e se resolvem da esquerda para a direita ao entrar na tela. */
export function Decode({ text, className = '', as: Tag = 'span' }: { text: string; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    let started = false
    const run = () => {
      const t0 = performance.now()
      const dur = Math.min(1000, 350 + text.length * 28)
      const step = (now: number) => {
        const t = (now - t0) / dur
        if (t >= 1) {
          el.textContent = text
          return
        }
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const c = text[i]
          const settle = (i / text.length) * 0.75 + 0.15
          out += c === ' ' || t >= settle ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        }
        el.textContent = out
        raf = requestAnimationFrame(step)
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
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = text
    }
  }, [text])

  return (
    <Tag ref={ref as never} aria-label={text} className={className}>
      {text}
    </Tag>
  )
}
