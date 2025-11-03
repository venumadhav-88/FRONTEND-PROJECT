import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [key, setKey] = useState(location.pathname)
  const barRef = useRef(null)

  useEffect(() => {
    // Trigger top progress bar
    const bar = barRef.current
    if (bar) {
      bar.style.width = '0%'
      // force reflow
      void bar.offsetWidth
      bar.style.width = '100%'
      const done = setTimeout(() => (bar.style.width = '0%'), 400)
      return () => clearTimeout(done)
    }
  }, [location.pathname])

  useEffect(() => {
    // change content key to animate
    setKey(location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="route-wrapper">
      <div className="top-progress"><div ref={barRef} className="top-progress-bar" /></div>
      <div key={key} className="route-anim">
        {children}
      </div>
    </div>
  )
}


