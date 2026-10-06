import { useEffect, useRef } from 'react'
import { subscribe } from '../fx'

/** Barra fina de progresso da página, no topo. */
export function ScrollRail() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(
    () =>
      subscribe(() => {
        const max = document.documentElement.scrollHeight - innerHeight
        bar.current?.style.setProperty('--sp', (max > 0 ? Math.min(1, scrollY / max) : 0).toFixed(4))
      }),
    [],
  )
  return <div ref={bar} className="rail-bar" aria-hidden />
}
