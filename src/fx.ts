import { useEffect, useRef } from 'react'

/** Respeita a preferência do sistema por menos animações. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Parallax suave associado ao scroll, sem dependências externas.
 * A animação é pausada fora da viewport e respeita reduced motion.
 */
export function useParallax<Outer extends HTMLElement, Inner extends HTMLElement>(speed: number) {
  const outer = useRef<Outer>(null)
  const inner = useRef<Inner>(null)

  useEffect(() => {
    const container = outer.current
    const element = inner.current
    if (!container || !element || typeof window === 'undefined') return

    let frame = 0
    const render = () => {
      frame = 0
      if (prefersReducedMotion()) {
        element.style.transform = ''
        return
      }

      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      if (rect.bottom < -160 || rect.top > viewportHeight + 160) return

      const distance = viewportHeight / 2 - (rect.top + rect.height / 2)
      const distancePx = Math.max(-120, Math.min(120, distance * speed))
      element.style.transform = `translate3d(0, ${distancePx.toFixed(2)}px, 0)`
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    const media = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
    media?.addEventListener?.('change', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      media?.removeEventListener?.('change', schedule)
      if (frame) window.cancelAnimationFrame(frame)
      element.style.transform = ''
    }
  }, [speed])

  return { outer, inner }
}
