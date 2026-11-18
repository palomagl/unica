import { useEffect, useRef, useState } from 'react'
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
  const [selected, setSelected] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (selected === null || !window.matchMedia('(min-width: 701px)').matches) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('.u-investment-dialog-content')
        if (!dialog) return
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'))
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [selected])

  const closeDetails = () => {
    setSelected(null)
    if (window.matchMedia('(min-width: 701px)').matches) {
      requestAnimationFrame(() => lastTriggerRef.current?.focus())
    }
  }

  return (
    <section className="u-investment u-investment-v3" id="investimento" aria-labelledby="u-investment-title">
      <div className="u-wrap">
        <header className="u-price-head u-reveal">
          <div>
            <span className="u-kicker">ÚNICA / INVESTIMENTO</span>
            <h2 className="u-h2" id="u-investment-title">
              <span className="u-investment-title-line">Escolha como</span>
              <span className="u-investment-title-line"><mark>começar.</mark></span>
            </h2>
          </div>
          <p>Do primeiro site ao projeto feito sob medida. Quatro caminhos para encontrar o que combina com seu negócio.</p>
        </header>

        <div className="u-investment-card-grid" aria-label="Soluções e investimentos iniciais">
          {investments.map((item, index) => {
            const details = investmentDetails[index]
            const isOpen = selected === index
            return (
              <article key={item.id} className={`u-investment-card u-investment-card--${details.theme}`}>
                <div className="u-investment-card-head">
                  <span className="u-investment-card-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="u-investment-card-tag">{index === 0 ? 'MAIS ACESSÍVEL' : index === 1 ? 'PERSONALIZÁVEL' : index === 2 ? 'VENDAS ONLINE' : 'SOB MEDIDA'}</span>
                </div>
                <div className="u-investment-card-main">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="u-investment-card-value">
                  <span>{item.startingAtBRL === null ? 'INVESTIMENTO' : 'A PARTIR DE'}</span>
                  <strong>{item.startingAtBRL === null ? 'Sob orçamento' : money(item.startingAtBRL)}</strong>
                </div>
                <div className="u-investment-card-examples">
                  <span>O QUE PODEMOS CONSTRUIR</span>
                  <ul>
                    {details.possibilities.map(possibility => <li key={possibility}>{possibility}</li>)}
                  </ul>
                </div>
                <button className="u-investment-card-toggle" type="button"
                  aria-expanded={isOpen}
                  aria-controls={`u-investment-card-mobile-${item.id}`}
                  onClick={event => {
                    lastTriggerRef.current = event.currentTarget
                    if (isOpen) closeDetails()
                    else setSelected(index)
                  }}>
                  <span>{isOpen ? 'Fechar detalhes' : 'Entender melhor'}</span>
                  <span className="u-investment-card-icon" aria-hidden="true">{isOpen ? '−' : '↗'}</span>
                </button>
                <div className="u-investment-card-mobile-detail" id={`u-investment-card-mobile-${item.id}`}>
                  {isOpen && <PriceDetails index={index} id={`u-investment-mobile-info-${item.id}`}/>}
                </div>
              </article>
            )
          })}
        </div>

        <div className="u-investment-contact">
          <div>
            <span>AINDA NÃO SABE POR ONDE COMEÇAR?</span>
            <strong>A gente encontra o caminho junto.</strong>
          </div>
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
            Falar sobre meu projeto <ArrowUpRight/>
          </a>
        </div>
        <p className="u-investment-disclaimer">Valores iniciais para escopos definidos. Funcionalidades, domínio, hospedagem, integrações e manutenção são combinados na proposta.</p>
      </div>

      {selected !== null && <div className="u-investment-dialog" role="presentation"
          onMouseDown={event => { if (event.target === event.currentTarget) closeDetails() }}>
        <div className="u-investment-dialog-content" role="dialog" aria-modal="true"
          aria-labelledby="u-investment-dialog-heading">
          <div className="u-investment-dialog-top">
            <span>ÚNICA / CONHEÇA A SOLUÇÃO</span>
            <button type="button" ref={closeRef} onClick={closeDetails} aria-label="Fechar detalhes">✕</button>
          </div>
          <h3 id="u-investment-dialog-heading">{investments[selected].title}<span aria-hidden="true">.</span></h3>
          <PriceDetails index={selected} id="u-investment-dialog-detail" />
        </div>
      </div>}
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
