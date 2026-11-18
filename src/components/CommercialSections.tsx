import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { faqItems, investments, testimonials } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import { BrandSymbol } from './BrandSymbol'
import './commercial.css'

const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
}).format(value)

// Quatro soluções na vitrine; todos os demais serviços continuam disponíveis por conversa.
export function InvestmentSection() {
  return (
    <section className="u-investment" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <div className="u-investment-top u-reveal">
          <div>
            <span className="u-kicker">INVESTIMENTO / ÚNICA</span>
            <h2 className="u-h2" id="u-investment-title">
              Sua ideia.<br/><mark>Nosso próximo projeto.</mark>
            </h2>
          </div>
          <div className="u-investment-top-aside">
            <BrandSymbol className="u-investment-symbol" />
            <p>Não precisa saber exatamente o que contratar. Esses são só alguns pontos de partida.</p>
          </div>
        </div>
        <div className="u-investment-list" aria-label="Quatro soluções e preços de partida">
          {investments.map((item, index) => (
            <a
              key={item.id} className="u-investment-line"
              href={whatsappLink(`Olá! Tenho interesse em ${item.title.toLowerCase()} e gostaria de conversar sobre meu projeto.`)}
              target="_blank" rel="noopener noreferrer"
              aria-label={`Conversar sobre ${item.title}, ${item.startingAtBRL === null ? 'sob orçamento' : 'a partir de ' + money(item.startingAtBRL)} no WhatsApp`}
            >
              <span className="u-investment-index">0{index + 1}</span>
              <span className="u-investment-name">
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
              </span>
              <span className="u-investment-pricegroup">
                <small>{item.startingAtBRL === null ? 'VALOR' : 'A PARTIR DE'}</small>
                <strong>{item.startingAtBRL === null ? 'Sob orçamento' : money(item.startingAtBRL)}</strong>
              </span>
              <span className="u-investment-go" aria-hidden="true"><ArrowUpRight /></span>
            </a>
          ))}
        </div>
        <div className="u-investment-bottom">
          <p>Também fazemos catálogos, cardápios, agendamentos e outras soluções. O investimento final depende do escopo. Domínio, hospedagem e manutenção são tratados separadamente.</p>
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            Não encontrou sua ideia? <strong>Fala com a gente.</strong><ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

// Seleção compacta das dúvidas mais úteis para a decisão de contratar.
// As outras são respondidas diretamente no WhatsApp.
const visibleFaq = [faqItems[0], faqItems[1], faqItems[3], faqItems[4]]

export function FAQSection() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <section className="u-faq" id="duvidas" aria-labelledby="u-faq-title">
      <div className="u-wrap u-faq-grid">
        <div className="u-faq-intro u-reveal">
          <span className="u-kicker">RESPOSTAS SEM ENROLAÇÃO</span>
          <h2 className="u-h2" id="u-faq-title">Antes de começar,<br/><mark>tira sua dúvida.</mark></h2>
          <p>O importante é saber o que esperar. O resto, a gente conversa.</p>
          <span className="u-faq-graphic" aria-hidden="true">?</span>
        </div>
        <div className="u-faq-questions">
          <div className="u-faq-caption"><span>O QUE VOCÊ QUER SABER?</span><span>01 / 04</span></div>
          {visibleFaq.map((item, index) => (
            <div className="u-faq-item" key={item.question}>
              <h3>
                <button
                  type="button" id={`u-faq-q-${index}`}
                  aria-expanded={active === index} aria-controls={`u-faq-a-${index}`}
                  onClick={() => setActive(active === index ? null : index)}
                >
                  <span className="u-faq-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="u-faq-question">{item.question}</span>
                  <span className="u-faq-plus" aria-hidden="true">{active === index ? '−' : '+'}</span>
                </button>
              </h3>
              {active === index && (
                <div className="u-faq-answer" id={`u-faq-a-${index}`} role="region" aria-labelledby={`u-faq-q-${index}`}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
          <a className="u-faq-contact" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            Ficou outra dúvida? <strong>Chama no WhatsApp.</strong><ArrowUpRight />
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
