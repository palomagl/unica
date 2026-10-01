import { useEffect, useRef, useState } from 'react'
import { HERO_MEDIA, type VideoSources } from '../content'
import { prefersReducedMotion } from '../fx'

const MOBILE_QUERY = '(max-width: 767px)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = matchMedia(MOBILE_QUERY)
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

/** Economia de dados ativada no aparelho: não baixa nem toca o vídeo. */
const saveData = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true

/** Animação de abertura em SVG: linha → formas se organizam → interface → aproxima → corte para preto. */
function Placeholder() {
  return (
    <svg viewBox="0 -150 800 750" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Uma linha se organiza até formar uma interface">
      <g className="hv-scene" fill="none" stroke="#f1eee7" strokeWidth="1.25">
        <path className="hv-line" d="M 40 225 H 760" pathLength={1} vectorEffect="non-scaling-stroke" />
        <g className="hv-s1">
          <rect x="120" y="60" width="560" height="330" pathLength={1} vectorEffect="non-scaling-stroke" />
          <path d="M 120 100 H 680" pathLength={1} vectorEffect="non-scaling-stroke" />
        </g>
        <g className="hv-s2">
          <rect x="140" y="120" width="110" height="250" pathLength={1} vectorEffect="non-scaling-stroke" />
          <path d="M 156 146 H 220 M 156 166 H 200 M 156 186 H 232" pathLength={1} vectorEffect="non-scaling-stroke" />
        </g>
        <g className="hv-s3">
          <rect x="270" y="120" width="190" height="110" pathLength={1} vectorEffect="non-scaling-stroke" />
          <rect x="480" y="120" width="180" height="110" pathLength={1} vectorEffect="non-scaling-stroke" />
          <path d="M 290 150 H 400 M 290 170 H 360" pathLength={1} vectorEffect="non-scaling-stroke" />
        </g>
        <g className="hv-s4">
          <rect x="270" y="250" width="390" height="120" pathLength={1} vectorEffect="non-scaling-stroke" />
          <path d="M 300 350 V 310 M 340 350 V 290 M 380 350 V 322 M 420 350 V 276 M 460 350 V 300" pathLength={1} vectorEffect="non-scaling-stroke" />
        </g>
        <rect className="hv-accent" x="504" y="144" width="36" height="36" fill="#ff4b1f" stroke="none" />
      </g>
    </svg>
  )
}

function Poster({ src }: { src?: string }) {
  return src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <Placeholder />
}

/**
 * Vídeo do hero: toca mudo, em loop, inline (sem tela cheia no iPhone) e só enquanto está visível.
 * Cai para o poster se: o usuário pediu menos movimento, a economia de dados está ligada,
 * ou todos os formatos falharem.
 */
function HeroVideo({ sources, poster }: { sources: VideoSources; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(0)
  const list = [sources.webm && { src: sources.webm, type: 'video/webm' }, sources.mp4 && { src: sources.mp4, type: 'video/mp4' }].filter(
    Boolean,
  ) as { src: string; type: string }[]
  const still = prefersReducedMotion() || saveData()

  useEffect(() => {
    const v = ref.current
    if (!v || still) return
    v.muted = true // garante o autoplay (iOS/Safari exigem o atributo/propriedade muted)
    v.defaultMuted = true
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [still, sources])

  if (!list.length || failed >= list.length) return <Poster src={poster} />
  if (still && poster) return <Poster src={poster} />

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!still}
      preload={still ? 'metadata' : 'auto'}
      disablePictureInPicture
      controls={false}
      aria-hidden
    >
      {list.map((s) => (
        <source key={s.src} src={still ? `${s.src}#t=0.1` : s.src} type={s.type} onError={() => setFailed((n) => n + 1)} />
      ))}
    </video>
  )
}

/**
 * Peça visual do hero. No celular ocupa a largura toda (sangra até as bordas) e é mais alta;
 * no desktop fica contida ao lado do texto. Texto e vídeo nunca se sobrepõem.
 */
export function HeroVisual() {
  const mobile = useIsMobile()
  const media = HERO_MEDIA
  const sources = media ? (mobile ? (media.mobile ?? media.desktop) : media.desktop) : undefined

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] md:aspect-[5/4] md:ring-1 md:ring-paper/10">
      {sources ? <HeroVideo key={mobile ? 'm' : 'd'} sources={sources} poster={media?.poster} /> : <Placeholder />}
      <span className="label absolute left-4 top-4 text-[0.6rem] text-paper/40 md:left-3 md:top-3">Fig. 01</span>
      <span className="label absolute bottom-4 right-4 text-[0.6rem] text-paper/40 md:bottom-3 md:right-3">Da ideia à interface</span>
    </div>
  )
}
