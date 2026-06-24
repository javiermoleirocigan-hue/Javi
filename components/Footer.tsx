const navLinks = ['Nosotros', 'El Crew', 'Stats', 'Únete']
const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'WhatsApp', href: '#' },
  { label: 'Reservar pista', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <span className="font-disp text-2xl uppercase tracking-tight block mb-3">
              SMASH<span className="text-[#4ADE80]">CREW</span>
            </span>
            <p className="text-white/30 text-sm leading-relaxed max-w-[220px]">
              Un grupo de amigos con más actitud que talento. Desde 2022.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-white/25 text-xs">Próxima pista: Sábado</span>
            </div>
          </div>

          <div>
            <p className="text-white/50 text-[0.65rem] tracking-[0.25em] uppercase font-bold mb-5">Navegar</p>
            <div className="space-y-2.5">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="block text-white/35 text-sm hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/50 text-[0.65rem] tracking-[0.25em] uppercase font-bold mb-5">Síguenos</p>
            <div className="space-y-2.5">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block text-white/35 text-sm hover:text-[#4ADE80] transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/18 text-xs">
            © 2025 SMASH CREW — Hecho con amor y bandeja fallada
          </p>
          <p className="text-white/18 text-xs">
            We Ball Different ™
          </p>
        </div>
      </div>
    </footer>
  )
}
