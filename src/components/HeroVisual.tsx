import { HERO_POSTER, HERO_VIDEO } from '../content'

/**
 * Peça de abertura (8–10 s, loop, sem áudio).
 * Com HERO_VIDEO definido, toca o vídeo. Senão, mostra a animação em SVG:
 * linha → formas se organizam → interface → aproxima → corte para preto.
 */
export function HeroVisual() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[5/4] bg-[#050505] ring-1 ring-paper/10">
      {HERO_VIDEO ? (
        <video src={HERO_VIDEO} poster={HERO_POSTER} autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 -95 800 640" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Uma linha se organiza até formar uma interface">
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
      )}
      <span className="label absolute left-3 top-3 text-[0.6rem] text-paper/40">Fig. 01</span>
      <span className="label absolute bottom-3 right-3 text-[0.6rem] text-paper/40">Da ideia à interface</span>
    </div>
  )
}
