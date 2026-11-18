import { useState } from 'react'
import { QUOTE_LINK, whatsappLink } from '../content'
import { investments, testimonials } from '../commercial-content'
import { ArrowUpRight } from './InterfaceIcons'
import './commercial.css'

const formatBRL = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
}).format(value)

export function InvestmentSection() {
  const [selected, setSelected] = useState(0)
  const current = investments[selected]
  const price = current.customQuote
    ? 'Sob orçamento'
    : current.startingAtBRL === null
      ? 'A definir'
      : 'A partir de ' + formatBRL(current.startingAtBRL)

  return <section className="u-investment" id="investimento" aria-labelledby="u-investment-title">
    <div className="u-wrap">
      <div className="u-investment-head u-reveal">
        <span className="u-kicker">DESCUBRA O INVESTIMENTO</span>
        <h2 className="u-h2" id="u-investment-title">Toda ideia tem um <mark>ponto de partida.</mark></h2>
        <p>Escolha o que faz sentido pra você. O valor final depende do que será construído.</p>
      </div>
      <div className="u-investment-body">
        <div className="u-investment-list" role="group" aria-label="Tipo de solução">
          {investments.map((item, index) =>
            <button key={item.id} type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              className={index === selected ? 'u-investment-option is-active' : 'u-investment-option'}>
              <span className="u-investment-num">0{index + 1}</span>
              <span>{item.title}</span>
              <span className="u-investment-indicator" aria-hidden="true"><ArrowUpRight /></span>
            </button>
          )}
        </div>
        <div className="u-investment-detail" aria-live="polite">
          <div className="u-investment-detail-top">
            <span>SOLUÇÃO SELECIONADA</span><span>0{selected + 1} / 04</span>
          </div>
          <h3>{current.title}</h3>
          <p className="u-investment-summary">{current.summary}</p>
          <div className="u-investment-insight">
            <p><strong>O que pode ser criado</strong>{current.deliverables}</p>
            <p><strong>Por que faz sentido</strong>{current.benefit}</p>
          </div>
          <div className="u-investment-bottom">
            <div className="u-investment-price"><small>INVESTIMENTO INICIAL</small><strong>{price}</strong></div>
            <a className="u-pill" href={whatsappLink('Olá! Quero conversar sobre um projeto de ' + current.title + ' com a ÚNICA.')}
              target="_blank" rel="noopener noreferrer">Começar um projeto <ArrowUpRight /></a>
          </div>
        </div>
      </div>
      <p className="u-investment-note">O investimento depende do escopo, das funcionalidades e das necessidades de cada projeto. Valores de partida serão publicados somente após aprovação.</p>
    </div>
  </section>
}

const steps = [
  ['01', 'A gente conversa.', 'Entendemos o negócio, o desafio e o que você deseja construir.'],
  ['02', 'A ideia toma forma.', 'Definimos a solução, o escopo, o investimento e os próximos passos.'],
  ['03', 'A gente desenvolve.', 'Criamos a experiência, ajustamos os detalhes e realizamos os testes.'],
  ['04', 'Seu projeto ganha vida.', 'Preparamos a publicação e combinamos os cuidados após a entrega.'],
] as const

export function ProcessSection() {
  return <section className="u-method" id="metodo" aria-labelledby="u-method-title">
    <div className="u-wrap u-method-layout">
      <div className="u-method-title u-reveal">
        <span className="u-kicker">DO PRIMEIRO OI À ENTREGA</span>
        <h2 className="u-h2" id="u-method-title">Sem mistério.<br/><mark>Com direção.</mark></h2>
        <p>Um processo claro, sem complicar o que precisa ser simples.</p>
        <a href={QUOTE_LINK} className="u-method-link" target="_blank" rel="noopener noreferrer">Vamos conversar? <ArrowUpRight /></a>
      </div>
      <ol className="u-method-steps">
        {steps.map(([number, title, description]) =>
          <li key={number} className="u-method-step">
            <span className="u-method-step-num">{number}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
            <span className="u-method-step-arrow" aria-hidden="true"><ArrowUpRight /></span>
          </li>
        )}
      </ol>
    </div>
  </section>
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
