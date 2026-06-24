'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#crew', label: 'El Crew' },
  { href: '#stats', label: 'Stats' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-7 transition-all duration-300 border-b z-[900] ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md py-3 border-white/10'
            : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <a href="#" className="font-disp text-xl uppercase tracking-tight">
          SMASH<span className="text-[#4ADE80]">CREW</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-white/55 hover:text-white font-semibold text-sm px-3 py-2 rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="hidden md:inline-flex items-center px-5 py-2 bg-[#4ADE80] text-[#080808] font-black text-sm rounded-full hover:bg-white transition-colors duration-200"
        >
          Únete
        </a>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2.5px] rounded-full transition-all duration-300 ${open ? 'bg-[#4ADE80] translate-y-[7.5px] rotate-45' : 'bg-white'}`} />
          <span className={`block w-6 h-[2.5px] bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2.5px] rounded-full transition-all duration-300 ${open ? 'bg-[#4ADE80] -translate-y-[7.5px] -rotate-45' : 'bg-white'}`} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[850] bg-[#080808]/98 flex flex-col items-center justify-center gap-3 transition-all duration-300 pt-20 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="font-disp text-5xl uppercase tracking-tight py-2 hover:text-[#4ADE80] transition-colors"
          >
            {label}
          </a>
        ))}
        <a
          href="#cta"
          onClick={() => setOpen(false)}
          className="mt-5 px-8 py-3.5 bg-[#4ADE80] text-[#080808] font-black rounded-full text-lg hover:bg-white transition-colors"
        >
          Únete al crew
        </a>
      </div>
    </>
  )
}
