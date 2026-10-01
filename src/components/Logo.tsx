/** `tone` = fundo onde o logo está: 'dark' usa o lettering branco, 'light' o preto. */
export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <img
      src={tone === 'dark' ? '/unica-logo-white.png' : '/unica-logo-black.png'}
      alt="ÚNICA"
      width={920}
      height={370}
      className={className}
      draggable={false}
    />
  )
}
