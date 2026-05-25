export default function CtaSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#4ADE80] text-sm tracking-widest uppercase font-medium mb-6">
          ¿Te atreves?
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tight leading-tight mb-8">
          Crees que puedes<br />
          <span className="text-white/25">seguir el ritmo?</span>
        </h2>
        <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          No hace falta que seas bueno. Hace falta que tengas ganas.
          Reserva una pista y demuéstralo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 bg-[#4ADE80] text-[#080808] font-black rounded-full tracking-tight text-lg hover:bg-white transition-colors">
            Únete al crew
          </button>
          <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-full tracking-tight text-lg hover:border-white/60 transition-colors">
            Ver próximas pistas
          </button>
        </div>
      </div>
    </section>
  )
}
