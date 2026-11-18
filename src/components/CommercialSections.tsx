import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { faqItems, investments, testimonials } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import { BrandSymbol } from './BrandSymbol'
import './commercial.css'

const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value)

/**
 * Uma vitrine, não uma tabela de preços: todas as quatro entradas
 * ficam visíveis e a seleção revela o detalhe em um palco único.
 */
export function InvestmentSection() {
  const [selected, setSelected] = useState(0)
  const current = investments[selected]
  return (
    <section className="u-investment" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <header className="u-price-head u-reveal">
          <div>
            <span className="u-kicker">INVESTIMENTO / PONTO DE PARTIDA</span>
            <h2 className="u-h2" id="u-investment-title">Toda ideia tem um <mark>ponto de partida.</mark></h2>
          </div>
          <p>Algumas formas de começar. O projeto certo, a gente descobre conversando.</p>
        </header>

        <div className="u-price-layout">
          <div className="u-price-index" role="group" aria-label="Escolha uma solução">
            {investments.map((item, index) => (
              <button
                type="button" key={item.id}
                className={selected === index ? 'u-price-option is-active' : 'u-price-option'}
                aria-pressed={selected === index}
                aria-controls="u-price-stage"
                onClick={() => setSelected(index)}
              >
                <span className="u-price-no">{String(index + 1).padStart(2, '0')}</span>
                <span className="u-price-option-body">
                  <strong>{item.title}</strong>
                  <small>{item.startingAtBRL === null ? 'Sob orçamento' : 'Desde ' + money(item.startingAtBRL)}</small>
                </span>
                <span className="u-price-chevron" aria-hidden="true"><ArrowUpRight /></span>
              </button>
            ))}
            <div className="u-price-signature" aria-hidden="true">
              <BrandSymbol />
              <span>DO SEU JEITO.<br/>DO COMEÇO AO FINAL.</span>
            </div>
          </div>

          <div className="u-price-stage" id="u-price-stage" aria-live="polite" aria-atomic="true">
            <div className="u-price-stage-meta">
              <span>ÚNICA / {String(selected + 1).padStart(2, '0')}</span>
              <span>SEU PRÓXIMO PROJETO <span aria-hidden="true">↗</span></span>
            </div>
            <div className="u-price-stage-content" key={current.id}>
              <span className="u-price-small-title">UMA POSSIBILIDADE</span>
              <h3>{current.title}<span aria-hidden="true">.</span></h3>
              <p>{current.summary}</p>
              <div className="u-price-value">
                <span>{current.startingAtBRL === null ? 'INVESTIMENTO' : 'INVESTIMENTO INICIAL'}</span>
                <strong>{current.startingAtBRL === null ? 'Sob orçamento' : money(current.startingAtBRL)}</strong>
              </div>
              <a className="u-price-cta" href={whatsappLink(`Olá! Quero conversar sobre ${current.title.toLowerCase()} com a ÚNICA.`)} target="_blank" rel="noopener noreferrer">
                Conversar sobre essa ideia <ArrowUpRight />
              </a>
            </div>
            <BrandSymbol className="u-price-stage-brand" />
          </div>
        </div>
        <div className="u-price-footer">
          <p>Valores de entrada para escopos definidos. Domínio, hospedagem, integrações extras e manutenção são combinados à parte.</p>
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Outras ideias? <strong>Chama no WhatsApp.</strong> <ArrowUpRight /></a>
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
