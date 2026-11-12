import { useState } from 'react'
import { ArrowUpRight } from './InterfaceIcons'
import { QUOTE_LINK } from '../content'
import './architecture.css'

const layers = [
  {
    number: '01',
    name: 'Experiência',
    subtitle: 'O que seu cliente vê e sente.',
    explanation: 'Uma navegação que faz sentido, transmite confiança e facilita cada decisão.',
    tags: ['Identidade', 'UX/UI', 'Responsividade'],
  },
  {
    number: '02',
    name: 'Inteligência',
    subtitle: 'O que faz tudo funcionar.',
    explanation: 'Regras de negócio, fluxos e automações construídos para a realidade de cada empresa.',
    tags: ['Processos', 'Automação', 'Funcionalidades'],
  },
  {
    number: '03',
    name: 'Organização',
    subtitle: 'O que mantém tudo no lugar.',
    explanation: 'Dados, cadastros, pedidos e históricos estruturados para uma operação organizada.',
    tags: ['Gestão', 'Dados', 'Controle'],
  },
  {
    number: '04',
    name: 'Conexão',
    subtitle: 'O que liga cada ferramenta.',
    explanation: 'Pagamentos, entregas, autenticação e serviços trabalhando juntos quando o projeto precisa.',
    tags: ['Integrações', 'APIs', 'Evolução'],
  },
] as const

/** Explica a estrutura de uma solução por meio de tipografia e uma lista editorial.
 * Sem reproduzir uma tela de software dentro da landing.
 */
export function ArchitectureShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section id="estrutura" className="u-engineering" aria-labelledby="u-engine-title">
      <div className="u-wrap u-engine-layout">
        <div className="u-engine-intro u-reveal">
          <span className="u-kicker">ESTRUTURA TAMBÉM É DESIGN</span>
          <h2 className="u-h2" id="u-engine-title">Bonito é só<br />o <em>começo.</em></h2>
          <p>Um projeto de verdade vai além da primeira impressão. É cada parte trabalhando junta para resolver um problema real.</p>
          <a className="u-engine-link" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            Vamos construir o seu <ArrowUpRight />
          </a>
          <div className="u-engine-decoration" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        </div>

        <div className="u-engine-list u-reveal">
          <div className="u-engine-list-head">
            <span>POR TRÁS DE CADA SOLUÇÃO</span>
            <span>TOQUE PARA EXPLORAR</span>
          </div>
          {layers.map((layer, index) => (
            <div key={layer.number} className={`u-engine-item ${active === index ? 'is-open' : ''}`}>
              <button type="button" className="u-engine-trigger"
                aria-expanded={active === index}
                aria-controls={`u-engine-detail-${index}`}
                onClick={() => setActive(index)}>
                <span className="u-engine-number">{layer.number}</span>
                <span className="u-engine-name">{layer.name}</span>
                <span className="u-engine-control" aria-hidden="true"><ArrowUpRight /></span>
              </button>
              <div className="u-engine-expand" id={`u-engine-detail-${index}`}
                inert={active !== index}>
                <div className="u-engine-detail">
                  <span className="u-engine-subtitle">{layer.subtitle}</span>
                  <p>{layer.explanation}</p>
                  <div className="u-engine-tags">
                    {layer.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="u-engine-list-foot"><span>VISUAL + FUNCIONALIDADE + ESTRUTURA</span><span>ÚNICA / 04 CAMADAS</span></div>
        </div>
      </div>
    </section>
  )
}
