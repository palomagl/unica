import { IDEA_EXAMPLES, IDEA_LINK, whatsappLink } from '../content'
import { Btn } from './Btn'
import { Reveal } from './Reveal'
import { Words } from './Words'
import { Decode } from './Decode'

/** Diferencial: "você não precisa saber exatamente o que precisa" + espaço para depoimento real. */
export function Confidence() {
  return (
    <section id="ideia" data-tone="light" className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-40">
        <Words
          text="Você não precisa saber | exatamente *o que precisa.*"
          className="font-display text-[clamp(2.8rem,8.4vw,8.2rem)] leading-[0.93]"
        />

        <div className="mt-10 grid gap-10 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-ink/80 md:text-xl">
              Você conta a ideia, a necessidade ou o problema. A ÚNICA encontra a melhor forma de transformar isso em algo digital.
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

        {/* TODO: depoimentos reais de clientes. Nada aqui é inventado. */}
        <Reveal className="mt-16 border-t border-ink pt-10 md:mt-28 md:pt-14">
          <div className="grid items-start gap-6 md:grid-cols-12">
            <Decode text="03 / Quem já criou com a ÚNICA" as="p" className="label text-ash md:col-span-4" />
            <div className="border border-dashed border-ink/35 p-5 md:col-span-6 md:col-start-6">
              <p className="label text-signal">Espaço para depoimento real</p>
              <p className="mt-2 font-display text-2xl leading-snug text-ink/35 md:text-3xl">“Substituir por um depoimento de cliente.”</p>
              <p className="label mt-3 text-ink/35">Nome · Empresa</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
