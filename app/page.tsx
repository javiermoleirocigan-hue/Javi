'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import HeroOverlay from '@/components/HeroOverlay'
import AboutSection from '@/components/sections/AboutSection'
import CrewSection from '@/components/sections/CrewSection'
import StatsSection from '@/components/sections/StatsSection'
import CtaSection from '@/components/sections/CtaSection'
import Footer from '@/components/Footer'

const PadelScene = dynamic(() => import('@/components/PadelScene'), { ssr: false })

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [snowTriggered, setSnowTriggered] = useState(false)
  const snowRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      const height = el.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, -top / height))
      setScrollProgress(progress)
      if (progress >= 0.75 && !snowRef.current) {
        snowRef.current = true
        setSnowTriggered(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="bg-[#080808] text-white overflow-x-hidden">
      {/* 3D Scroll Section */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full">
          <PadelScene scrollProgress={scrollProgress} snowTriggered={snowTriggered} />
          <HeroOverlay scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* Content sections */}
      <AboutSection />
      <StatsSection />
      <CrewSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
