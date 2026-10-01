import { ABOUT_PHOTO, IDEA_EXAMPLES, IDEA_LINK, whatsappLink } from '../content'
import { Btn } from './Btn'
import { ImageSlot } from './ImageSlot'
import { Reveal } from './Reveal'
import { Words } from './Words'

/** Diferencial + confiança num só momento: "você não precisa saber" e "por trás da ÚNICA". */
export function Confidence() {
  return (
    <section id="sobre" data-tone="light" className="bg-paper-2">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-40">
        <Words
          text="Você não precisa saber | exatamente *o que precisa.*"
          className="font-display text-[clamp(2.8rem,8.4vw,8.2rem)] leading-[0.93]"
        />

        <div className="mt-10 grid gap-10 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-ink/80 md:text-xl">
              Você me conta a ideia, a necessidade ou o problema. Eu encontro a melhor forma de transformar isso em algo digital.
            </p>
            <div className="mt-8"><Btn href={IDEA_LINK} variant="ink">Contar minha ideia</Btn></div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-6 md:col-start-7">
            <p className="label mb-3 text-ash">Pode começar assim</p>
            <ul>
              {IDEA_EXAMPLES.map((s) => (
                <li key={s} className="border-t border-ink/25 last:border-b">
                  <a
                    href={whatsappLink(`Olá! ${s}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-14 items-center justify-between gap-6 py-4 font-display text-2xl leading-snug transition-colors hover:text-signal md:text-3xl"
                  >
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">“{s}”</span>
                    <span className="label shrink-0">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Por trás da ÚNICA */}
        <div className="mt-20 grid grid-cols-[34%_1fr] items-center gap-5 border-t border-ink pt-10 md:mt-36 md:grid-cols-12 md:gap-10 md:pt-16">
          <div className="md:col-span-3">
            <ImageSlot src={ABOUT_PHOTO} alt="Paloma, desenvolvedora por trás da ÚNICA" label="Paloma" ratio="aspect-[4/5]" hint="foto profissional" />
          </div>

          <Reveal className="md:col-span-5 md:col-start-5">
            <p className="label mb-2 text-ash md:mb-4">Por trás da ÚNICA</p>
            <p className="font-display text-[1.65rem] leading-[1.15] md:text-5xl">
              Sou Paloma, desenvolvedora, e gosto de transformar ideias em coisas que realmente podem ser usadas.
            </p>
          </Reveal>

          {/* TODO: depoimentos reais. Nada aqui é inventado. */}
          <Reveal className="col-span-2 mt-4 md:col-span-3 md:col-start-10 md:mt-0">
            <div className="border border-dashed border-ink/35 p-4">
              <p className="label text-signal">Espaço p/ depoimento real</p>
              <p className="mt-2 font-display text-xl leading-snug text-ink/35">“Substituir por um depoimento de cliente.”</p>
              <p className="label mt-3 text-ink/35">Nome · Empresa</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
