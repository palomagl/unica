import type { CSSProperties } from 'react'
import type { Project } from '../content'

/**
 * Cena do projeto: aparelhos em perspectiva sobre a bancada de pedra.
 * O wrapper leva a sombra (no espaço da tela, com a luz sempre vinda de cima à esquerda);
 * a imagem leva a inclinação 3D. Assim a sombra não gira junto com o aparelho.
 */
export function Cover({ p, eager, className = '' }: { p: Project; eager?: boolean; className?: string }) {
  return (
    <div className={`cover ${className}`} role="img" aria-label={`Projeto ${p.name}`}>
      {p.devices.map((d, i) => (
        <div
          key={i}
          className="mock-wrap"
          style={{ left: `${d.x}cqw`, top: `${d.y}cqw`, width: `${d.w}cqw`, zIndex: d.z ?? 1, ['--k' as string]: d.k ?? 1 } as CSSProperties}
        >
          <img
            className="mock"
            src={d.src}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            style={{ transform: `perspective(95cqw) rotateX(${d.rx ?? 0}deg) rotateY(${d.ry ?? 0}deg) rotateZ(${d.rz ?? 0}deg)` }}
          />
        </div>
      ))}
    </div>
  )
}
