import { useState } from 'react'
import { ArrowUpRight } from './InterfaceIcons'
import { QUOTE_LINK } from '../content'
import './solutions.css'

const options = [
  { number: '01', title: 'Seu negócio bem apresentado', category: 'Sites e experiências digitais', problem: 'Seu trabalho é bom. A presença online precisa mostrar isso.', developed: 'Sites, páginas de apresentação e experiências pensadas para a sua marca.', result: 'Quem chega entende o que você faz e encontra o caminho para conversar.', label: 'PRESENÇA' },
  { number: '02', title: 'Vender sem complicar', category: 'Lojas virtuais e pedidos', problem: 'Produto bom não deveria depender de dezenas de mensagens para ser encontrado.', developed: 'Lojas com catálogo organizado e caminhos de compra adaptados à operação.', result: 'Mais clareza para quem compra e mais organização para quem vende.', label: 'VENDAS' },
  { number: '03', title: 'Menos tarefas manuais', category: 'Sistemas e gestão', problem: 'Planilhas espalhadas e informações perdidas atrapalham o dia a dia.', developed: 'Painéis, controles e fluxos personalizados para o jeito de trabalhar da equipe.', result: 'A informação fica no lugar certo, sem precisar improvisar toda vez.', label: 'GESTÃO' },
  { number: '04', title: 'Sua ideia em movimento', category: 'Aplicativos e soluções personalizadas', problem: 'Nem toda necessidade cabe numa ferramenta pronta.', developed: 'Apps e plataformas com funcionalidades definidas a partir do seu objetivo.', result: 'Uma experiência feita para as pessoas que realmente vão usá-la.', label: 'IDEIAS' },
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
      <div className="u-solution-symbol" aria-hidden="true"><span>{current.number}</span><span className="u-solution-symbol-spark" aria-hidden="true"><ArrowUpRight /></span></div>
      <div className="u-solution-detail-body">
        <h3>{current.problem}</h3>
        <p className="u-solution-developed"><strong>O que podemos criar</strong>{current.developed}</p>
        <p className="u-solution-benefit"><strong>Na prática</strong>{current.result}</p>
        <a className="u-solution-link" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Quero uma solução assim <ArrowUpRight /></a>
      </div>
    </div>
  </div>
}
