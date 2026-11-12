import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './fx'

/**
 * Dispara a classe is-visible quando o elemento aparece pela primeira vez.
 * O CSS controla a transição; sem IntersectionObserver ou com redução
 * de movimento, o conteúdo permanece visível.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
