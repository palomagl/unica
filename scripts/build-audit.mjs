import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const app = readFileSync(join(root, 'src/App.tsx'), 'utf8')
const build = join(root, 'dist')
const failures = []
const report = (label, pass, details='') => {
  console.log((pass ? 'PASS' : 'FAIL') + '  ' + label + (details ? ' — ' + details : ''))
  if (!pass) failures.push(label)
}
const listFiles = folder => {
  if (!existsSync(folder)) return []
  return readdirSync(folder,{withFileTypes:true}).flatMap(entry=>{
    const filepath=join(folder,entry.name)
    return entry.isDirectory()?listFiles(filepath):[{path:filepath,size:statSync(filepath).size}]
  })
}
const files=listFiles(build)
const names=files.map(x=>x.path)
const js=files.filter(x=>/\.js$/i.test(x.path))
const css=files.filter(x=>/\.css$/i.test(x.path))
const fonts=files.filter(x=>/\.woff2$/i.test(x.path))
const bytes=arr=>arr.reduce((a,x)=>a+x.size,0)
const kb=n=>(n/1024).toFixed(1)+' KB'
report('Vite production output exists',existsSync(join(build,'index.html')))
report('JS budget (300 KB raw)',bytes(js)<300*1024,kb(bytes(js)))
report('CSS budget (120 KB raw)',bytes(css)<120*1024,kb(bytes(css)))
report('Font budget (250 KB raw)',bytes(fonts)<250*1024,kb(bytes(fonts)))
report('Five projects preserved', (app.match(/visual: '(?:karoane|bruto|vertice|doe|rotina)'/g)||[]).length===5)
report('Portfolio images marked lazy',app.includes('className="u-device-laptop"') && !app.includes("loading={project === 0 ? 'eager' : 'lazy'}"))
report('Responsive viewport',readFileSync(join(build,'index.html'),'utf8').includes('width=device-width, initial-scale=1.0'))
const missing=['karoane','bruto','vertice','rotina'].flatMap(x=>['desktop','mobile'].map(d=>join(build,'screens',x+'-'+d+'-alpha.svg'))).filter(p=>!existsSync(p))
report('Screens available for all device views',missing.length===0,missing.join(', '))
const extra=files.filter(x=>x.path.endsWith('.map'))
report('No publicly served source maps',extra.length===0)
console.log('Production: '+kb(bytes(js))+' JS, '+kb(bytes(css))+' CSS, '+kb(bytes(fonts))+' fonts')
if(failures.length) process.exitCode=1
