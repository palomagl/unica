/** Marca geométrica ÚNICA: dois módulos conectados por um núcleo em movimento. */
export function BrandSymbol({ className = '' }: { className?: string }) {
  return (
    <svg className={`u-brand-symbol ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path className="u-brand-symbol-top" d="M8 9h28v13H22v14H8V9Z" fill="currentColor" />
      <path className="u-brand-symbol-bottom" d="M56 55H28V42h14V28h14v27Z" fill="currentColor" />
      <path className="u-brand-symbol-core" d="m32 22 10 10-10 10-10-10 10-10Z" fill="var(--u-accent, #d2ff22)" />
    </svg>
  )
}
