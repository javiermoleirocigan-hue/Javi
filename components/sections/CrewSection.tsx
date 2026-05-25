const crew = [
  { name: 'Carlos', alias: 'El Toro', role: 'Potencia bruta', wins: 89, emoji: '🐂' },
  { name: 'Javi', alias: 'Revés', role: 'Técnica cuestionable', wins: 74, emoji: '🎯' },
  { name: 'Marta', alias: 'Smash Queen', role: 'Dominadora de la red', wins: 112, emoji: '👑' },
  { name: 'Pablo', alias: 'Bolea', role: 'Defensa imposible', wins: 68, emoji: '🧱' },
  { name: 'Sofía', alias: 'La Pared', role: 'Recupera todo', wins: 95, emoji: '🪃' },
  { name: 'Andrés', alias: 'Lob', role: 'Especialista en globos', wins: 51, emoji: '🎈' },
]

export default function CrewSection() {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <p className="text-[#4ADE80] text-sm tracking-widest uppercase font-medium mb-4">
          El equipo
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight">
          Conoce a la banda
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {crew.map(({ name, alias, role, wins, emoji }) => (
          <div
            key={name}
            className="group p-6 rounded-2xl border border-white/8 hover:border-[#4ADE80]/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className="text-4xl mb-4">{emoji}</div>
            <h3 className="font-black text-xl tracking-tight">{name}</h3>
            <p className="text-[#4ADE80] text-sm font-medium mb-1">&ldquo;{alias}&rdquo;</p>
            <p className="text-white/40 text-sm mb-4">{role}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#4ADE80]"
                  style={{ width: `${(wins / 112) * 100}%` }}
                />
              </div>
              <span className="text-white/30 text-xs">{wins}W</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
