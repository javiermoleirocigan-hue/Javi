'use client'

import { useEffect, useRef, useState } from 'react'

function StatItem({
  value,
  display,
  label,
  triggered,
  delay,
}: {
  value: number | null
  display: string | null
  label: string
  triggered: boolean
  delay: number
}) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!triggered || started.current || value === null) return
    const t = setTimeout(() => {
      started.current = true
      const duration = 1400
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * value))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [triggered, value, delay])

  return (
    <div className="bg-[#080808] py-12 px-8 text-center group hover:bg-[#0d0d0d] transition-colors">
      <p className="font-disp text-[clamp(2.5rem,6vw,4rem)] text-[#4ADE80] leading-none mb-2 group-hover:scale-105 transition-transform duration-300 origin-bottom">
        {display ?? count}
      </p>
      <p className="text-white/30 text-[0.7rem] tracking-widest uppercase">{label}</p>
    </div>
  )
}

const stats = [
  { value: 247, display: null, label: 'Partidos jugados' },
  { value: 3,   display: null, label: 'Raquetas rotas' },
  { value: null, display: '∞', label: 'Bandejas falladas' },
  { value: 6,   display: null, label: 'Amigos para siempre' },
]

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="stats" ref={ref} className="py-20 border-y border-white/8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(74,222,128,0.04),transparent)] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 relative">
        {stats.map(({ value, display, label }, i) => (
          <StatItem
            key={label}
            value={value}
            display={display}
            label={label}
            triggered={triggered}
            delay={i * 120}
          />
        ))}
      </div>
    </section>
  )
}
