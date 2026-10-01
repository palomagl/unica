import { ClipBox } from './ClipBox'

/** Espaço para imagem. Sem `src`, mostra reserva claramente marcada para substituir. */
export function ImageSlot({
  src,
  alt,
  label,
  ratio,
  hint,
}: {
  src?: string | null
  alt: string
  label: string
  ratio: string
  hint?: string
}) {
  return (
    <ClipBox>
      <div className={`relative w-full overflow-hidden bg-[#dcd7ca] ${ratio}`}>
        {src ? (
          <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-6">
            <span className="label text-[0.55rem] text-ink/50 md:text-[0.72rem]">
              Foto<span className="hidden md:inline">{hint ? ` · ${hint.replace('foto ', '')}` : ''}</span>
            </span>
            <span className="font-display text-3xl leading-none text-ink/80 md:text-6xl">{label}</span>
          </div>
        )}
      </div>
    </ClipBox>
  )
}
