import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { faqItems, investments, testimonials } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import './commercial.css'

const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value)

const investmentDetails = [
  {
    label: 'PARA COMEÇAR',
    theme: 'entry',
    audience: 'Para divulgar um serviço, produto, campanha ou negócio que precisa de uma apresentação objetiva.',
    possibilities: ['Página focada em uma oferta', 'Visual responsivo e informações essenciais', 'Contato e chamada para ação'],
  },
  {
    label: 'SUA MARCA NA INTERNET',
    theme: 'brand',
    audience: 'Para empresas que querem reunir serviços, informações, diferenciais e formas de contato em um lugar próprio.',
    possibilities: ['Páginas institucionais', 'Seções de serviços e apresentação', 'Recursos e integrações avaliados na proposta'],
  },
  {
    label: 'VENDAS ONLINE',
    theme: 'store',
    audience: 'Para negócios que precisam apresentar produtos e oferecer uma jornada de compra online.',
    possibilities: ['Catálogo e organização de produtos', 'Carrinho e fluxo de pedidos', 'Pagamentos e frete conforme o escopo'],
  },
  {
    label: 'DO SEU JEITO',
    theme: 'bespoke',
    audience: 'Para ideias que precisam de funcionalidades próprias, organização de processos ou experiências específicas.',
    possibilities: ['Sistemas para tarefas e operações', 'Aplicativos e plataformas', 'Integrações e automações sob análise'],
  },
] as const

function PriceDetails({ index, id }: { index: number; id: string }) {
  const item = investments[index]
  const details = investmentDetails[index]
  return (
    <div className="u-price-explanation" id={id}>
      <div className="u-price-explanation-copy">
        <span className="u-price-detail-kicker">ENTENDA ESSA SOLUÇÃO</span>
        <h4>Para quem faz sentido?</h4>
        <p>{details.audience}</p>
        <span className="u-price-detail-kicker u-price-example-label">O QUE PODEMOS CONSTRUIR</span>
        <ul>
          {details.possibilities.map(possibility => <li key={possibility}>{possibility}</li>)}
        </ul>
      </div>
      <div className="u-price-explanation-action">
        <span className="u-price-detail-kicker">{item.startingAtBRL === null ? 'INVESTIMENTO' : 'A PARTIR DE'}</span>
        <strong>{item.startingAtBRL === null ? 'Sob orçamento' : money(item.startingAtBRL)}</strong>
        <a href={whatsappLink(`Olá! Gostaria de conversar sobre ${item.title.toLowerCase()} com a ÚNICA.`)}
          target="_blank" rel="noopener noreferrer" className="u-price-detail-cta">
          Conversar sobre essa ideia <ArrowUpRight />
        </a>
      </div>
    </div>
  )
}

export function InvestmentSection() {
  const [selected, setSelected] = useState<number | null>(0)

  return (
    <section className="u-investment u-investment-v2" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <header className="u-price-head u-reveal">
          <div>
            <span className="u-kicker">INVESTIMENTO / PONTO DE PARTIDA</span>
            <h2 className="u-h2" id="u-investment-title">Toda ideia tem um <mark>ponto de partida.</mark></h2>
          </div>
          <p>Quatro caminhos possíveis. Toque em um para entender o que podemos construir.</p>
        </header>

        <div className="u-investment-explorer">
          <div className="u-investment-option-grid" aria-label="Escolha a solução que combina com sua ideia">
            {investments.map((item, index) => {
              const info = investmentDetails[index]
              const isOpen = selected === index
              return (
                <article key={item.id} className={`u-investment-option u-investment-option--${info.theme}${isOpen ? ' is-open' : ''}`}>
                  <button
                    className="u-investment-option-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`u-investment-mobile-panel-${item.id}`}
                    onClick={() => setSelected(isOpen ? null : index)}
                  >
                    <span className="u-investment-option-top">
                      <span className="u-investment-option-no">0{index + 1} / 04</span>
                      <span className="u-investment-option-label">{info.label}</span>
                    </span>
                    <span className="u-investment-option-name">{item.title}</span>
                    <span className="u-investment-option-bottom">
                      <span className="u-investment-option-price">
                        <small>{item.startingAtBRL === null ? 'INVESTIMENTO' : 'A PARTIR DE'}</small>
                        <strong>{item.startingAtBRL === null ? 'Sob orçamento' : money(item.startingAtBRL)}</strong>
                      </span>
                      <span className="u-investment-option-indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </span>
                    <span className="u-investment-option-hint">{isOpen ? 'Ocultar detalhes' : 'Entender essa solução'}</span>
                  </button>
                  <div className="u-investment-mobile-panel" id={`u-investment-mobile-panel-${item.id}`}>
                    {isOpen && <PriceDetails index={index} id={`u-investment-mobile-detail-${item.id}`} />}
                  </div>
                </article>
              )
            })}
          </div>
          <div className="u-investment-desktop-panel" aria-live="polite">
            {selected === null ? (
              <div className="u-investment-desktop-empty">
                <span>ÚNICA / SEU PRÓXIMO PROJETO</span>
                <strong>Uma ideia de cada vez.</strong>
                <p>Escolha uma opção ao lado para entender onde ela pode levar seu negócio.</p>
              </div>
            ) : (
              <div key={investments[selected].id} className="u-investment-desktop-inner">
                <div className="u-investment-desktop-meta">
                  <span>ÚNICA / 0{selected + 1}</span>
                  <span>ENTENDA A SOLUÇÃO ↗</span>
                </div>
                <h3>{investments[selected].title}<span aria-hidden="true">.</span></h3>
                <PriceDetails index={selected} id="u-investment-desktop-detail" />
              </div>
            )}
          </div>
        </div>
        <div className="u-price-footer">
          <p>Esses são pontos de partida, não planos fechados. Escopo, domínio, hospedagem, integrações e manutenção são definidos em proposta.</p>
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            <span>Não sabe qual escolher? <strong>A gente te ajuda.</strong></span><ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

// Dúvidas curtas, não uma segunda vitrine de serviços.
const visibleFaq = [faqItems[1], faqItems[0], faqItems[3], faqItems[4]]

export function FAQSection() {
  const [active, setActive] = useState<number | null>(0)
  return (
    <section className="u-faq" id="duvidas" aria-labelledby="u-faq-title">
      <div className="u-wrap u-faq-layout">
        <div className="u-faq-intro u-reveal">
          <span className="u-kicker">DÚVIDAS / SEM COMPLICAÇÃO</span>
          <h2 className="u-h2" id="u-faq-title">Antes de<br/>começar, <mark>pergunta.</mark></h2>
          <p>Sem letras miúdas ou conversa complicada.</p>
          <div className="u-faq-art" aria-hidden="true">
            <span className="u-faq-art-question">?</span>
            <span className="u-faq-art-stripe" />
          </div>
        </div>

        <div className="u-faq-body">
          <div className="u-faq-meta"><span>A ÚNICA RESPONDE</span><span>01 — 04</span></div>
          {visibleFaq.map((item, index) => (
            <div key={item.question} className={active === index ? 'u-faq-entry is-active' : 'u-faq-entry'}>
              <h3>
                <button type="button" id={`u-faq-q-${index}`}
                  aria-expanded={active === index}
                  aria-controls={`u-faq-a-${index}`}
                  onClick={() => setActive(active === index ? null : index)}
                >
                  <span className="u-faq-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="u-faq-question">{item.question}</span>
                  <span className="u-faq-plus" aria-hidden="true">{active === index ? '−' : '+'}</span>
                </button>
              </h3>
              {active === index &&
                <div id={`u-faq-a-${index}`} role="region" aria-labelledby={`u-faq-q-${index}`} className="u-faq-answer">
                  <p>{item.answer}</p>
                </div>
              }
            </div>
          ))}
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="u-faq-outro">
            Tem outra dúvida? <strong>Conversa com a gente.</strong><ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const visible = testimonials.filter(item => item.approved && item.quote.trim() && item.name.trim() && item.company.trim())
  if (!visible.length) return null
  return <section className="u-testimonials" aria-label="Depoimentos de clientes">
    <div className="u-wrap">
      <span className="u-kicker">QUEM JÁ CONSTRUIU COM A GENTE</span>
      <div className="u-testimonials-list">
        {visible.map(item => <blockquote key={item.name + item.company}>
          <p>“{item.quote}”</p><footer>{item.name} · {item.company}</footer>
        </blockquote>)}
      </div>
    </div>
  </section>
}
