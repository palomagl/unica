import { useState } from 'react'
import { ArrowUpRight } from './InterfaceIcons'
import { QUOTE_LINK } from '../content'
import './experience.css'

const details = [
  {
    title: 'Identidade',
    eyebrow: '01 / MEMORÁVEL',
    statement: 'Ser visto é bom. Ser lembrado é melhor.',
    explanation: 'Tipografia, cores e pequenos movimentos que fazem a marca ter personalidade sem perder clareza.',
    words: ['Direção visual', 'Consistência', 'Microinterações'],
  },
  {
    title: 'Facilidade',
    eyebrow: '02 / INTUITIVO',
    statement: 'Cada clique precisa fazer sentido.',
    explanation: 'Uma jornada simples para encontrar informações, fazer um pedido ou concluir uma tarefa.',
    words: ['UX/UI', 'Acessibilidade', 'Conversão'],
  },
  {
    title: 'Leveza',
    eyebrow: '03 / DESEMPENHO',
    statement: 'Efeito bonito não pode atrapalhar.',
    explanation: 'Animações com propósito e uma experiência pensada para funcionar bem, inclusive no celular.',
    words: ['Performance', 'Mobile-first', 'Responsividade'],
  },
  {
    title: 'Evolução',
    eyebrow: '04 / CONTINUIDADE',
    statement: 'Pensado para o agora. Pronto para o próximo passo.',
    explanation: 'Soluções organizadas para receber melhorias, novos recursos e integrações conforme o negócio evolui.',
    words: ['Estrutura', 'Manutenção', 'Integrações'],
  },
] as const

/** Vitrine de princípios, não uma interface fictícia de aplicativo. */
export function ExperienceLab() {
  const [active, setActive] = useState(0)
  const current = details[active]
  return (
    <section className="u-details" id="experiencia" aria-labelledby="u-details-title">
      <div className="u-wrap">
        <div className="u-details-heading u-reveal">
          <div>
            <span className="u-kicker">O QUE FAZ A DIFERENÇA</span>
            <h2 className="u-h2" id="u-details-title">Cada detalhe<br /><em>conta.</em></h2>
          </div>
          <p>Do primeiro olhar ao último clique: a experiência precisa ser bonita, intuitiva, leve e pensada para as pessoas.</p>
        </div>

        <div className="u-details-switches u-reveal" role="group" aria-label="Explore os diferenciais">
          {details.map((item, i) => (
            <button type="button" key={item.title}
              className={active === i ? 'u-details-switch is-active' : 'u-details-switch'}
              aria-pressed={active === i} onClick={() => setActive(i)}>
              <span className="u-details-index">0{i + 1}</span>
              <strong>{item.title}</strong>
              <span className="u-details-indicator" aria-hidden="true"><ArrowUpRight /></span>
            </button>
          ))}
        </div>

        <div className="u-details-focus u-reveal">
          <div className="u-details-focus-copy" key={active} aria-live="polite">
            <span className="u-details-eyebrow">{current.eyebrow}</span>
            <h3>{current.statement}</h3>
            <p>{current.explanation}</p>
          </div>
          <div className="u-details-aside">
            <div className="u-details-words">
              {current.words.map(word => <span key={word}>{word}</span>)}
            </div>
            <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="u-details-link">
              Conversar sobre meu projeto <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="u-details-signature" aria-hidden="true">
          <span>BELEZA + FUNÇÃO + EXPERIÊNCIA</span>
          <span className="u-details-line" />
          <span>ÚNICA®</span>
        </div>
      </div>
    </section>
  )
}
