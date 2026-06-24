'use client'

import { useReveal } from '@/hooks/useReveal'

const crew = [
  { name: 'Carlos', alias: 'El Toro',      role: 'Potencia bruta',           wins: 89,  initial: 'C' },
  { name: 'Javi',   alias: 'Revés',         role: 'Técnica cuestionable',     wins: 74,  initial: 'J' },
  { name: 'Marta',  alias: 'Smash Queen',   role: 'Dominadora de la red',     wins: 112, initial: 'M' },
  { name: 'Pablo',  alias: 'Bolea',         role: 'Defensa imposible',        wins: 68,  initial: 'P' },
  { name: 'Sofía',  alias: 'La Pared',      role: 'Recupera todo',            wins: 95,  initial: 'S' },
  { name: 'Andrés', alias: 'Lob',           role: 'Especialista en globos',   wins: 51,  initial: 'A' },
]

export default function CrewSection() {
  const headerRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <section id="crew" className="py-32 px-6 max-w-5xl mx-auto">
      <div ref={headerRef} className="reveal mb-16">
        <p className="text-[#4ADE80] text-[0.7rem] tracking-[0.25em] uppercase font-bold mb-5 flex items-center gap-3">
          <span className="w-5 h-px bg-[#4ADE80] inline-block" />
          El equipo
        </p>
        <h2 className="font-disp text-[clamp(2.8rem,6vw,4.8rem)] uppercase tracking-tight leading-[0.88]">
          Conoce a la banda
        </h2>
      </div>

      <div ref={gridRef} className="stagger-reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {crew.map(({ name, alias, role, wins, initial }) => (
          <div
            key={name}
            className="group p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-[#4ADE80]/35 hover:bg-[#4ADE80]/[0.04] transition-all duration-300 cursor-default"
          >
            <div className="w-11 h-11 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center mb-5 group-hover:bg-[#4ADE80]/18 group-hover:border-[#4ADE80]/35 transition-all duration-300">
              <span className="font-disp text-[#4ADE80] text-xl leading-none">{initial}</span>
            </div>
            <h3 className="font-black text-lg tracking-tight leading-none">{name}</h3>
            <p className="text-[#4ADE80] text-xs font-semibold mt-1 mb-1 tracking-wide">&ldquo;{alias}&rdquo;</p>
            <p className="text-white/38 text-sm mb-5">{role}</p>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white/25 text-[0.65rem] tracking-wider uppercase">Victorias</span>
                <span className="text-white/45 text-xs font-black">{wins}</span>
              </div>
              <div className="h-[3px] rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4ADE80] to-[#22c55e]"
                  style={{ width: `${(wins / 112) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
