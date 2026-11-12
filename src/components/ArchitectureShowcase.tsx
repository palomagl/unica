import { useState } from 'react'
import { ArrowUpRight } from './InterfaceIcons'
import { QUOTE_LINK } from '../content'
import './architecture.css'

type ProductKind = 'commerce' | 'system' | 'app'
const solutions: Record<ProductKind, {
  label: string
  title: string
  case: string
  result: string
  nodes: { name: string; detail: string; tech: string }[]
}> = {
  commerce: {
    label: 'Loja online',
    title: 'Do produto à entrega. Tudo conectado.',
    case: 'O cliente escolhe, paga e acompanha. A operação recebe, organiza e envia.',
    result: 'Uma experiência de compra com operação integrada, não apenas uma vitrine.',
    nodes: [
      { name: 'Experiência', tech: 'FRONT-END', detail: 'Catálogo, busca, produto, carrinho e checkout pensados para quem compra.' },
      { name: 'Inteligência', tech: 'REGRAS DE NEGÓCIO', detail: 'Cálculo de preços, frete, descontos, disponibilidade e pedidos.' },
      { name: 'Dados', tech: 'BACK-END', detail: 'Produtos, clientes, estoque e pedidos conectados em um só lugar.' },
      { name: 'Integrações', tech: 'APIS', detail: 'Meios de pagamento, logística, notificações e automações.' },
    ],
  },
  system: {
    label: 'Sistema de gestão',
    title: 'Menos trabalho repetido. Mais controle.',
    case: 'Seu processo vira uma ferramenta feita para a rotina da equipe.',
    result: 'Uma operação que registra, acompanha e organiza informações sem improviso.',
    nodes: [
      { name: 'Experiência', tech: 'PAINÉIS', detail: 'Dashboard, filtros e tarefas que fazem sentido no uso diário.' },
      { name: 'Inteligência', tech: 'AUTOMAÇÕES', detail: 'Fluxos, permissões, alertas e cálculos definidos pelas regras da empresa.' },
      { name: 'Dados', tech: 'GESTÃO', detail: 'Histórico, clientes, lançamentos e registros centralizados.' },
      { name: 'Integrações', tech: 'CONEXÕES', detail: 'Comunicação entre ferramentas, notificações e serviços externos.' },
    ],
  },
  app: {
    label: 'Aplicativo',
    title: 'Uma boa ideia merece funcionar de verdade.',
    case: 'Da primeira interação ao que acontece nos bastidores.',
    result: 'Um produto digital pensado para evoluir junto com seus usuários.',
    nodes: [
      { name: 'Experiência', tech: 'MOBILE', detail: 'Fluxos claros, interface responsiva e uso intuitivo no celular.' },
      { name: 'Inteligência', tech: 'FUNCIONALIDADES', detail: 'Lógica de uso, estados, personalização e regras específicas do app.' },
      { name: 'Dados', tech: 'PERSISTÊNCIA', detail: 'Contas, registros, preferências e sincronização quando necessária.' },
      { name: 'Integrações', tech: 'SERVIÇOS', detail: 'Notificações, autenticação, serviços externos e novas possibilidades.' },
    ],
  },
}

export function ArchitectureShowcase() {
  const [kind, setKind] = useState<ProductKind>('commerce')
  const [active, setActive] = useState(0)
  const solution = solutions[kind]
  const current = solution.nodes[active]

  const change = (next: ProductKind) => {
    setKind(next)
    setActive(0)
  }

  return (
    <section id="estrutura" className="u-architecture" aria-labelledby="u-arch-title">
      <div className="u-wrap">
        <div className="u-arch-heading u-reveal">
          <div>
            <span className="u-kicker">POR DENTRO DE UM PROJETO</span>
            <h2 className="u-h2" id="u-arch-title">Não é só uma tela.<br/><em>É tudo que faz ela funcionar.</em></h2>
          </div>
          <p>Design chama atenção. Estrutura entrega resultado. Explore como as peças se conectam para transformar um problema real em solução.</p>
        </div>

        <div className="u-arch-shell u-reveal">
          <div className="u-arch-toolbar">
            <div className="u-arch-toolbar-title"><span className="u-arch-live" /> MAPA DE UMA SOLUÇÃO <span className="u-arch-toolbar-ref">EXPERIMENTE / 001</span></div>
            <div className="u-arch-tabs" role="group" aria-label="Tipo de solução">
              {(Object.keys(solutions) as ProductKind[]).map(key =>
                <button key={key} type="button" className={kind === key ? 'is-active' : ''} aria-pressed={kind===key} onClick={() => change(key)}>{solutions[key].label}</button>
              )}
            </div>
          </div>
          <div className="u-arch-body">
            <div className="u-arch-map" key={kind}>
              <div className="u-arch-map-top">
                <span>ARQUITETURA / {solution.label.toUpperCase()}</span>
                <span>TOQUE NAS CAMADAS ↘</span>
              </div>
              <div className="u-arch-flow" role="group" aria-label="Explorar as camadas da solução">
                {solution.nodes.map((node, index) =>
                  <button className={active===index ? 'u-arch-node is-active' : 'u-arch-node'} key={node.name}
                    type="button" onClick={() => setActive(index)} aria-pressed={active===index}>
                    <span className="u-arch-node-top"><i /> {String(index+1).padStart(2,'0')}</span>
                    <strong>{node.name}</strong>
                    <small>{node.tech}</small>
                  </button>
                )}
              </div>
              <div className="u-arch-data">
                <span className="u-arch-data-label">CAMADA ATIVA — {String(active+1).padStart(2,'0')} / 04</span>
                <h3 key={kind+'-'+active}>{current.name}<span>.</span></h3>
                <p key={'p-'+kind+'-'+active}>{current.detail}</p>
              </div>
              <div className="u-arch-status"><span className="u-arch-status-led" /> COMPONENTES CONECTADOS <span>● SISTEMA EM FOCO</span></div>
            </div>
            <aside className="u-arch-aside">
              <div className="u-arch-aside-index">ÚNICA / CAMADA 0{active+1}</div>
              <div className="u-arch-aside-text" key={kind}>
                <span>O DESAFIO</span>
                <h3>{solution.title}</h3>
                <p>{solution.case}</p>
              </div>
              <div className="u-arch-outcome">
                <span>O RESULTADO</span>
                <p>{solution.result}</p>
              </div>
              <a className="u-arch-cta" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
                Quero criar uma solução <ArrowUpRight />
              </a>
            </aside>
          </div>
        </div>
        <div className="u-arch-bottom"><span>01 / IDEA</span><span>02 / SISTEMA</span><span>03 / EXPERIÊNCIA</span><span>04 / EVOLUÇÃO</span></div>
      </div>
    </section>
  )
}
