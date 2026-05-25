export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-black tracking-tighter text-xl">
          SMASH<span className="text-[#4ADE80]">CREW</span>
        </span>
        <p className="text-white/25 text-sm">
          © 2025 — Hecho con amor y bandeja fallada
        </p>
        <div className="flex gap-6 text-white/30 text-sm">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          <a href="#" className="hover:text-white transition-colors">Reservar</a>
        </div>
      </div>
    </footer>
  )
}
