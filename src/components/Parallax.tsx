import type { ReactNode } from 'react'
import { useParallax } from '../fx'

/** Move o conteúdo bem de leve em relação à rolagem. */
export function Parallax({ speed, children, className = '' }: { speed: number; children: ReactNode; className?: string }) {
  const { outer, inner } = useParallax<HTMLDivElement, HTMLDivElement>(speed)
  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="will-change-transform">{children}</div>
    </div>
  )
}
