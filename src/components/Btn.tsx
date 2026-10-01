import type { ReactNode } from 'react'

type Variant = 'signal' | 'signal-on-dark' | 'ink'

/** Botão com preenchimento que desliza no hover. */
export function Btn({
  href,
  children,
  variant = 'signal',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`btn btn-${variant} ${className}`}
    >
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden>→</span>
    </a>
  )
}
