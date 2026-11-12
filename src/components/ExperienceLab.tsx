import { useState } from 'react'
import { ArrowUpRight } from './InterfaceIcons'
import { QUOTE_LINK } from '../content'
import './experience.css'

type Scenario = 'vendas' | 'gestao' | 'contato'
type Screen = 'desktop' | 'mobile'

const stories: Record<Scenario, {
  number: string
  label: string
  headline: string
  subtitle: string
  benefits: string[]
  action: string
  done: string
  insight: string
}> = {
  vendas: {
    number: '01',
    label: 'Vender sem complicar',
    headline: 'Menos cliques. Mais clareza.',
    subtitle: 'O cliente encontra o que procura, entende a oferta e sabe exatamente qual é o próximo passo.',
    benefits: ['Navegação intuitiva', 'Catálogo organizado', 'Ação clara'],
    action: 'Selecionar produto',
    done: 'Produto selecionado',
    insight: 'Uma jornada bem pensada reduz dúvidas e facilita a decisão de compra.',
  },
  gestao: {
    number: '02',
    label: 'Organizar a operação',
    headline: 'Tudo no lugar certo.',
    subtitle: 'O que era espalhado por planilhas e mensagens vira uma experiência simples de acompanhar.',
    benefits: ['Informação centralizada', 'Fluxo de trabalho', 'Automação'],
    action: 'Concluir tarefa',
    done: 'Tarefa concluída',
    insight: 'A ferramenta se adapta ao processo da empresa — não o contrário.',
  },
  contato: {
    number: '03',
    label: 'Gerar oportunidades',
    headline: 'O interesse vira conversa.',
    subtitle: 'O visitante entende o serviço e encontra um caminho direto para entrar em contato.',
    benefits: ['Mensagem objetiva', 'Conversão', 'Contato acessível'],
    action: 'Preparar solicitação',
    done: 'Solicitação preparada',
    insight: 'Cada etapa da página tem um objetivo e conduz o visitante sem confusão.',
  },
}

export function ExperienceLab() {
  const [scenario, setScenario] = useState<Scenario>('vendas')
  const [screen, setScreen] = useState<Screen>('desktop')
  const [done, setDone] = useState(false)
  const selected = stories[scenario]
  const change = (value: Scenario) => { setScenario(value); setDone(false) }

  return (
    <section id="experiencia" className="u-lab" aria-labelledby="u-lab-heading">
      <div className="u-wrap">
        <div className="u-lab-intro u-reveal">
          <div>
            <span className="u-kicker">O QUE EXISTE ALÉM DO VISUAL</span>
            <h2 className="u-h2" id="u-lab-heading">Cada detalhe tem<br/><em>um motivo.</em></h2>
          </div>
          <p>Não é só escolher uma cor. É pensar em quem vai usar, no que precisa acontecer e em como tudo funciona no computador e no celular. Teste uma experiência.</p>
        </div>
        <div className="u-lab-shell u-reveal">
          <div className="u-lab-bar">
            <span>EXPERIENCE LAB <i /> DEMONSTRAÇÃO INTERATIVA</span>
            <div className="u-lab-devices" role="group" aria-label="Tamanho da tela de demonstração">
              <button type="button" className={screen==='desktop'?'is-on':''} aria-pressed={screen==='desktop'} onClick={()=>setScreen('desktop')}>Desktop</button>
              <button type="button" className={screen==='mobile'?'is-on':''} aria-pressed={screen==='mobile'} onClick={()=>setScreen('mobile')}>Celular</button>
            </div>
          </div>
          <div className="u-lab-content">
            <div className="u-lab-choices">
              <span className="u-lab-overline">ESCOLHA O OBJETIVO</span>
              {(Object.keys(stories) as Scenario[]).map(key => (
                <button className={scenario===key?'is-active':''} key={key} type="button" aria-pressed={scenario===key} onClick={()=>change(key)}>
                  <span>{stories[key].number}</span><strong>{stories[key].label}</strong><ArrowUpRight />
                </button>
              ))}
              <div className="u-lab-why" aria-live="polite">
                <span>POR QUE ISSO IMPORTA?</span>
                <p>{selected.insight}</p>
              </div>
            </div>
            <div className="u-lab-stage">
              <div className={`u-lab-device ${screen==='mobile'?'is-mobile':''}`} key={screen}>
                <div className="u-lab-device-top"><span className="u-lab-lights"><i/><i/><i/></span><span>PROTÓTIPO / {screen==='mobile'?'MOBILE':'DESKTOP'}</span><span>↗</span></div>
                <div className="u-lab-app" key={scenario}>
                  <div className="u-lab-app-top"><strong>NOVA<span>·</span></strong><span>EXPERIÊNCIA DIGITAL / DEMO</span></div>
                  {scenario==='vendas' && <div className="u-lab-scene">
                    <span className="u-lab-scene-label">CATÁLOGO DIGITAL / 01</span>
                    <div className="u-lab-product-art" aria-hidden="true"><i/><i/><i/></div>
                    <h3>Seu próximo favorito.</h3>
                    <p>Informações claras, escolha fácil e o próximo passo sempre visível.</p>
                    <div className="u-lab-price">DETALHES ESSENCIAIS <span>→</span></div>
                  </div>}
                  {scenario==='gestao' && <div className="u-lab-scene">
                    <span className="u-lab-scene-label">PAINEL DE OPERAÇÃO / 02</span>
                    <h3>Uma rotina. Um lugar.</h3>
                    <div className="u-lab-task"><span className="u-lab-task-icon">✓</span><div><strong>Preparar pedido</strong><small>{done?'Concluído':'Em andamento'}</small></div><span className="u-lab-status">{done?'FEITO':'PENDENTE'}</span></div>
                    <div className="u-lab-task secondary"><span className="u-lab-task-icon">→</span><div><strong>Organizar entregas</strong><small>Próxima etapa</small></div></div>
                    <p>Informação útil, sem telas desnecessárias.</p>
                  </div>}
                  {scenario==='contato' && <div className="u-lab-scene">
                    <span className="u-lab-scene-label">CAPTAÇÃO DE CLIENTES / 03</span>
                    <h3>Vamos tirar do papel?</h3>
                    <p>Uma mensagem clara faz a pessoa entender o valor antes de pedir orçamento.</p>
                    <div className="u-lab-contact-lines"><span>Sites profissionais</span><span>Lojas virtuais</span><span>Sistemas sob medida</span></div>
                  </div>}
                  <button className="u-lab-action" type="button" onClick={()=>setDone(v=>!v)} aria-pressed={done}>
                    <span>{done?selected.done:selected.action}</span><ArrowUpRight />
                  </button>
                  {done && <p className="u-lab-feedback" role="status">Interação concluída — apenas uma demonstração.</p>}
                </div>
              </div>
              <span className="u-lab-stage-note">SIMULAÇÃO ILUSTRATIVA · NENHUM PEDIDO REAL É FEITO</span>
            </div>
          </div>
        </div>
        <div className="u-lab-bottom u-reveal">
          <div><span>O QUE LEVAMOS EM CONTA</span><p>Beleza é só uma parte da experiência.</p></div>
          <div className="u-lab-keywords">
            {['Identidade visual', 'UX/UI', 'Responsividade', 'Desempenho', 'Acessibilidade', 'Conversão', 'Integrações', 'Manutenção'].map(t=><span key={t}>{t}</span>)}
          </div>
          <a className="u-lab-footer-link" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Quero uma solução assim <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  )
}
