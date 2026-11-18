import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'))
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npm, ['audit', '--json'], {
  cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
})
if (result.error || !result.stdout) {
  console.error('FAIL: não foi possível consultar o relatório npm audit')
  process.exit(1)
}
let report
try { report = JSON.parse(result.stdout) } catch {
  console.error('FAIL: relatório npm audit inválido')
  process.exit(1)
}
if (report.error) {
  console.error('FAIL: npm audit não pôde consultar o registro:', report.error.code ?? 'erro')
  process.exit(1)
}
const important = Object.entries(report.vulnerabilities ?? {})
  .filter(([, v]) => v.severity === 'high' || v.severity === 'critical')
if (important.length === 0) {
  console.log('PASS: nenhum aviso alto ou crítico, inclusive em devDependencies')
  process.exit(0)
}

// Exceção temporária, específica do GHSA-fc5q-39xc-vjpf, ainda sem patch npm.
// Nunca deixar alerta novo passar apenas porque se trata de dependência de build.
const allowed = new Set(['picomatch', 'fdir', 'tinyglobby', 'vite'])
const advisory = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf'
const direct = important.flatMap(([, v]) => (v.via ?? []).filter(x => typeof x === 'object'))
const devOnly = important.every(([name]) =>
  allowed.has(name) && lock.packages?.['node_modules/' + name]?.dev === true)
const onlyKnownAdvisory = direct.length > 0 && direct.every(x => x.url === advisory)

if (!devOnly || !onlyKnownAdvisory) {
  console.error('AUDIT DEBUG:', JSON.stringify({devOnly,onlyKnownAdvisory, advisories: direct.map(x=>({url:x.url,title:x.title}))}))
  console.error('FAIL: vulnerabilidade alta/crítica nova ou não restrita às ferramentas de build')
  for (const [name, v] of important) {
    console.error(' - ' + name + ' (' + v.severity + ')')
  }
  process.exit(1)
}
console.warn('AVISO ACOMPANHADO: ' + important.length + ' entradas transitivas de desenvolvimento')
console.warn('Origem única: picomatch <= 4.0.7 / GHSA-fc5q-39xc-vjpf (ReDoS)')
console.warn('Não é distribuído no bundle estático. Dependabot acompanha correção futura.')
console.warn('A auditoria separada de produção permanece obrigatória e bloqueante.')
