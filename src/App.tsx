import { useEffect, useState, type CSSProperties } from 'react'
import { QUOTE_LINK } from './content'
import './studio.css'

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

const services = [
  { name: 'Sites institucionais', line: 'Uma presença digital que transmite confiança e abre novas oportunidades.', icon: 'laptop' as IconName },
  { name: 'Lojas virtuais', line: 'Seus produtos apresentados de forma profissional, com uma jornada de compra simples.', icon: 'cart' as IconName },
  { name: 'Sistemas personalizados', line: 'Mais organização para os processos do seu negócio.', icon: 'grid' as IconName },
  { name: 'Aplicativos', line: 'Experiências digitais pensadas para acompanhar seus clientes.', icon: 'phone' as IconName },
]

const palettes = [
  { id: 'original', name: 'Marrom + lima', accent: '#d2ff22', bg: '#916047', deep: '#673a27', paper: '#f8f0e5', ink: '#28160f' },
  { id: 'lilas', name: 'Roxo + lima', accent: '#d2ff22', bg: '#310b38', deep: '#240528', paper: '#f9f2ee', ink: '#281327' },
  { id: 'coral', name: 'Grafite + coral', accent: '#ff8267', bg: '#343333', deep: '#242323', paper: '#f5f0e7', ink: '#252221' },
  { id: 'turquesa', name: 'Oliva + turquesa', accent: '#82ead8', bg: '#3f5846', deep: '#273b30', paper: '#f3f1e8', ink: '#1b2921' },
]

const projects = [
  {
    name: 'Bruto',
    kind: 'Site e experiência de pedidos',
    outcome: 'Uma apresentação marcante para a hamburgueria, com foco em facilitar o caminho do cliente até o pedido.',
    image: '/projects/bruto.webp',
    url: 'https://borapedir-delivery.vercel.app/bruto',
    bg: 'linear-gradient(135deg,#8d492d,#3e261d)',
  },
  {
    name: 'Karoane',
    kind: 'Loja virtual',
    outcome: 'Um espaço para apresentar produtos e criar uma experiência de compra mais prática e organizada.',
    image: '',
    url: 'https://karoane.vercel.app/',
    bg: 'linear-gradient(135deg,#eab3bc,#8a4b69)',
  },
  {
    name: 'Vértice Mármores',
    kind: 'Sistema e experiência digital',
    outcome: 'Uma solução pensada para valorizar o trabalho da marmoraria e organizar etapas do atendimento.',
    image: '/projects/vertice.webp',
    url: 'https://vertice-marmores.vercel.app/',
    bg: 'linear-gradient(135deg,#8c8579,#403b35)',
  },
]

function ProjectScreen({ image, name }: { image: string; name: string }) {
  if (image) return <img src={image} alt={'Prévia do projeto ' + name} loading="lazy" />
  return <div className="u-preview-fallback"><strong>Karoane</strong><small>Loja virtual • prévia real a inserir</small></div>
}

export default function App() {
  const [palette, setPalette] = useState(0)
  const [project, setProject] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)
  const selected = palettes[palette]
  const p = projects[project]
  const variables = {
    '--u-bg': selected.bg,
    '--u-bg-deep': selected.deep,
    '--u-accent': selected.accent,
    '--u-paper': selected.paper,
    '--u-ink': selected.ink,
  } as CSSProperties

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

  const changeProject = (step: number) => setProject((v) => (v + step + projects.length) % projects.length)

  return (
    <div className="u-site" style={variables}>
      <section className="u-top" id="inicio">
        <header className="u-nav u-wrap">
          <a className="u-brand" href="#inicio" aria-label="ÚNICA — voltar ao início">
            <strong>ÚNICA<sup style={{ fontSize: 11, verticalAlign: 'top' }}>®</sup></strong>
            <span>ESTÚDIO<br />DIGITAL</span>
          </a>
          <nav className="u-menu" aria-label="Navegação principal">
            <a href="#projetos">Projetos</a><a href="#servicos">Serviços</a>
            <a href="#cores">Diferenciais</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a>
          </nav>
          <a className="u-pill" href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Pedir orçamento ↗</a>
          <button className="u-hamburger" type="button" aria-label="Abrir menu" aria-expanded={openMenu} onClick={() => setOpenMenu(v => !v)}>☰</button>
          {openMenu && <nav className="u-mobile-nav" aria-label="Menu mobile">
            {[['Projetos','#projetos'],['Serviços','#servicos'],['Diferenciais','#cores'],['Sobre','#sobre'],['Contato','#contato']].map(([name,href]) => <a onClick={() => setOpenMenu(false)} href={href} key={href}>{name}</a>)}
            <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Pedir orçamento ↗</a>
          </nav>}
        </header>
        <div className="u-hero u-wrap">
          <div>
            <h1 className="u-heading">
              <span>Soluções</span><span>digitais que</span>
              <span className="u-movem"><em>movem</em></span><span>negócios</span>
            </h1>
            <div className="u-swoosh" aria-hidden="true" />
          </div>
          <div className="u-hero-side">
            <span className="u-arrow" aria-hidden="true">↗</span>
            <p>Planejamento, design e desenvolvimento de soluções digitais para marcas que querem crescer.</p>
            <a className="u-pill u-pill-light" href="#servicos">Conheça nossos serviços ↗</a>
          </div>
        </div>
        <div className="u-wave" aria-hidden="true"><svg viewBox="0 0 1440 160" preserveAspectRatio="none"><path d="M0 115 C220 0 400 135 660 108 S1010 -5 1145 58 S1290 145 1440 0 L1440 160 L0 160 Z"/></svg></div>
      </section>

      <div className="u-service-rail">
        <div className="u-wrap">
          <div className="u-rail-grid">
            {services.map(s => <a href="#servicos" key={s.name}><Icon name={s.icon} /><span><strong>{s.name.split(' ')[0]}</strong><small>{s.name.substring(s.name.indexOf(' ') + 1)}</small></span></a>)}
          </div>
          <a className="u-scroll" href="#servicos"><span>↓</span> ROLE PARA EXPLORAR</a>
        </div>
      </div>

      <section id="servicos" className="u-section">
        <div className="u-wrap">
          <div className="u-intro u-reveal">
            <div><span className="u-kicker">SOLUÇÕES SOB MEDIDA</span><h2 className="u-h2">O digital que <mark>resolve,</mark><br />vende e conecta.</h2></div>
            <div><p className="u-lead">Cada negócio tem um desafio diferente. A solução certa precisa ser bonita, fácil de usar e fazer sentido na rotina de quem depende dela.</p><a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="u-pill">Conversar sobre meu projeto ↗</a></div>
          </div>
          <div className="u-list-solutions u-reveal">
            {services.map(s => <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="u-sol" key={s.name}>
              <Icon name={s.icon} /><div><h3>{s.name}</h3><p>{s.line}</p></div>
            </a>)}
          </div>
        </div>
      </section>

      <section id="cores" className="u-color-section">
        <div className="u-wrap u-colors-layout">
          <div className="u-reveal">
            <span className="u-kicker">IDENTIDADE & DIFERENCIAÇÃO</span>
            <h2 className="u-h2">A cor certa faz sua marca <mark>ser lembrada.</mark></h2>
            <p className="u-lead">A gente pensa em cores, contraste e personalidade para destacar seu negócio. Experimente: escolha uma paleta e veja o site inteiro mudar.</p>
            <div className="u-swatch-list" role="group" aria-label="Escolher paleta do site">
              {palettes.map((c,i) => <button key={c.id} className="u-swatch" type="button" aria-label={c.name} aria-pressed={palette === i} style={{ background: c.accent }} onClick={() => setPalette(i)} title={c.name}/>)}
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, marginTop: 20 }}>{selected.name} — identidade ativa</p>
          </div>
          <div className="u-demo u-reveal" aria-label="Demonstração visual da paleta selecionada">
            <div className="u-demo-head"><span>UMA MARCA, MUITAS POSSIBILIDADES</span><i /></div>
            <h3>Sua ideia merece <mark>se destacar.</mark></h3>
            <div className="u-demo-foot">Uma escolha visual muda a percepção.</div>
          </div>
        </div>
      </section>

      <section id="projetos" className="u-section">
        <div className="u-wrap">
          <div className="u-portfolio-top u-reveal">
            <div><span className="u-kicker">PROJETOS EM DESTAQUE</span><h2 className="u-h2">Soluções reais<br />para negócios <mark>reais.</mark></h2></div>
            <p className="u-lead">Conheça alguns trabalhos e veja como cada projeto foi pensado para um objetivo diferente.</p>
          </div>
          <div className="u-project-feature u-reveal">
            <div className="u-project-visual" style={{background:p.bg}}>
              <div style={{width:'100%'}}>
                <div className="u-desktop-frame"><ProjectScreen image={p.image} name={p.name}/></div>
                <div className="u-stand"/>
              </div>
              <div className="u-phone-frame"><ProjectScreen image={p.image} name={p.name}/></div>
            </div>
            <div className="u-project-copy">
              <span className="u-kicker">{p.kind}</span>
              <h3>{p.name}</h3>
              <p>{p.outcome}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="u-pill">Conhecer projeto ↗</a>
              <div className="u-project-controls">
                <button className="u-control" type="button" aria-label="Projeto anterior" onClick={()=>changeProject(-1)}>←</button>
                <button className="u-control" type="button" aria-label="Próximo projeto" onClick={()=>changeProject(1)}>→</button>
                <span style={{alignSelf:'center',marginLeft:10,fontSize:13}}>{String(project+1).padStart(2,'0')} / 03</span>
              </div>
            </div>
          </div>
          <div className="u-small-projects" role="group" aria-label="Selecionar projeto">
            {projects.map((q,i) => <button key={q.name} type="button" aria-pressed={project===i} onClick={()=>setProject(i)}>{q.name}</button>)}
          </div>
        </div>
      </section>

      <section id="sobre" className="u-section u-impact">
        <div className="u-wrap">
          <div className="u-reveal"><span className="u-kicker">MAIS QUE UMA PÁGINA BONITA</span><h2 className="u-h2">Uma ferramenta para o seu negócio <mark>evoluir.</mark></h2></div>
          <div className="u-reveal"><p>Nosso foco é transformar necessidades reais em experiências digitais que valorizam sua marca e facilitam sua operação.</p>
            <ul className="u-checks"><li>Presença digital profissional</li><li>Experiência simples para seus clientes</li><li>Mais praticidade na operação</li><li>Soluções pensadas para seu contexto</li></ul>
          </div>
        </div>
      </section>

      <section id="contato" className="u-final">
        <div className="u-wrap u-reveal"><h2>Vamos transformar sua ideia em resultado?</h2><a className="u-pill" style={{background:'#24170f',color:'#fff'}} href={QUOTE_LINK} target="_blank" rel="noopener noreferrer">Pedir orçamento ↗</a></div>
      </section>
      <footer className="u-footer"><div className="u-wrap"><strong>ÚNICA® — ESTÚDIO DIGITAL</strong><span>Design com personalidade. Soluções com propósito.</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
    </div>
  )
}
