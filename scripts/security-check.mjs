import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const read = path => readFileSync(join(root, path), 'utf8')
const issues = []
const assert = (condition, message) => { if (!condition) issues.push(message) }
const config = JSON.parse(read('vercel.json'))
const headers = config.headers?.find(route => route.source === '/(.*)')?.headers ?? []
const header = name => headers.find(item => item.key.toLowerCase() === name.toLowerCase())?.value
const directives = Object.fromEntries((header('Content-Security-Policy') ?? '')
  .split(';').map(item => item.trim()).filter(Boolean)
  .map(item => { const [key, ...values] = item.split(/\s+/); return [key, values] }))
const has = (name, value) => directives[name]?.includes(value) ?? false

// A landing usa atributos style controlados por React. Nunca autorizar script inline.
assert((directives['script-src'] ?? []).join(' ') === "'self'", 'CSP: script-src deve ser somente self')
assert(!Object.values(directives).flat().includes("'unsafe-eval'"), 'CSP: unsafe-eval proibido')
assert(!has('script-src', "'unsafe-inline'"), 'CSP: JavaScript inline proibido')
for (const [directive, value] of [
  ['default-src', "'self'"], ['style-src-elem', "'self'"],
  ['style-src-attr', "'unsafe-inline'"], ['object-src', "'none'"],
  ['frame-ancestors', "'none'"], ['frame-src', "'none'"],
  ['worker-src', "'none'"], ['base-uri', "'self'"],
  ['form-action', "'none'"],
]) assert(has(directive, value), 'CSP: falta ' + directive + ' ' + value)
for (const [name, value] of [
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
  ['Cross-Origin-Resource-Policy', 'same-origin'],
  ['X-Permitted-Cross-Domain-Policies', 'none'],
]) assert(header(name) === value, 'Cabeçalho inválido: ' + name)
assert((header('Strict-Transport-Security') ?? '').includes('max-age='), 'HSTS ausente')
assert((header('Referrer-Policy') ?? '').includes('strict-origin'), 'Referrer-Policy ausente')
assert(Boolean(header('Permissions-Policy')), 'Permissions-Policy ausente')
assert(/sourcemap:\s*false/.test(read('vite.config.ts')), 'Source maps de produção devem ficar desligados')

const contact = read('src/content.ts').match(/whatsapp:\s*'(\d+)'/)?.[1]
assert(/^\d{12,13}$/.test(contact ?? ''), 'WhatsApp inválido')
assert(read('index.html').includes('https://wa.me/' + contact), 'Fallback sem JS usa número antigo')

const sourceFiles = []
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) sourceFiles.push(full)
  }
}
walk(join(root, 'src'))

for (const file of sourceFiles) {
  const content = readFileSync(file, 'utf8')
  const name = relative(root, file)
  for (const [pattern, description] of [
    [/dangerouslySetInnerHTML/, 'HTML sem sanitização'],
    [/\b(?:eval|Function)\s*\(/, 'execução dinâmica de código'],
    [/\bdocument\.write\s*\(/, 'document.write'],
    [/\b(?:innerHTML|outerHTML)\s*=/, 'HTML alterado diretamente'],
    [/javascript\s*:/i, 'URL javascript:'],
    [/(?:AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|sk_live_[A-Za-z0-9]+)/, 'possível credencial'],
  ]) if (pattern.test(content)) issues.push(name + ': ' + description)

  for (const tag of content.matchAll(/<a\b[^>]*\btarget="_blank"[^>]*>/gs)) {
    const rel = tag[0].match(/\brel="([^"]*)"/)?.[1] ?? ''
    if (!rel.includes('noopener') || !rel.includes('noreferrer'))
      issues.push(name + ': link externo com target=_blank sem noopener noreferrer')
  }
}
if (issues.length) {
  for (const issue of issues) console.error('FAIL: ' + issue)
  process.exitCode = 1
} else {
  console.log('PASS: CSP, headers e ' + sourceFiles.length + ' arquivos de código verificados')
  console.log('PASS: sem sinks perigosos, scripts inseguros nem links externos desprotegidos')
  console.log('PASS: WhatsApp sincronizado e source maps de produção desativados')
}
