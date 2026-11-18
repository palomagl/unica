import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { faqItems, investmentCategories, investments, testimonials, type InvestmentCategoryId } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import { BrandSymbol } from './BrandSymbol'
import './commercial.css'

const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value)

export function InvestmentSection() {
  const [category, setCategory] = useState<InvestmentCategoryId>('presenca')
  const [selected, setSelected] = useState(0)
  const list = investments.filter(item => item.category === category)
  const current = list[selected] ?? list[0]
  const categoryIndex = investmentCategories.findIndex(item => item.id === category)

  function chooseCategory(id: InvestmentCategoryId) {
    setCategory(id)
    setSelected(0)
  }

  return (
    <section className="u-investment u-editorial" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <div className="u-investment-intro u-reveal">
          <span className="u-kicker">INVESTIMENTO / ÚNICA</span>
          <div className="u-investment-intro-grid">
            <h2 className="u-h2" id="u-investment-title">Toda ideia tem um <mark>ponto de partida.</mark></h2>
            <p>Não precisa saber o nome técnico. Escolha o que você quer fazer, veja o investimento inicial e vamos conversar.</p>
          </div>
        </div>

        <div className="u-investment-choices" role="tablist" aria-label="O que você quer construir?">
          {investmentCategories.map((item, i) => (
            <button
              key={item.id} id={`u-choice-${item.id}`}
              className={category === item.id ? 'u-investment-choice is-active' : 'u-investment-choice'}
              role="tab" type="button"
              aria-controls="u-investment-stage"
              aria-selected={category === item.id}
              tabIndex={category === item.id ? 0 : -1}
              onClick={() => chooseCategory(item.id)}
              onKeyDown={event => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
                event.preventDefault()
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? investmentCategories.length - 1
                  : (categoryIndex + (event.key === 'ArrowRight' ? 1 : -1) + investmentCategories.length) % investmentCategories.length
                chooseCategory(investmentCategories[next].id)
                document.getElementById(`u-choice-${investmentCategories[next].id}`)?.focus()
              }}
            >
              <span className="u-investment-choice-number">0{i + 1}</span>
              <span>{item.label}</span>
              <span className="u-investment-choice-mark" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div className="u-investment-stage" id="u-investment-stage" role="tabpanel"
          aria-labelledby={`u-choice-${category}`} tabIndex={0}>
          <div className="u-investment-stage-meta">
            <span>SELECIONE UMA SOLUÇÃO</span>
            <span>{String(selected + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
          </div>

          <div className="u-investment-detail" key={current.id}>
            <div className="u-investment-detail-main">
              <h3>{current.title}<span className="u-investment-period" aria-hidden="true">.</span></h3>
              <p>{current.summary}</p>
              {current.details && <small>{current.details}</small>}
            </div>
            <div className="u-investment-detail-price">
              <span>{current.startingAtBRL === null ? 'INVESTIMENTO' : 'A PARTIR DE'}</span>
              <strong>{current.startingAtBRL === null ? 'Sob orçamento' : money(current.startingAtBRL)}</strong>
              <a
                href={whatsappLink(`Olá! Tenho interesse em ${current.title.toLowerCase()} e gostaria de conversar sobre meu projeto.`)}
                target="_blank" rel="noopener noreferrer"
                className="u-pill u-investment-cta"
              >Conversar sobre essa ideia <ArrowUpRight /></a>
            </div>
          </div>
          <div className="u-investment-rail" role="group" aria-label="Escolher uma solução dentro da categoria">
            {list.map((item, index) => (
              <button key={item.id} type="button"
                className={selected === index ? 'u-investment-rail-item is-active' : 'u-investment-rail-item'}
                aria-pressed={selected === index} onClick={() => setSelected(index)}>
                <span>0{index + 1}</span>
                {item.title}
              </button>
            ))}
            <BrandSymbol className="u-investment-rail-symbol" />
          </div>
        </div>
        <p className="u-investment-fineprint">Cada projeto tem seu escopo. Valores de entrada, não pacotes fechados. Domínio, hospedagem e manutenção são combinados separadamente.</p>
      </div>
    </section>
  )
}

export function FAQSection() {
  const [active, setActive] = useState<number | null>(0)
  return (
    <section className="u-faq u-editorial" id="duvidas" aria-labelledby="u-faq-title">
      <div className="u-wrap u-faq-editorial">
        <div className="u-faq-aside u-reveal">
          <span className="u-kicker">ANTES DE COMEÇAR</span>
          <h2 className="u-h2" id="u-faq-title">Ficou alguma <mark>dúvida?</mark></h2>
          <p>As perguntas mais comuns, sem complicação.</p>
          <div className="u-faq-sign" aria-hidden="true">
            <span>?</span>
            <BrandSymbol className="u-faq-sign-symbol" />
          </div>
        </div>
        <div className="u-faq-content">
          <div className="u-faq-content-header">
            <span>PERGUNTAS FREQUENTES</span>
            <span>01 — 0{faqItems.length}</span>
          </div>
          <div className="u-faq-list">
            {faqItems.map((item, index) => (
              <div key={item.question} className={active === index ? 'u-faq-item is-active' : 'u-faq-item'}>
                <h3>
                  <button type="button" id={`u-faq-q-${index}`}
                    aria-expanded={active === index} aria-controls={`u-faq-a-${index}`}
                    onClick={() => setActive(active === index ? null : index)}>
                    <span className="u-faq-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="u-faq-question-text">{item.question}</span>
                    <span className="u-faq-toggle" aria-hidden="true">{active === index ? '−' : '+'}</span>
                  </button>
                </h3>
                {active === index && (
                  <div role="region" aria-labelledby={`u-faq-q-${index}`}
                    id={`u-faq-a-${index}`} className="u-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <a className="u-faq-outro" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            Quer perguntar outra coisa? <strong>Chama a ÚNICA.</strong><ArrowUpRight />
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
          <p>“{item.quote}”</p>
          <footer>{item.name} · {item.company}</footer>
        </blockquote>)}
      </div>
    </div>
  </section>
}
