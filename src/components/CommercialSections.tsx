import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { faqItems, investments, testimonials } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import './commercial.css'

const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value)

/**
 * A ÚNICA mostra quatro referências, sem vender "planos fechados".
 * Destaques são editoriais: entrada acessível + soluções personalizadas.
 */
export function InvestmentSection() {
  const design = [
    { label: 'COMECE POR AQUI', style: 'entry', indexLabel: 'A MAIS ACESSÍVEL' },
    { label: 'FEITO PARA SUA MARCA', style: 'brand', indexLabel: 'PERSONALIZÁVEL' },
    { label: 'VENDA PELA INTERNET', style: 'store', indexLabel: 'VENDAS ONLINE' },
    { label: 'SEM FÓRMULA PRONTA', style: 'bespoke', indexLabel: 'SOB MEDIDA' },
  ] as const

  return (
    <section className="u-investment u-investment-v2" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <header className="u-price-head u-reveal">
          <div>
            <span className="u-kicker">INVESTIMENTO / PONTO DE PARTIDA</span>
            <h2 className="u-h2" id="u-investment-title">Toda ideia tem um <mark>ponto de partida.</mark></h2>
          </div>
          <p>Do primeiro site a uma solução feita do zero. Escolha o que combina com sua ideia.</p>
        </header>
        <div className="u-price-card-grid" aria-label="Quatro opções de investimento">
          {investments.map((item, index) => (
            <article key={item.id} className={`u-price-card u-price-card--${design[index].style}`}>
              <div className="u-price-card-top">
                <span className="u-price-card-number">{String(index + 1).padStart(2, '0')} / 04</span>
                <span className="u-price-card-eyebrow">{design[index].label}</span>
              </div>
              <div className="u-price-card-body">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <div className="u-price-card-bottom">
                <span className="u-price-card-kind">{design[index].indexLabel}</span>
                <div className="u-price-card-cost">
                  <span>{item.startingAtBRL === null ? 'INVESTIMENTO' : 'A PARTIR DE'}</span>
                  <strong>{item.startingAtBRL === null ? 'Sob orçamento' : money(item.startingAtBRL)}</strong>
                </div>
                <a className="u-price-card-cta"
                  href={whatsappLink(`Olá! Tenho interesse em ${item.title.toLowerCase()} e gostaria de conversar sobre o meu projeto com a ÚNICA.`)}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={`Conversar sobre ${item.title} no WhatsApp`}>
                  <span>Quero conversar</span><ArrowUpRight />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="u-price-footer">
          <p>São valores de partida, não pacotes fechados. Funcionalidades, domínio, hospedagem e manutenção são definidos na proposta.</p>
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            <span>Não achou sua ideia? <strong>Fala com a gente.</strong></span><ArrowUpRight />
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
