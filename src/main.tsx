import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fontes hospedadas junto com o site (sem requisições a terceiros).
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/hanken-grotesk/latin-400.css'
import '@fontsource/hanken-grotesk/latin-500.css'
import '@fontsource/hanken-grotesk/latin-600.css'
import '@fontsource/hanken-grotesk/latin-700.css'
import '@fontsource/dm-mono/latin-400.css'
import '@fontsource/dm-mono/latin-500.css'

import './index.css'
import App from './App'

// Habilita as animações de entrada (sem JS a página aparece completa).
// Feito aqui, e não num <script> inline, para a CSP poder bloquear scripts inline.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
