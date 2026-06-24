'use client'

import { useReveal } from '@/hooks/useReveal'

const steps = [
  { num: '01', title: 'Jugar', desc: 'Cada fin de semana, llueva o truene. Las excusas las dejamos fuera de la pista.' },
  { num: '02', title: 'Aprender', desc: 'Videos de YouTube a las 2 de la mañana y bandeja que sigue sin entrar.' },
  { num: '03', title: 'Reír', desc: 'Porque si no te ríes de tus propios errores, alguien lo hará por ti.' },
]

export default function AboutSection() {
  const headingRef = useReveal<HTMLDivElement>()
  const bodyRef = useReveal<HTMLDivElement>()
  const stepsRef = useReveal<HTMLDivElement>()

  return (
    <section id="nosotros" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div ref={headingRef} className="reveal">
            <p className="text-[#4ADE80] text-[0.7rem] tracking-[0.25em] uppercase font-bold mb-5 flex items-center gap-3">
              <span className="w-5 h-px bg-[#4ADE80] inline-block" />
              Nuestra historia
            </p>
            <h2 className="font-disp text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.88] uppercase tracking-tight mb-6">
              Empezamos con<br />
              <span className="text-white/22">una pista</span> y<br />
              mucha actitud.
            </h2>
          </div>
          <div ref={bodyRef} className="reveal reveal-d2">
            <p className="text-white/45 text-base leading-relaxed">
              Todo empezó un domingo lluvioso de octubre. Seis amigos, una pista reservada
              y cero idea de cómo dar una bandeja decente. Tres temporadas después, seguimos
              siendo igual de malos. Pero lo pasamos infinitamente mejor.
            </p>
          </div>
        </div>

        <div ref={stepsRef} className="reveal reveal-d1 space-y-3">
          {steps.map(({ num, title, desc }) => (
            <div
              key={num}
              className="flex gap-5 p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-[#4ADE80]/30 hover:bg-[#4ADE80]/[0.03] transition-all duration-300"
            >
              <span className="font-disp text-[#4ADE80] text-sm mt-0.5 shrink-0 leading-none">{num}</span>
              <div>
                <h3 className="font-black text-base mb-1 tracking-tight">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
