import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react'
import { QUOTE_LINK, whatsappLink } from './content'
import { Conversation } from './components/Conversation'
import { SolutionsShowcase } from './components/SolutionsShowcase'
import { InvestmentSection, FAQSection, TestimonialsSection } from './components/CommercialSections'
import { ArrowUpRight } from './components/InterfaceIcons'
import { BrandSymbol } from './components/BrandSymbol'
import './studio.css'
import './components/commercial.css'

type IconName = 'laptop' | 'cart' | 'grid' | 'phone'
function Icon({ name }: { name: IconName }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...shared}>
      {name === 'laptop' && <><rect x="5" y="5" width="22" height="17" rx="2" /><path d="M2 26h28l-3-4H5z" /></>}
      {name === 'cart' && <><path d="M3 6h4l3 17h17l3-13H8" /><circle cx="12" cy="27" r="1.5" /><circle cx="25" cy="27" r="1.5" /></>}
      {name === 'grid' && <><rect x="4" y="4" width="10" height="10" rx="2" /><rect x="18" y="4" width="10" height="10" rx="2" /><rect x="4" y="18" width="10" height="10" rx="2" /><rect x="18" y="18" width="10" height="10" rx="2" /></>}
      {name === 'phone' && <><rect x="8" y="2" width="16" height="28" rx="3" /><path d="M14 26h4" /></>}
    </svg>
  )
}

const palettes = [
  { id: 'lima', name: 'Lima elétrico', accent: '#C8FA20' },
  { id: 'lilas', name: 'Lilás', accent: '#C6A3FF' },
  { id: 'coral', name: 'Coral', accent: '#FF826D' },
  { id: 'turquesa', name: 'Turquesa', accent: '#79E6D6' },
]

const projects = [
  {
    name: 'Papelaria', brand: 'Karoane', kind: 'Loja virtual',
    outcome: 'Uma loja virtual responsiva que organiza o catálogo da papelaria e facilita o caminho entre encontrar um produto e fazer um pedido.',
    visual: 'karoane', url: 'https://karoane.vercel.app/',
    cover: '/cover-karoane.svg',
    bg: 'linear-gradient(135deg,#eab3bc,#8a4b69)',
  },
  {
    name: 'Hamburgueria', brand: 'Bruto', kind: 'Site e pedidos online',
    outcome: 'Um site que apresenta o cardápio com personalidade e facilita o caminho entre escolher um produto e fazer um pedido.',
    visual: 'bruto', url: 'https://borapedir-delivery.vercel.app/bruto',
    cover: '/cover-bruto.svg',
    bg: 'linear-gradient(135deg,#8d492d,#3e261d)',
  },
  {
    name: 'Marmoraria', brand: 'Vértice Mármores', kind: 'Sistema e experiência digital',
    outcome: 'Uma experiência digital com visualização de peças em 3D, seleção de materiais e organização de orçamentos.',
    visual: 'vertice', url: 'https://vertice-marmores.vercel.app/',
    cover: '/cover-vertice.svg',
    bg: 'linear-gradient(135deg,#8c8579,#403b35)',
  },
  {
    name: 'Doação de sangue', brand: 'DOE+ RS', kind: 'Aplicação de impacto social',
    outcome: 'Uma aplicação que reúne informações para doadores e permite consultar hemocentros no Rio Grande do Sul.',
    visual: 'doe', url: 'https://doe-mais-rs.vercel.app/',
    bg: 'linear-gradient(135deg,#e65c5c,#71252d)',
  },
  {
    name: 'Rotina', brand: 'Minha Rotina', kind: 'Plataforma de organização pessoal',
    outcome: 'Uma plataforma para reunir tarefas, finanças e hábitos e deixar a organização do dia a dia mais simples.',
    visual: 'rotina', url: 'https://dashboard-three-khaki-68.vercel.app/',
    cover: '/screens/rotina-desktop-alpha.svg',
    bg: 'linear-gradient(135deg,#dff4ee,#accdc5)',
  },
]
// Sexto projeto: ROXO — loja demonstrativa, com catálogo e personalização de pedidos.
// Molduras reutilizadas com capturas reais do site público em desktop e celular.
const sixthProject: (typeof projects)[number] = {
  name: 'Açaiteria',
  brand: 'ROXO',
  kind: 'Loja virtual e pedidos personalizados',
  outcome: 'Uma loja demonstrativa para escolher açaís, montar combinações, acompanhar a sacola e fazer pedidos de forma mais simples.',
  visual: 'roxo',
  url: 'https://roxo-acaiteria.vercel.app/roxo',
  cover: '/screens/roxo-desktop-alpha.svg',
  bg: 'linear-gradient(135deg,#f3e4f3,#9161a7)',
}
const visibleProjects = sixthProject ? [...projects, sixthProject] : projects

function NewLogo() {
  return <span className="u-new-logo"><BrandSymbol /><span className="u-wordmark">ÚNICA</span></span>
}

/** Conceitos gráficos autorais: nenhuma foto, screenshot ou mockup do site antigo. */
function ProjectArtwork({ visual, phone = false }: { visual: string; phone?: boolean }) {
  if (visual === 'bruto') return <div className={`u-art u-art-bruto ${phone ? 'u-art-phone' : ''}`}>
    <div className="u-art-nav"><b>BRUTO<span>.</span></b><span>MENU&nbsp;&nbsp; PEDIDOS</span></div>
    <div className="u-bruto-circle" />
    <div className="u-art-title">FOME DE<br /><em>BRUTO.</em></div>
    <div className="u-art-chip">PEÇA O SEU <ArrowUpRight /></div>
    <div className="u-art-caption">PROPOSTA VISUAL · HAMBURGUERIA</div>
  </div>
  if (visual === 'karoane') return <div className={`u-art u-art-karoane ${phone ? 'u-art-phone' : ''}`}>
    <div className="u-art-nav"><b>karoane.</b><span>COLEÇÃO&nbsp; <ArrowUpRight /></span></div>
    <div className="u-karoane-shape"><i/><i/><i/></div>
    <div className="u-art-title">CORES PARA<br /><em>CRIAR.</em></div>
    <div className="u-art-chip">EXPLORAR <ArrowUpRight /></div>
    <div className="u-art-caption">PROPOSTA VISUAL · LOJA ONLINE</div>
  </div>
  if (visual === 'doe') return <div className={`u-art u-art-doe ${phone ? 'u-art-phone' : ''}`}>
    <div className="u-art-nav"><b>DOE<span>+</span> RS</b><span>DOAÇÃO DE SANGUE</span></div>
    <div className="u-doe-symbol" aria-hidden="true">+</div>
    <div className="u-art-title">UM GESTO.<br /><em>MUITAS VIDAS.</em></div>
    <div className="u-art-chip">SAIBA MAIS <ArrowUpRight /></div>
    <div className="u-art-caption">CONCEITO VISUAL · IMPACTO SOCIAL</div>
  </div>
  if (visual === 'rotina') return <div className={`u-art u-art-rotina ${phone ? 'u-art-phone' : ''}`}>
    <div className="u-art-nav"><b>minha rotina<span>.</span></b><span>MEU DIA</span></div>
    <div className="u-rotina-lines" aria-hidden="true"><i/><i/><i/></div>
    <div className="u-art-title">SEU DIA.<br /><em>SEU RITMO.</em></div>
    <div className="u-art-chip">ORGANIZE-SE <ArrowUpRight /></div>
    <div className="u-art-caption">CONCEITO VISUAL · ORGANIZAÇÃO PESSOAL</div>
  </div>
  return <div className={`u-art u-art-vertice ${phone ? 'u-art-phone' : ''}`}>
    <div className="u-art-nav"><b>VÉRTICE<span> / </span></b><span>MÁRMORES</span></div>
    <div className="u-vertice-shape"><span/><span/><span/></div>
    <div className="u-art-title">MATÉRIA.<br /><em>FORMA.</em></div>
    <div className="u-art-chip">CONHEÇA <ArrowUpRight /></div>
    <div className="u-art-caption">CONCEITO VISUAL · MARMORARIA</div>
  </div>
}

export default function App() {
  const [palette, setPalette] = useState(0)
  const [project, setProject] = useState(0)
  const [liteImages, setLiteImages] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)
  const touchStart = useRef<number | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const projectTabsRef = useRef<HTMLDivElement>(null)
  const selected = palettes[palette]
  const p = visibleProjects[project]
  useEffect(() => {
    // Respeita o modo economia de dados e conexões 2G detectadas pelo navegador.
    // Onde Network Information API não existe, mantemos a apresentação completa.
    const network = (navigator as Navigator & { connection?: {
      saveData?: boolean
      effectiveType?: string
      addEventListener?: (event: string, handler: () => void) => void
      removeEventListener?: (event: string, handler: () => void) => void
    } }).connection
    if (!network) return
    const update = () => setLiteImages(Boolean(network.saveData || network.effectiveType === 'slow-2g' || network.effectiveType === '2g'))
    update()
    network.addEventListener?.('change', update)
    return () => network.removeEventListener?.('change', update)
  }, [])

  const variables = {
    '--u-accent': selected.accent,
  } as CSSProperties
  useEffect(() => {
    const rail = projectTabsRef.current
    const button = rail?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')
    if (!rail || !button) return
    const railBox = rail.getBoundingClientRect()
    const buttonBox = button.getBoundingClientRect()
    const target = rail.scrollLeft + buttonBox.left - railBox.left + (buttonBox.width - railBox.width) / 2
    rail.scrollTo({
      left: Math.max(0, target),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }, [project])


  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / total))
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      setShowBackTop(window.scrollY > 560)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll('.u-reveal').forEach((el) => {
      const target = el as HTMLElement
      if (!('IntersectionObserver' in window)) { target.classList.add('is-visible'); return }
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { target.classList.add('is-visible'); obs.disconnect() }
      }, { threshold: 0.1 })
      obs.observe(target)
    })
  }, [])

  const changeProject = (step: number) => setProject((v) => (v + step + visibleProjects.length) % visibleProjects.length)
  const swipeStart = (event: TouchEvent<HTMLElement>) => { touchStart.current = event.touches[0]?.clientX ?? null }
  const swipeEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return
    const diff = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current
    touchStart.current = null
    if (Math.abs(diff) >= 55) changeProject(diff < 0 ? 1 : -1)
  }

  useEffect(() => {
    if (!openMenu) return
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenMenu(false) }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [openMenu])

  return (
    <div className="u-site" style={variables}>
      <a className="u-skip-link" href="#servicos">Pular para as soluções</a>
      <div className="u-scroll-progress" ref={progressRef} aria-hidden="true" />
      <section className="u-top" id="inicio">
        <header className="u-nav u-wrap">
          <a className="u-brand" href="#inicio" aria-label="ÚNICA — voltar ao início">
            <NewLogo />
            <span>ESTÚDIO<br />DIGITAL</span>
          </a>
          <nav className="u-menu" aria-label="Navegação principal">
            <a href="#projetos">Projetos</a><a href="#servicos">Soluções</a>
             <a href="#investimento">Investimento</a><a href="#contato">Contato</a>
          </nav>
          <a className="u-pill" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Começar um projeto <ArrowUpRight /></a>
          <button className="u-hamburger" type="button" aria-label={openMenu ? 'Fechar menu' : 'Abrir menu'} aria-controls="u-mobile-menu" aria-expanded={openMenu} onClick={() => setOpenMenu(v => !v)}>
            <span className={`u-ham-lines ${openMenu ? 'open' : ''}`}><i/><i/><i/></span>
          </button>
          {openMenu && <nav id="u-mobile-menu" className="u-mobile-nav" aria-label="Menu mobile">
            {[['Projetos','#projetos'],['Soluções','#servicos'],['Investimento','#investimento'],['Contato','#contato']].map(([name,href]) => <a onClick={() => setOpenMenu(false)} href={href} key={href}>{name}<span aria-hidden="true"><ArrowUpRight /></span></a>)}
            <a className="u-mobile-quote" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setOpenMenu(false)}>Começar um projeto <span aria-hidden="true"><ArrowUpRight /></span></a>
          </nav>}
        </header>
        <div className="u-hero u-wrap">
          <div>
            <h1 className="u-heading">
              <span className="u-heading-desktop">
                <span>Soluções</span><span>digitais que</span>
                <span className="u-movem"><em>movem</em></span><span>negócios</span>
              </span>
              <span className="u-heading-mobile">
                <span>Soluções digitais</span>
                <span>que <span className="u-movem"><em>movem</em></span></span>
                <span>negócios</span>
              </span>
            </h1>
            <div className="u-swoosh" aria-hidden="true" />
          </div>
          <div className="u-hero-side">
            <span className="u-arrow" aria-hidden="true"><ArrowUpRight /></span>
            <p>Do que o cliente vê ao que faz tudo funcionar. Criamos soluções digitais com personalidade, pensadas para a realidade de cada negócio.</p>
            <a className="u-pill u-pill-light" href="#servicos">Conheça nossos serviços <ArrowUpRight /></a>
            <span className="u-coverage"><span aria-hidden="true" />Atendimento online para todo o Brasil</span>
          </div>
        </div>
        <div className="u-wave" aria-hidden="true"><svg viewBox="0 0 1440 160" preserveAspectRatio="none"><path d="M0 115 C220 0 400 135 660 108 S1010 -5 1145 58 S1290 145 1440 0 L1440 160 L0 160 Z"/></svg></div>
      </section>

      <div className="u-service-rail">
        <div className="u-wrap">
          <div className="u-rail-grid">
            {[
              {title: 'Sites', subtitle: 'Institucionais', icon: 'laptop' as IconName},
              {title: 'Lojas', subtitle: 'Virtuais', icon: 'cart' as IconName},
              {title: 'Sistemas', subtitle: 'Personalizados', icon: 'grid' as IconName},
              {title: 'Apps', subtitle: 'Sob medida', icon: 'phone' as IconName},
            ].map(item => <a href="#servicos" key={item.title}><Icon name={item.icon} /><span><strong>{item.title}</strong><small>{item.subtitle}</small></span></a>)}
          </div>
          <a className="u-scroll" href="#servicos"><span>↓</span> ROLE PARA EXPLORAR</a>
        </div>
      </div>

      <section id="servicos" className="u-section">
        <div className="u-wrap">
          <div className="u-intro u-reveal">
            <div><span className="u-kicker">SOLUÇÕES SOB MEDIDA</span><h2 className="u-h2">O digital que <mark>resolve,</mark><br />vende e conecta.</h2></div>
            <div><p className="u-lead">Cada negócio tem um desafio diferente. A solução certa precisa ser bonita, fácil de usar e fazer sentido na rotina de quem depende dela.</p><a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="u-pill">Conversar sobre meu projeto <ArrowUpRight /></a></div>
          </div>
          <SolutionsShowcase />
        </div>
      </section>

      <Conversation />
      <div className="u-kinetic-strip" aria-hidden="true"><div className="u-kinetic-track">{Array.from({length: 4}, (_, i) => <span key={i}>IDEIAS EM MOVIMENTO <BrandSymbol className="u-kinetic-icon" /> SISTEMAS QUE FUNCIONAM <BrandSymbol className="u-kinetic-icon" /></span>)}</div></div>

      <section id="cores" className="u-color-section">
        <div className="u-wrap u-colors-layout">
          <div className="u-reveal">
            <span className="u-kicker">IDENTIDADE & DIFERENCIAÇÃO</span>
            <h2 className="u-h2">A cor certa faz sua marca <mark>ser lembrada.</mark></h2>
            <p className="u-lead">Cada detalhe transmite uma sensação. Experimente as cores e veja os destaques ganharem outra personalidade.</p>
            <div className="u-swatch-list" role="group" aria-label="Escolher cor dos detalhes">
              {palettes.map((c,i) => <button key={c.id} className="u-swatch" type="button" aria-label={`Usar detalhes em ${c.name.toLowerCase()}`} aria-pressed={palette === i} style={{ background: c.accent }} onClick={() => setPalette(i)} title={c.name}/>)}
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, marginTop: 20 }}>{selected.name} — cor de destaque ativa</p>
          </div>
          <div className="u-demo u-reveal" aria-label="Demonstração visual da paleta selecionada">
            <div className="u-demo-head"><span>UMA MARCA, MUITAS POSSIBILIDADES</span><i /></div>
            <h3>Sua ideia merece <mark>se destacar.</mark></h3>
            <div className="u-demo-foot">Cores diferentes. Mesma identidade.</div>
          </div>
        </div>
      </section>

      <section id="projetos" className="u-section">
        <div className="u-wrap">
          <div className="u-portfolio-top u-reveal">
            <div><span className="u-kicker">PROJETOS EM DESTAQUE</span><h2 className="u-h2">Soluções reais<br />para negócios <mark>reais.</mark></h2></div>
            <p className="u-lead">Conheça alguns trabalhos e veja como cada projeto foi pensado para um objetivo diferente.</p>
          </div>
          <div className="u-project-feature u-reveal" onTouchStart={swipeStart} onTouchEnd={swipeEnd} aria-label="Projetos em destaque, deslize para alternar no celular">
            <div className={`u-project-visual ${p.cover ? `u-project-visual--devices u-devices-${p.visual}` : p.visual === 'doe' ? 'u-project-visual--doe' : ''}`} style={{background:p.bg}} key={p.visual}>
              {p.cover ? (
                <div className={`u-device-stage ${liteImages ? 'u-device-stage--lite' : ''}`} aria-label={`Prévia do projeto ${p.brand} em computador${liteImages ? '' : ' e celular'}`}>
                  <img
                    className="u-device-laptop"
                    src={`/screens/${p.visual}-desktop-alpha.svg`}
                    alt={`Interface do ${p.brand} no computador`}
                    width={p.visual === 'vertice' ? 1261 : 1237}
                    height={774}
                    decoding="async"
                    loading="lazy"
                  />
                  {!liteImages && (
                  <img
                    className="u-device-phone"
                    src={`/screens/${p.visual}-mobile-alpha.svg`}
                    alt={`Interface do ${p.brand} no celular`}
                    width={p.visual === 'vertice' ? 419 : 393}
                    height={p.visual === 'vertice' ? 854 : 790}
                    decoding="async"
                    loading="lazy"
                  />
                  )}
                </div>
              ) : p.visual === 'doe' ? (
                <div className={`u-doe-stage ${liteImages ? 'u-doe-stage--lite' : ''}`} aria-label="Telas do aplicativo DOE+ RS">
                  <div className="u-doe-device u-doe-device--primary">
                    <div className="u-doe-screen">
                      <img
                        src="/projects/doe/home.webp"
                        alt="Tela de painel do aplicativo DOE+ RS"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="u-doe-device-notch" aria-hidden="true" />
                  </div>
                  {!liteImages && <div className="u-doe-device u-doe-device--secondary">
                    <div className="u-doe-screen">
                      <img
                        src="/projects/doe/hemocentros.webp"
                        alt="Tela de hemocentros do DOE+ RS"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="u-doe-device-notch" aria-hidden="true" />
                  </div>}
                </div>
              ) : (
                <>
                  <div style={{width:'100%'}}>
                    <div className="u-desktop-frame"><ProjectArtwork visual={p.visual}/></div>
                    <div className="u-stand"/>
                  </div>
                  <div className="u-phone-frame"><ProjectArtwork visual={p.visual} phone/></div>
                </>
              )}
            </div>
            <div className="u-project-copy" key={p.name}>
              <span className="u-kicker">{p.kind}</span>
              <h3>{p.brand}</h3><p className="u-project-brand">{p.name}</p>
              <p className="u-project-description">{p.outcome}</p>
              {p.visual === 'roxo' && <small className="u-project-disclaimer">Demonstração de loja online.</small>}
              <div className="u-project-action-row">
                {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="u-pill">Conhecer projeto <ArrowUpRight /></a> : null}
                <a className="u-project-ask-link" href={whatsappLink(`Olá! Vi o projeto ${p.brand} no site da ÚNICA e gostaria de conversar sobre uma solução parecida para meu negócio.`)} target="_blank" rel="noopener noreferrer">
                  Quero algo assim <ArrowUpRight />
                </a>
              </div>
              <div className="u-project-controls">
                <button className="u-control" type="button" aria-label="Projeto anterior" onClick={()=>changeProject(-1)}>←</button>
                <button className="u-control" type="button" aria-label="Próximo projeto" onClick={()=>changeProject(1)}>→</button>
                <span style={{alignSelf:'center',marginLeft:10,fontSize:13}}>{String(project+1).padStart(2,'0')} / {String(visibleProjects.length).padStart(2,'0')}</span>
              </div>
            </div>
          </div>
          <div className="u-small-projects u-reveal" ref={projectTabsRef} role="group" aria-label="Selecionar projeto">
            {visibleProjects.map((q,i) => <button className="u-project-preview" key={q.name} type="button" aria-pressed={project===i} aria-label={`Ver projeto ${q.brand}`} onClick={()=>setProject(i)}>
              <span className="u-project-preview-img"><img src={q.visual === 'doe' ? '/projects/doe/home.webp' : `/screens/${q.visual}-desktop-alpha.svg`} alt="" loading="lazy" decoding="async" /></span>
              <span className="u-project-preview-label"><strong>{q.brand}</strong><small>{String(i+1).padStart(2,'0')} / {String(visibleProjects.length).padStart(2,'0')}</small></span>
            </button>)}
          </div>
        </div>
      </section>

      <InvestmentSection />
      <FAQSection />
      <TestimonialsSection />

      <section id="contato" className="u-final u-final-remake">
        <div className="u-wrap">
          <div className="u-final-head u-reveal"><span>ÚNICA / PRÓXIMO PROJETO</span><span>IDEIAS BOAS MERECEM SAIR DO PAPEL</span></div>
          <div className="u-final-main">
            <div className="u-reveal">
              <h2>Você imagina.<br/><em>A gente constrói.</em></h2>
              <p>Um problema pra resolver, uma ideia diferente ou um negócio pronto pra evoluir? A conversa começa aqui.</p>
            </div>
            <a className="u-final-orb" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" aria-label="Conversar sobre meu projeto pelo WhatsApp">
              <span>VAMOS CONVERSAR</span>
              <ArrowUpRight />
              <small>COMECE AQUI ↗</small>
            </a>
          </div>
          <div className="u-final-tail"><span>SEU DESAFIO É O PONTO DE PARTIDA.</span><span>O RESTO, A GENTE DESENVOLVE.</span></div>
        </div>
      </section>
      <nav className="u-floating-actions" aria-label="Acessos rápidos">
        {showBackTop && <button className="u-floating-top" type="button"
          aria-label="Voltar ao topo da página" title="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4.5h14M12 19V8m-5 5 5-5 5 5" />
          </svg>
        </button>}
        <a className="u-floating-whatsapp" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer"
          aria-label="Conversar com a ÚNICA pelo WhatsApp profissional">
          <svg className="u-floating-wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.8A8.5 8.5 0 1 1 20.5 11.5Z"/>
            <path d="M8.3 8.1c.1-.3.3-.5.6-.5h.7l1.1 2.4-.8 1c.7 1.3 1.7 2.3 3.1 2.9l1-.8 2.4 1.1v.7c0 .3-.2.6-.5.7-3.8 1.4-9-3.8-7.6-7.5Z"/>
          </svg>
          <span className="u-floating-wa-text">WhatsApp</span>
          <ArrowUpRight />
        </a>
      </nav>
      <footer className="u-footer">
        <div className="u-wrap">
          <a href="#inicio" className="u-footer-brand" aria-label="ÚNICA, voltar ao começo"><NewLogo /></a>
          <span>Sites, catálogos, lojas, sistemas e apps. Atendimento online para todo o Brasil.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
    </div>
  )
}
