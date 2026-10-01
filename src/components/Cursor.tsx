import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../fx'

/**
 * Cursor discreto (só mouse): ponto que cresce sobre links e vira
 * um selo com texto sobre elementos com data-cursor="...".
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const tag = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return
    const d = dot.current!
    const t = tag.current!
    document.documentElement.classList.add('has-cursor')

    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0

    const place = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      const v = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`
      d.style.translate = v
      t.style.translate = v
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(place) : 0
    }
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      d.dataset.show = '1'
      if (!raf) raf = requestAnimationFrame(place)
    }
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null
      const labelled = el?.closest<HTMLElement>('[data-cursor]')
      const link = el?.closest('a, button')
      const mode = labelled ? 'label' : link ? 'link' : 'idle'
      d.dataset.mode = mode
      t.dataset.on = labelled ? '1' : '0'
      if (labelled) t.textContent = labelled.dataset.cursor ?? ''
    }
    const leave = () => { d.dataset.show = '0'; t.dataset.on = '0' }

    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      removeEventListener('pointermove', move)
      removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cur-dot" data-mode="idle" data-show="0" aria-hidden />
      <div ref={tag} className="cur-tag label" data-on="0" aria-hidden />
    </>
  )
}
