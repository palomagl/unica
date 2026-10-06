import type { CSSProperties } from 'react'
import type { Project } from '../content'

/** Composição do projeto: mockups reais recortados dentro da moldura (a moldura é do CSS, igual para todos). */
export function Cover({ p, eager, className = '' }: { p: Project; eager?: boolean; className?: string }) {
  return (
    <div className={`cover ${className}`} role="img" aria-label={`Projeto ${p.name}`}>
      {p.devices.map((d, i) => (
        <img
          key={i}
          className="mock"
          src={d.src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          style={{ left: `${d.x}cqw`, top: `${d.y}cqw`, width: `${d.w}cqw`, zIndex: d.z ?? 1, ['--k' as string]: d.k ?? 1 } as CSSProperties}
        />
      ))}
    </div>
  )
}
