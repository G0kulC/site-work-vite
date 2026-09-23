import { useEffect, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <BlurFade inView inViewMargin="-60px" direction="up" offset={18} blur="8px" duration={0.6} delay={delay} className={className}>{children}</BlurFade>
}

// SVG displacement used by `.liquid-glass.refract` to bend what sits behind the glass.
// Only Chromium renders SVG filters in backdrop-filter, so the class is gated to it.
export function LiquidGlassFilter() {
  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands ?? []
    if (brands.some(b => b.brand === 'Chromium')) document.documentElement.classList.add('glass-refract')
  }, [])
  return <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
    <filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.011" numOctaves="2" seed="11" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2.5" result="softNoise" />
      <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="26" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
}
