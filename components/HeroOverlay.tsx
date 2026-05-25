'use client'

interface Props {
  scrollProgress: number
}

export default function HeroOverlay({ scrollProgress: s }: Props) {
  // Title fades in 0→0.05, stays until 0.08, fades out 0.08→0.14
  const titleOpacity = s < 0.05
    ? s / 0.05
    : s < 0.08
      ? 1
      : Math.max(0, 1 - (s - 0.08) / 0.06)

  // Subtitle below title
  const subtitleOpacity = s < 0.04 ? 0 : s < 0.08 ? (s - 0.04) / 0.04 : titleOpacity

  // "scroll to break it apart" hint fades in 0→0.04
  const hintOpacity = s < 0.03 ? s / 0.03 : s > 0.08 ? 0 : 1 - (s - 0.03) / 0.05

  // "coming together" text appears 0.44→0.56
  const assemblingOpacity = s > 0.44 && s < 0.72
    ? Math.min(1, Math.min((s - 0.44) / 0.06, (0.72 - s) / 0.06))
    : 0

  // "BOOM" flash at 0.75
  const boomOpacity = s > 0.74 && s < 0.82
    ? Math.min(1, Math.min((s - 0.74) / 0.03, (0.82 - s) / 0.04))
    : 0

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
      {/* Main title */}
      <div
        className="text-center"
        style={{ opacity: titleOpacity, transform: `translateY(${(1 - titleOpacity) * 20}px)`, transition: 'none' }}
      >
        <h1 className="text-[clamp(3rem,12vw,9rem)] font-black tracking-tighter leading-none text-white uppercase">
          SMASH
          <br />
          <span className="text-[#4ADE80]">CREW</span>
        </h1>
        <p
          className="mt-4 text-[clamp(0.9rem,2vw,1.25rem)] text-white/60 tracking-widest uppercase font-light"
          style={{ opacity: subtitleOpacity }}
        >
          We came for the pádel. We stayed for the vibe.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: hintOpacity }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Assembling text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: assemblingOpacity }}
      >
        <p className="text-[clamp(1rem,3vw,1.5rem)] text-white/50 tracking-[0.4em] uppercase font-light">
          Volviendo a casa...
        </p>
      </div>

      {/* BOOM text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: boomOpacity }}
      >
        <p
          className="text-[clamp(4rem,18vw,14rem)] font-black tracking-tighter text-white uppercase"
          style={{ textShadow: '0 0 80px #4ADE80, 0 0 40px #4ADE80' }}
        >
          BOOM
        </p>
      </div>
    </div>
  )
}
