'use client'

import { useReveal } from '@/hooks/useReveal'

export default function CtaSection() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="cta" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(74,222,128,0.07),transparent)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4ADE80]/[0.04] blur-3xl pointer-events-none" />

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center relative">
        <p className="text-[#4ADE80] text-[0.7rem] tracking-[0.25em] uppercase font-bold mb-6 flex items-center justify-center gap-3">
          <span className="w-5 h-px bg-[#4ADE80] inline-block" />
          ¿Te atreves?
          <span className="w-5 h-px bg-[#4ADE80] inline-block" />
        </p>
        <h2 className="font-disp text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.85] tracking-tight mb-8">
          Crees que puedes
          <br />
          <span className="text-white/18">seguir el ritmo?</span>
        </h2>
        <p className="text-white/38 text-base mb-12 max-w-xl mx-auto leading-relaxed">
          No hace falta que seas bueno. Hace falta que tengas ganas.
          Reserva una pista y demuéstralo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#4ADE80] text-[#080808] font-black rounded-full text-lg hover:bg-white transition-all duration-200">
            Únete al crew
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="px-10 py-4 border border-white/18 text-white/80 font-bold rounded-full text-lg hover:border-white/45 hover:text-white hover:bg-white/5 transition-all duration-200">
            Ver próximas pistas
          </button>
        </div>
      </div>
    </section>
  )
}
