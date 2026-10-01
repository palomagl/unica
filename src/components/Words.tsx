import type { ElementType } from 'react'
import { useReveal } from '../useReveal'
import { cssVars } from '../fx'

/**
 * Título com máscara: cada palavra sobe de dentro de uma "janela".
 * Marcação: *palavra* ou *várias palavras* = destaque; " | " = quebra de linha.
 */
export function Words({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
}) {
  const ref = useReveal<HTMLElement>()
  let accent = false
  let n = 0
  const out = text.split(' ').map((tok, k) => {
    if (tok === '|') return <br key={k} />
    let t = tok
    if (t.startsWith('*')) {
      accent = true
      t = t.slice(1)
    }
    const isAccent = accent
    if (t.endsWith('*')) {
      t = t.slice(0, -1)
      accent = false
    }
    const i = n++
    return (
      <span key={k}>
        <span className="w-mask">
          <span className={`w ${isAccent ? 'italic text-signal' : ''}`} style={cssVars({ '--d': `${delay + i * 55}ms` })}>
            {t}
          </span>
        </span>{' '}
      </span>
    )
  })
  return (
    <Tag ref={ref as never} className={`words ${className}`}>
      {out}
    </Tag>
  )
}
