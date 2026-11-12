import { useState } from 'react'
import { ArrowUpRight } from './InterfaceIcons'
import { QUOTE_LINK } from '../content'
import './solutions.css'

const options = [
  { number: '01', title: 'Atrair e impressionar', category: 'Sites & experiências digitais', problem: 'Quando a primeira impressão precisa estar à altura do seu negócio.', result: 'Uma presença marcante, fácil de navegar e preparada para transformar visitas em oportunidades.', label: 'PRESENÇA', icon: '◎' },
  { number: '02', title: 'Vender pela internet', category: 'Lojas online & pedidos', problem: 'Para levar seus produtos mais longe e facilitar a escolha de quem compra.', result: 'Uma jornada de compra organizada, intuitiva e alinhada à personalidade da sua marca.', label: 'VENDAS', icon: '↗' },
  { number: '03', title: 'Organizar e automatizar', category: 'Sistemas & gestão', problem: 'Quando tarefas manuais estão tomando tempo demais da equipe.', result: 'Um sistema sob medida para centralizar informações e tornar o dia a dia mais simples.', label: 'GESTÃO', icon: '≋' },
  { number: '04', title: 'Tirar uma ideia do papel', category: 'Apps & soluções exclusivas', problem: 'Mesmo que ainda não exista um modelo pronto para o que você imaginou.', result: 'Uma solução desenhada em torno do seu objetivo — seja um app, plataforma ou algo novo.', label: 'IDEIAS', icon: '✳' },
] as const

export function SolutionsShowcase() {
  const [active, setActive] = useState(0)
  const current = options[active]
  return <div className="u-solutions-experience">
    <div className="u-solution-list" role="group" aria-label="Explore soluções para seu negócio">
      {options.map((item,i) => <button type="button" key={item.number}
        onClick={()=>setActive(i)} aria-pressed={active===i} className={`u-solution-row ${active===i?'is-active':''}`}>
        <span className="u-solution-index">{item.number}</span>
        <span className="u-solution-name">{item.title}<small>{item.category}</small></span>
        <span className="u-solution-row-arrow"><ArrowUpRight /></span>
      </button>)}
    </div>
    <div className="u-solution-detail" key={current.number}>
      <div className="u-solution-detail-head"><span>{current.label}</span><span>{current.number} / 04</span></div>
      <div className="u-solution-symbol" aria-hidden="true"><span>{current.number}</span><span className="u-solution-symbol-spark">✳</span></div>
      <div className="u-solution-detail-body">
        <h3>{current.problem}</h3>
        <p>{current.result}</p>
        <a className="u-solution-link" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Quero uma solução assim <ArrowUpRight /></a>
      </div>
    </div>
  </div>
}
