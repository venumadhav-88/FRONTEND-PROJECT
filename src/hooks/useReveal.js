import { useEffect } from 'react'

export function useReveal(selector = '.card-box, .stat, .showcase, .demo-item, section') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })

    elements.forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [selector])
}


