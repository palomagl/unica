import { Btn } from './Btn'
import { Reveal } from './Reveal'

/** CTA contextual entre seções: uma frase que puxa a próxima ação. */
export function CtaStrip({
  lead,
  label,
  href,
  dark,
}: {
  lead: string
  label: string
  href: string
  dark?: boolean
}) {
  return (
    <Reveal className={`flex flex-col items-start justify-between gap-6 border-t py-10 md:flex-row md:items-center md:py-14 ${dark ? 'border-paper/20' : 'border-ink'}`}>
      <p className="font-display text-3xl leading-tight md:text-5xl">{lead}</p>
      <Btn href={href} variant={dark ? 'signal-on-dark' : 'ink'} className="shrink-0">{label}</Btn>
    </Reveal>
  )
}
