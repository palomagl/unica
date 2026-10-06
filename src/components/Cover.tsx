import type { CSSProperties } from 'react'
import type { Device, Project } from '../content'

function Screen({ d, eager }: { d: Device; eager?: boolean }) {
  return <img src={d.src} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
}

function DeviceView({ d, eager }: { d: Device; eager?: boolean }) {
  const pos: CSSProperties = { left: `${d.x}cqw`, top: `${d.y}cqw`, width: `${d.w}cqw`, zIndex: d.z ?? 1 }
  if (d.kind === 'monitor') {
    return (
      <div className="dev" style={pos}>
        <div className="mon-screen"><Screen d={d} eager={eager} /></div>
        <div className="mon-neck" />
        <div className="mon-base" />
      </div>
    )
  }
  if (d.kind === 'phone') {
    return (
      <div className="dev ph" style={pos}>
        <Screen d={d} eager={eager} />
      </div>
    )
  }
  return (
    <div className="dev win" style={pos}>
      <div className="win-bar" />
      <Screen d={d} eager={eager} />
    </div>
  )
}

/** Composição de aparelhos com as telas reais do projeto, sobre uma atmosfera escura da própria marca. */
export function Cover({ p, eager, className = '' }: { p: Project; eager?: boolean; className?: string }) {
  return (
    <div className={`cover ${className}`} role="img" aria-label={`Projeto ${p.name}`}>
      <img className="cover-bg" src={p.bg} alt="" aria-hidden decoding="async" draggable={false} />
      {p.devices.map((d, i) => (
        <DeviceView key={i} d={d} eager={eager} />
      ))}
    </div>
  )
}
