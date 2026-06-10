'use client'

import Spline from '@splinetool/react-spline'
import { useEffect, useRef } from 'react'

export default function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const removeWatermark = () => {
      // Spline injects an <a> with href pointing to spline.design
      document.querySelectorAll('a[href*="spline.design"]').forEach(el => el.remove())

      // Also catch any element whose direct text mentions spline
      document.querySelectorAll('*').forEach(el => {
        const directText = Array.from(el.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent ?? '')
          .join('')
          .toLowerCase()

        if (directText.includes('spline')) el.remove()
      })
    }

    removeWatermark()

    const observer = new MutationObserver(() => removeWatermark())

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Spline
        scene="https://prod.spline.design/81k5p0fEMZgIcqP2/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}