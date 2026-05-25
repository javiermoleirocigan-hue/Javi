# CLAUDE.md — SMASH CREW (Padel Landing Page)

## Project Overview

Interactive 3D landing page for **SMASH CREW**, a friend padel group.
The hero experience is a scroll-driven 3D animation: a white padel racket disassembles
into flying pieces, reassembles, and explodes in snow particles. Built to look like
those viral TikTok interactive websites.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.x | Framework (App Router) |
| TypeScript | 5.x | Language (strict) |
| React | 18.x | UI (required by R3F v8) |
| `@react-three/fiber` | 8.x | React renderer for Three.js |
| `@react-three/drei` | 9.x | R3F helpers (Environment, etc.) |
| Three.js | 0.170.x | 3D engine |
| Tailwind CSS | 3.x | Styling |

> React 18 (not 19) is required — `@react-three/fiber` v8 has a peer dep on React `>=18 <19`.
> Always install with `--legacy-peer-deps`.

## Directory Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Main page — scroll progress tracking, dynamic import
│   └── globals.css         # Tailwind base + custom scrollbar + selection color
├── components/
│   ├── PadelScene.tsx      # Canvas wrapper (localClippingEnabled: true)
│   ├── PadelRacket.tsx     # 3D racket — geometry + scroll-driven disassembly
│   ├── SnowExplosion.tsx   # THREE.Points particle burst on trigger
│   ├── HeroOverlay.tsx     # Absolute text overlay on the canvas
│   └── sections/
│       ├── AboutSection.tsx
│       ├── StatsSection.tsx
│       ├── CrewSection.tsx
│       └── CtaSection.tsx
├── Footer.tsx
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Scroll Animation Architecture

The 3D hero runs in a **sticky canvas** pattern:

```
<div ref={containerRef} className="h-[500vh]">   ← 5× viewport of scroll space
  <div className="sticky top-0 h-screen">        ← canvas stays in view
    <PadelScene scrollProgress={0..1} />
    <HeroOverlay scrollProgress={0..1} />
  </div>
</div>
```

`scrollProgress` is computed in `page.tsx` from the container's `getBoundingClientRect().top`.

### Scroll stages in `PadelRacket.tsx`

| scrollProgress | What happens |
|---|---|
| 0.00 – 0.06 | Racket scales in (0 → 1) |
| 0.06 – 0.42 | Parts **explode** outward — `easeInOutCubic` |
| 0.42 – 0.76 | Parts **reassemble** — `easeInOutCubic` reversed |
| 0.76 – 1.00 | Assembled, slow Y-spin + hover bob |

**Mouse parallax** is active during 0–0.76: group rotates with `state.mouse`.

### Snow explosion (`SnowExplosion.tsx`)

- 600 `THREE.Points` particles at origin
- Triggered once when `scrollProgress >= 0.75` (guarded by `snowRef.current`)
- Random velocities in all directions + upward bias
- Gravity applied per frame (`-4.5 * delta`)
- Material opacity fades 1 → 0 over 3 s, then live flag reset

### Racket geometry (`PadelRacket.tsx`)

The racket is built entirely from Three.js primitives — no external model:

- **Frame**: `THREE.TubeGeometry` following a closed `CatmullRomCurve3` ellipse
- **Face**: `THREE.ExtrudeGeometry` from a bezier `THREE.Shape` with oval holes
- **Handle**: `THREE.CylinderGeometry`
- **Grip band**: `THREE.CylinderGeometry` with green emissive material

The face is rendered as **4 clipped quadrants** (TL/TR/BL/BR) so each quarter can fly
independently. Requires `gl={{ localClippingEnabled: true }}` on the Canvas.

### IMPORTANT: Material spread pattern

```typescript
// ✅ Correct — spread the params object, not the material instance
const WHITE_PARAMS = { color: '...', metalness: 0.08, ... } as const
const whiteMat = new THREE.MeshPhysicalMaterial(WHITE_PARAMS)
// For variants:
new THREE.MeshPhysicalMaterial({ ...WHITE_PARAMS, clippingPlanes: [...] })
```

## Design System

- **Background**: `#080808`
- **Accent**: `#4ADE80` (Tailwind `green-400`)
- **Text**: `#ffffff` at various opacities (40%, 45%, 60%)
- **Font**: system-ui fallback (Inter if loaded)
- **Aesthetic**: Minimalist dark, generous whitespace, bold typography
- **Content max-width**: `max-w-5xl mx-auto px-6`
- **Section padding**: `py-32`

## Development Commands

```bash
npm install --legacy-peer-deps   # Always use this flag
npm run dev                      # http://localhost:3000
npm run build                    # Production build
npm run typecheck                # tsc --noEmit
```

## Key Constraints for AI Assistants

1. **Never upgrade to React 19** — breaks `@react-three/fiber` v8 peer dep
2. **Always use `--legacy-peer-deps`** for any `npm install`
3. **Canvas must have `gl={{ localClippingEnabled: true }}`** for face clipping to work
4. **`PadelScene` must be dynamically imported with `ssr: false`** — Three.js needs the browser
5. **Do not add comments** unless the "why" is non-obvious
6. **Do not install new packages** without confirming with the user
7. Run `npm run build` before considering any task done

## Content (Fake club — customize freely)

- **Club name**: SMASH CREW
- **Tagline**: "We came for the pádel. We stayed for the vibe."
- **Members**: Carlos (El Toro), Javi (Revés), Marta (Smash Queen), Pablo (Bolea), Sofía (La Pared), Andrés (Lob)
- **Stats**: 247 games, 3 rackets broken, 6 friends
