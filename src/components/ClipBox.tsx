import type { ReactNode } from 'react'
import { useReveal } from '../useReveal'

/**
 * Revela o conteúdo por máscara (clip-path) quando entra na tela.
 * O wrapper externo (observado) nunca é recortado; só o filho interno,
 * porque o IntersectionObserver considera zero o que está totalmente recortado.
 */
export function ClipBox({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`clip-reveal ${className}`}>
      <div className="clip-inner">
        <div>{children}</div>
      </div>
    </div>
  )
}
