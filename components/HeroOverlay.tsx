'use client'

interface Props {
  scrollProgress: number
}

export default function HeroOverlay({ scrollProgress: s }: Props) {
  const titleOpacity = s < 0.05
    ? s / 0.05
    : s < 0.08
      ? 1
      : Math.max(0, 1 - (s - 0.08) / 0.06)

  const subtitleOpacity = s < 0.04 ? 0 : s < 0.08 ? (s - 0.04) / 0.04 : titleOpacity

  const hintOpacity = s < 0.03 ? s / 0.03 : s > 0.08 ? 0 : 1 - (s - 0.03) / 0.05

  const assemblingOpacity = s > 0.44 && s < 0.72
    ? Math.min(1, Math.min((s - 0.44) / 0.06, (0.72 - s) / 0.06))
    : 0

  const boomOpacity = s > 0.74 && s < 0.82
    ? Math.min(1, Math.min((s - 0.74) / 0.03, (0.82 - s) / 0.04))
    : 0

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
      {/* Vignette frame */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, rgba(8,8,8,0.45) 100%)' }}
      />

      {/* Main title block */}
      <div
        className="relative text-center"
        style={{ opacity: titleOpacity, transform: `translateY(${(1 - titleOpacity) * 20}px)`, transition: 'none' }}
      >
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/8 mb-6"
          style={{ opacity: subtitleOpacity }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block animate-pulse" />
          <span className="text-[#4ADE80] text-[0.7rem] font-bold tracking-[0.25em] uppercase">Temporada 2025</span>
        </div>

        <h1 className="font-disp text-[clamp(4rem,14vw,10rem)] leading-[0.85] text-white uppercase tracking-tight drop-shadow-2xl">
          SMASH
          <br />
          <span className="text-[#4ADE80]">CREW</span>
        </h1>

        <p
          className="mt-5 text-[clamp(0.8rem,1.8vw,1.05rem)] text-white/45 tracking-[0.25em] uppercase font-light"
          style={{ opacity: subtitleOpacity }}
        >
          We came for the pádel. We stayed for the vibe.
        </p>
      </div>

      {/* Scroll hint — mouse icon */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: hintOpacity, transition: 'none' }}
      >
        <span className="text-white/30 text-[0.6rem] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-[22px] h-[36px] border-2 border-white/25 rounded-[14px] relative">
          <span className="scroll-dot absolute left-1/2 -translate-x-1/2 w-[4px] h-[7px] bg-[#4ADE80] rounded-full" />
        </div>
      </div>

      {/* Assembling text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: assemblingOpacity, transition: 'none' }}
      >
        <p className="text-[clamp(1rem,3vw,1.5rem)] text-white/40 tracking-[0.4em] uppercase font-light">
          Volviendo a casa...
        </p>
      </div>

      {/* BOOM */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: boomOpacity, transition: 'none' }}
      >
        <p
          className="font-disp text-[clamp(4rem,18vw,14rem)] leading-none text-white uppercase"
          style={{ textShadow: '0 0 60px #4ADE80, 0 0 30px #4ADE80, 0 0 120px rgba(74,222,128,0.35)' }}
        >
          BOOM
        </p>
      </div>
    </div>
  )
}
