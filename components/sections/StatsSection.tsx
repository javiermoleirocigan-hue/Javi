const stats = [
  { value: '247', label: 'Partidos jugados' },
  { value: '3', label: 'Raquetas rotas' },
  { value: '∞', label: 'Bandejas falladas' },
  { value: '6', label: 'Amigos para siempre' },
]

export default function StatsSection() {
  return (
    <section className="py-20 border-y border-white/8">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-[#080808] py-12 px-8 text-center">
            <p className="text-[clamp(2.5rem,6vw,4rem)] font-black text-[#4ADE80] leading-none mb-2">
              {value}
            </p>
            <p className="text-white/40 text-sm tracking-wide uppercase">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
