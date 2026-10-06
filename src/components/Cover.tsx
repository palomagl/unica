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

/**
 * Composição de aparelhos com as telas reais do projeto.
 * `bare`: sem fundo próprio (a cena já tem atmosfera). `tall`: versão vertical 4:5 para o celular.
 */
export function Cover({
  p,
  eager,
  bare,
  tall,
  className = '',
  style,
}: {
  p: Project
  eager?: boolean
  bare?: boolean
  tall?: boolean
  className?: string
  style?: CSSProperties
}) {
  const devices = tall ? p.devicesTall : p.devices
  return (
    <div
      className={`cover ${bare ? 'cover-bare' : ''} ${tall ? 'cover-tall' : ''} ${className}`}
      style={style}
      role="img"
      aria-label={`Projeto ${p.name}`}
    >
      {!bare && <img className="cover-bg" src={p.bg} alt="" aria-hidden decoding="async" draggable={false} />}
      {devices.map((d, i) => (
        <DeviceView key={i} d={d} eager={eager} />
      ))}
    </div>
  )
}
