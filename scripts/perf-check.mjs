import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join, extname } from 'node:path'

const publicRoot = new URL('../public/', import.meta.url).pathname
const files = []
const walk = dir => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const filename = join(dir, entry.name)
    if (entry.isDirectory()) walk(filename)
    else files.push({ filename, size: statSync(filename).size })
  }
}
walk(publicRoot)
const format = n => (n / 1024).toFixed(1) + ' KB'
const assets = files.filter(f => /\.(svg|png|webp|jpe?g|avif)$/i.test(f.filename))
const screenAssets = assets.filter(f => f.filename.includes('/screens/') || f.filename.includes('/projects/doe/'))
const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const issues = []
if (appSource.includes("loading={project === 0 ? 'eager' : 'lazy'}")) issues.push('Portfolio forces eager loading before reaching the section')
if (appSource.includes('<ArchitectureShowcase />') || appSource.includes('<ExperienceLab />')) issues.push('Removed sections were unexpectedly restored')
const missing = ['bruto','karoane','vertice','rotina'].flatMap(name => [
  join(publicRoot,'screens',name+'-desktop-alpha.svg'),
  join(publicRoot,'screens',name+'-mobile-alpha.svg'),
]).filter(p => !files.some(f => f.filename === p))
if (missing.length) issues.push('Missing device screenshots: '+missing.join(', '))
for (const f of screenAssets) if (f.size > 250 * 1024) issues.push('Oversized project image: '+f.filename+' ('+format(f.size)+')')
console.log('Portfolio assets:', screenAssets.length, 'files;', format(screenAssets.reduce((a,b)=>a+b.size,0)), 'total (not downloaded at once)')
console.log('Largest files:', screenAssets.sort((a,b)=>b.size-a.size).slice(0,4).map(f => f.filename.split('/').slice(-2).join('/')+' '+format(f.size)).join('; '))
if (issues.length) {
  issues.forEach(s => console.error('FAIL',s))
  process.exitCode = 1
} else console.log('PASS: screenshot presence, lazy loading rule and per-image 250KB budget')
