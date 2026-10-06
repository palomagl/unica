import { Header } from './components/Header'
import { Cursor } from './components/Cursor'
import { ScrollRail } from './components/ScrollRail'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Confidence } from './components/Confidence'
import { FinalCTA } from './components/FinalCTA'

// Cinco momentos: abertura → serviços e preços → projetos → diferencial e confiança → CTA final.
export default function App() {
  return (
    <>
      <Cursor />
      <ScrollRail />
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Confidence />
      </main>
      <FinalCTA />
    </>
  )
}
