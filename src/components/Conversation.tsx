import { useEffect, useRef, useState } from 'react'
import { QUOTE_LINK } from '../content'
import { ArrowUpRight, ReplayIcon } from './InterfaceIcons'
import { BrandSymbol } from './BrandSymbol'
import './conversation.css'

const SCRIPT = [
  { from: 'client', message: 'Oi! Quero fazer meu negócio crescer, mas não sei por onde começar.' },
  { from: 'studio', message: 'Me conta: o que você gostaria de melhorar hoje?' },
  { from: 'client', message: 'Quero atrair mais clientes e organizar algumas coisas. Dá pra fazer algo?' },
  { from: 'studio', message: 'Dá sim! Primeiro entendemos sua necessidade. Depois criamos uma solução só pra ela.' },
] as const

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext }
function playNotification(context: AudioContext) {
  if (context.state !== 'running') return
  const now = context.currentTime
  ;[740, 980].forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const volume = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.12)
    volume.gain.setValueAtTime(0.0001, now + index * 0.12)
    volume.gain.exponentialRampToValueAtTime(0.055, now + index * 0.12 + 0.018)
    volume.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.16)
    oscillator.connect(volume)
    volume.connect(context.destination)
    oscillator.start(now + index * 0.12)
    oscillator.stop(now + index * 0.12 + 0.17)
  })
}

export function Conversation() {
  const root = useRef<HTMLElement>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const timeouts = useRef<number[]>([])
  const audioContext = useRef<AudioContext | null>(null)
  const soundEnabled = useRef(false)
  const [sound, setSound] = useState(false)
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const [playKey, setPlayKey] = useState(0)
  const [motionAllowed, setMotionAllowed] = useState(true)

  useEffect(() => {
    soundEnabled.current = sound
  }, [sound])

  const clear = () => {
    timeouts.current.forEach(window.clearTimeout)
    timeouts.current = []
  }

  const cue = () => {
    if (!soundEnabled.current || !audioContext.current) return
    try { playNotification(audioContext.current) } catch { /* audio is decorative */ }
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMotionAllowed(!reduced)
    if (reduced) {
      setStarted(true)
      setStep(SCRIPT.length)
      return
    }
    const node = root.current
    if (!node) return
    let activated = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || activated) return
      activated = true
      setStarted(true)
    }, { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [playKey])

  useEffect(() => {
    if (!started || !motionAllowed) return
    clear()
    setStep(0)
    setTyping(false)
    let at = 400
    SCRIPT.forEach((message, index) => {
      const delay = message.from === 'studio' ? 1250 : 780
      if (message.from === 'studio') {
        timeouts.current.push(window.setTimeout(() => setTyping(true), at))
        at += delay
      } else {
        at += delay
      }
      timeouts.current.push(window.setTimeout(() => {
        setTyping(false)
        setStep(index + 1)
        cue()
      }, at))
      at += 400
    })
    return clear
  }, [started, playKey, motionAllowed])

  // Mostra sempre o último balão, inclusive o convite final.
  // A página não rola: somente o interior da simulação de conversa.
  useEffect(() => {
    const element = chatBodyRef.current
    if (!element) return
    const frame = window.requestAnimationFrame(() => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: motionAllowed ? 'smooth' : 'instant',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [step, typing, motionAllowed])

  useEffect(() => () => {
    clear()
    if (audioContext.current) void audioContext.current.close().catch(() => {})
  }, [])

  const toggleSound = async () => {
    if (sound) { setSound(false); return }
    try {
      const BrowserContext = window.AudioContext || (window as AudioWindow).webkitAudioContext
      if (!BrowserContext) return
      const ctx = audioContext.current ?? new BrowserContext()
      audioContext.current = ctx
      await ctx.resume()
      setSound(ctx.state === 'running')
      // iOS and other browsers require a direct interaction before allowing audio.
      if (ctx.state === 'running') playNotification(ctx)
      if ('vibrate' in navigator) navigator.vibrate(40)
    } catch { setSound(false) }
  }

  const replay = () => {
    clear()
    setStep(0)
    setTyping(false)
    setStarted(true)
    setPlayKey(value => value + 1)
    if ('vibrate' in navigator) navigator.vibrate(35)
  }

  return <section id="conversa" className="u-talk" ref={root} aria-label="Exemplo de conversa de atendimento da ÚNICA">
    <div className="u-wrap u-talk-layout">
      <div className="u-talk-copy">
        <span className="u-kicker">DA CONVERSA À SOLUÇÃO</span>
        <h2 className="u-h2">Você traz o desafio.<br />A gente pensa a <mark>solução.</mark></h2>
        <p>Não precisa chegar com tudo definido. A gente entende o que o seu negócio precisa e encontra o melhor caminho digital para ele.</p>
        <div className="u-talk-points" aria-label="Nosso jeito de trabalhar"><span>01 — Entender</span><span>02 — Planejar</span><span>03 — Criar</span></div>
        <a className="u-pill u-talk-desktop-cta" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Me conta sua ideia <ArrowUpRight /></a>
      </div>
      <div className="u-talk-stage">
        <div className="u-talk-halo" aria-hidden="true" />
        <div className="u-iphone" data-active={started ? 'true' : 'false'}>
          <div className="u-iphone-edge">
            <div className="u-iphone-screen">
              <div className="u-phone-status" aria-hidden="true"><span>9:41</span><span className="u-dynamic-island"/><span>●● ▰</span></div>
              <div className="u-chat-header">
                <span className="u-chat-back" aria-hidden="true">‹</span>
                <span className="u-chat-avatar"><BrandSymbol /></span>
                <span className="u-chat-identity"><strong>ÚNICA</strong><small>estúdio digital</small></span>
                <span className="u-chat-header-icon" aria-hidden="true">◦◦◦</span>
              </div>
              <div className="u-chat-body" ref={chatBodyRef} aria-live="off">
                <span className="u-chat-day">HOJE</span>
                {SCRIPT.slice(0,step).map((item,i)=><div key={i} className={`u-chat-message ${item.from === 'studio' ? 'studio' : 'client'}`}>
                  <span>{item.message}</span><small>9:{String(41+i).padStart(2,'0')}{item.from === 'studio' ? ' ✓✓' : ''}</small>
                </div>)}
                {typing && <div className="u-typing" aria-label="ÚNICA está digitando"><i/><i/><i/></div>}
                {step === SCRIPT.length && <a className="u-chat-result" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">
                  <span className="u-chat-link-icon"><ArrowUpRight /></span>
                  <span><strong>Vamos conversar?</strong><small>Me conta seu desafio e vamos encontrar uma solução.</small></span>
                </a>}
              </div>
              <div className="u-chat-composer" aria-hidden="true"><span><span className="u-plus-icon">+</span></span><div>Mensagem</div><span><span className="u-mic-icon" /></span></div>
              <div className="u-home-indicator" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="u-talk-controls">
          <button type="button" onClick={replay} aria-label="Reproduzir novamente as mensagens"><ReplayIcon /> <span>Rever conversa</span></button>
          <button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Desativar som da simulação' : 'Ativar som da simulação'}>{sound ? '♪' : '♩'} <span>{sound ? 'Som ligado' : 'Ativar som'}</span></button>
        </div>
        <p className="u-talk-note">Simulação ilustrativa · som opcional</p>
      </div>
      <a className="u-pill u-talk-mobile-cta" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Me conta sua ideia <ArrowUpRight /></a>
    </div>
  </section>
}
