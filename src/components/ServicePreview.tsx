import type { ServiceId } from '../content'

// Esquemas em CSS (sem imagens): cada serviço mostra o "formato" do que entrega.
const strong = 'bg-paper/75'
const soft = 'bg-paper/25'
const edge = 'border border-paper/35'

function Landing() {
  return (
    <div className={`w-44 space-y-3 p-3 ${edge}`}>
      <div className="flex justify-between"><div className={`h-1 w-8 ${soft}`} /><div className={`h-1 w-12 ${soft}`} /></div>
      <div className="space-y-1.5 pt-2"><div className={`h-3 w-4/5 ${strong}`} /><div className={`h-3 w-3/5 ${strong}`} /></div>
      <div className="space-y-1"><div className={`h-1 w-full ${soft}`} /><div className={`h-1 w-5/6 ${soft}`} /></div>
      <div className="h-6 w-24 bg-signal" />
      <div className={`h-20 w-full ${edge}`} />
      <div className="grid grid-cols-2 gap-2"><div className={`h-10 ${edge}`} /><div className={`h-10 ${edge}`} /></div>
      <div className={`h-1 w-1/2 ${soft}`} />
    </div>
  )
}

function Site() {
  return (
    <div className={`w-72 ${edge}`}>
      <div className="flex items-center justify-between border-b border-paper/25 px-3 py-2">
        <div className={`h-1.5 w-8 ${strong}`} />
        <div className="flex gap-2"><div className={`h-1 w-6 ${soft}`} /><div className={`h-1 w-6 ${soft}`} /><div className={`h-1 w-6 ${soft}`} /><div className="h-1 w-6 bg-signal" /></div>
      </div>
      <div className="space-y-3 p-3">
        <div className={`h-20 ${edge}`} />
        <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((k) => <div key={k} className={`h-14 ${edge}`} />)}</div>
        <div className="grid grid-cols-2 gap-2"><div className={`h-1.5 ${soft}`} /><div className={`h-1.5 ${soft}`} /></div>
      </div>
    </div>
  )
}

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-60 w-32 rounded-[1.1rem] border-2 border-paper/55 p-2.5">
        <div className={`mx-auto mb-3 h-1 w-8 rounded-full ${soft}`} />
        {children}
      </div>
      <span className="label text-[0.58rem] text-paper/50">{label}</span>
    </div>
  )
}

function WebApp() {
  return (
    <Phone label="na tela inicial">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 11 }).map((_, k) => <div key={k} className={`aspect-square ${edge}`} />)}
        <div className="aspect-square bg-signal" />
      </div>
    </Phone>
  )
}

function App() {
  return (
    <Phone label="na loja">
      <div className="label mb-2 text-center text-[0.5rem] text-paper/60">Google Play</div>
      <div className="mx-auto mb-2 h-11 w-11 bg-signal" />
      <div className={`mx-auto mb-1 h-1.5 w-16 ${strong}`} />
      <div className={`mx-auto mb-3 h-1 w-10 ${soft}`} />
      <div className="label border border-paper/60 py-1.5 text-center text-[0.5rem]">Instalar</div>
      <div className={`mt-3 h-12 ${edge}`} />
    </Phone>
  )
}

function Custom() {
  return (
    <div className="relative h-60 w-60 border border-dashed border-paper/40 p-3">
      <span className="label absolute -top-5 left-0 text-[0.58rem] text-paper/50">sob medida</span>
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
        <div className="col-span-2 border border-dashed border-paper/35" />
        <div className="bg-signal" />
        <div className={`row-span-2 ${edge}`} />
        <div className="col-span-2 border border-dashed border-paper/35" />
        <div className="border border-dashed border-paper/35" />
        <div className={`col-span-2 ${strong} opacity-20`} />
      </div>
    </div>
  )
}

export function ServicePreview({ id }: { id: ServiceId }) {
  switch (id) {
    case 'landing': return <Landing />
    case 'site': return <Site />
    case 'webapp': return <WebApp />
    case 'app': return <App />
    case 'custom': return <Custom />
  }
}
