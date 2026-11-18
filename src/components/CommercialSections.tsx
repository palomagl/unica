import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { faqItems, investmentCategories, investments, testimonials, type InvestmentCategoryId } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import './commercial.css'

const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value)

export function InvestmentSection() {
  const [active, setActive] = useState<InvestmentCategoryId>('presenca')
  const category = investmentCategories.find(item => item.id === active)!
  const items = investments.filter(item => item.category === active)

  return (
    <section className="u-investment" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <div className="u-investment-heading">
          <div>
            <span className="u-kicker">INVESTIMENTO / 01—03</span>
            <h2 className="u-h2" id="u-investment-title">Escolha por onde <mark>começar.</mark></h2>
          </div>
          <p>Uma solução pra cada momento. Encontre seu ponto de partida e a gente conversa sobre o que você precisa.</p>
        </div>
        <div className="u-investment-tabs" role="tablist" aria-label="Categorias de investimento">
          {investmentCategories.map((item, index) => (
            <button
              key={item.id} type="button" id={`u-investment-tab-${item.id}`}
              className={item.id === active ? 'u-investment-tab is-active' : 'u-investment-tab'}
              role="tab" tabIndex={item.id === active ? 0 : -1} aria-selected={item.id === active}
              aria-controls="u-investment-results"
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
                event.preventDefault()
                const current = investmentCategories.findIndex(c => c.id === active)
                const next = event.key === 'Home' ? 0 : event.key === 'End'
                  ? investmentCategories.length - 1
                  : (current + (event.key === 'ArrowRight' ? 1 : -1) + investmentCategories.length) % investmentCategories.length
                setActive(investmentCategories[next].id)
                document.getElementById(`u-investment-tab-${investmentCategories[next].id}`)?.focus()
              }}
              onClick={() => setActive(item.id)}
            >
              <span className="u-investment-tab-number">0{index + 1}</span>
              <span>{item.label}</span>
              <span className="u-investment-tab-dot" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="u-investment-category-heading">
          <span>{category.note}</span>
          <span>{String(items.length).padStart(2, '0')} SOLUÇÕES</span>
        </div>
        <div
          className="u-investment-results" role="tabpanel"
          id="u-investment-results" aria-labelledby={`u-investment-tab-${active}`}
          key={active} tabIndex={0}
        >
          {items.map((item, index) => (
            <article className="u-investment-product" key={item.id}>
              <div className="u-investment-product-main">
                <span className="u-investment-product-index">0{index + 1} / {category.label.toUpperCase()}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                {item.details && <small>{item.details}</small>}
              </div>
              <div className="u-investment-product-side">
                <span className="u-investment-price-label">{item.startingAtBRL === null ? 'INVESTIMENTO' : 'A PARTIR DE'}</span>
                <strong className="u-investment-price">{item.startingAtBRL === null ? 'Sob orçamento' : money(item.startingAtBRL)}</strong>
                <a
                  href={whatsappLink(`Olá! Tenho interesse em ${item.title.toLowerCase()} e gostaria de conversar sobre meu projeto.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="u-investment-action"
                >Quero essa solução <ArrowUpRight /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="u-investment-footnote">Valores iniciais para escopos definidos, não preços fixos. O orçamento final depende das funcionalidades e complexidade. Domínio, hospedagem, serviços de terceiros e manutenção são tratados separadamente.</p>
      </div>
    </section>
  )
}

export function FAQSection() {
  const [active, setActive] = useState<number | null>(0)
  return (
    <section className="u-faq" id="duvidas" aria-labelledby="u-faq-title">
      <div className="u-wrap">
        <div className="u-faq-heading">
          <span className="u-kicker">PERGUNTAS RÁPIDAS / SEM ENROLAÇÃO</span>
          <h2 className="u-h2" id="u-faq-title">Ainda ficou <mark>alguma dúvida?</mark></h2>
          <p>Antes de começar, a gente te explica.</p>
        </div>
        <div className="u-faq-layout">
          <div className="u-faq-choices" role="group" aria-label="Escolha uma dúvida">
            {faqItems.map((item, index) => (
              <div className="u-faq-entry" key={item.question}>
                <button
                  type="button"
                  className={active === index ? 'u-faq-question is-active' : 'u-faq-question'}
                  aria-expanded={active === index}
                  aria-controls={`u-faq-answer-mobile-${index}`}
                  onClick={() => setActive(active === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="u-faq-question-icon" aria-hidden="true">{active === index ? '−' : '+'}</span>
                </button>
                {active === index && <div className="u-faq-mobile-answer" id={`u-faq-answer-mobile-${index}`} role="region">
                  <span className="u-faq-response-label">ÚNICA RESPONDE / 0{index + 1}</span>
                  <p>{item.answer}</p>
                </div>}
              </div>
            ))}
          </div>
          <div className="u-faq-response" id="u-faq-answer" aria-live="polite" aria-atomic="true">
            {active === null ? (
              <div className="u-faq-empty">
                <span aria-hidden="true">↗</span>
                <p>Escolha uma pergunta para descobrir a resposta.</p>
              </div>
            ) : (
              <div className="u-faq-response-content" key={active}>
                <span className="u-faq-response-label">ÚNICA RESPONDE / 0{active + 1}</span>
                <h3>{faqItems[active].question}</h3>
                <p>{faqItems[active].answer}</p>
                <span className="u-faq-endmark" aria-hidden="true">↗</span>
              </div>
            )}
          </div>
        </div>
        <a className="u-faq-contact" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
          Sua dúvida não está aqui? <strong>Vamos conversar.</strong><ArrowUpRight />
        </a>
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
        {visible.map((item) => <blockquote key={item.name + item.company}>
          <p>“{item.quote}”</p>
          <footer>{item.name} · {item.company}</footer>
        </blockquote>)}
      </div>
    </div>
  </section>
}
