export default function AboutSection() {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#4ADE80] text-sm tracking-widest uppercase font-medium mb-4">
            Nuestra historia
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight tracking-tight mb-6">
            Empezamos con<br />
            <span className="text-white/30">una pista</span> y<br />
            mucha actitud.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Todo empezó un domingo lluvioso de octubre. Seis amigos, una pista reservada
            y cero idea de cómo dar una bandeja decente. Tres temporadas después, seguimos
            siendo igual de malos. Pero lo pasamos infinitamente mejor.
          </p>
        </div>
        <div className="space-y-4">
          {[
            ['01', 'Jugar', 'Cada fin de semana, llueva o truene. Las excusas las dejamos fuera de la pista.'],
            ['02', 'Aprender', 'Videos de YouTube a las 2 de la mañana y bandeja que sigue sin entrar.'],
            ['03', 'Reír', 'Porque si no te ríes de tus propios errores, alguien lo hará por ti.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="flex gap-5 p-5 rounded-xl border border-white/8 hover:border-[#4ADE80]/30 transition-colors">
              <span className="text-[#4ADE80] font-black text-sm mt-0.5 shrink-0">{num}</span>
              <div>
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
