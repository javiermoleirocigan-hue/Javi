# CLAUDE.md — Javi Project

## Project Overview

Landing page built with **Next.js + TypeScript**. Design is minimalist and modern.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Package manager**: npm

## Directory Structure

```
/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout (fonts, metadata)
│   ├── page.tsx          # Home / landing page
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   ├── ui/               # Primitive components (Button, Card, etc.)
│   └── sections/         # Page sections (Hero, Features, etc.)
├── lib/                  # Utility functions and helpers
├── public/               # Static assets (images, icons, fonts)
├── types/                # Shared TypeScript type definitions
├── CLAUDE.md             # This file
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Development Workflow

### Setup
```bash
npm install
npm run dev       # Start dev server at http://localhost:3000
```

### Common commands
```bash
npm run build     # Production build
npm run lint      # ESLint check
npm run typecheck # tsc --noEmit
```

### Branch strategy
- Work on feature branches: `feature/<name>` or `fix/<name>`
- Main branch: `main`
- Never push directly to `main`

## Code Conventions

### TypeScript
- Always use explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `const` by default; `let` only when reassignment is needed
- No `any` — use `unknown` and narrow properly

### React / Next.js
- Use Server Components by default; add `"use client"` only when needed (interactivity, hooks)
- Co-locate component styles with the component file using Tailwind classes
- One component per file; filename matches the exported component name (PascalCase)
- Keep pages thin — logic lives in components or `lib/`

### Styling (Tailwind)
- Mobile-first responsive design (`sm:`, `md:`, `lg:`)
- Design tokens (colors, spacing, font sizes) configured in `tailwind.config.ts`
- No inline `style={{}}` unless absolutely necessary

### File naming
- Components: `PascalCase.tsx` (e.g. `HeroSection.tsx`)
- Utilities / helpers: `camelCase.ts` (e.g. `formatDate.ts`)
- Pages: `page.tsx` inside the route folder

## Design System

### Visual style
- **Aesthetic**: Minimalist, modern, clean
- **Whitespace**: Generous — let content breathe
- **Typography**: Single font family, clear hierarchy (display → heading → body → caption)
- **Color palette**: Neutral base with one accent color; avoid visual noise

### Component patterns
- Buttons have clear primary/secondary/ghost variants
- Sections have consistent vertical padding (`py-16 md:py-24`)
- Max content width: `max-w-6xl mx-auto px-4`

## Landing Page Sections

Define and build sections here as the project grows. Typical structure:

1. **Hero** — headline, subheadline, CTA button
2. **Features / Benefits** — 3–4 key value propositions
3. **Social proof** — testimonials or logos (if applicable)
4. **CTA** — final call to action
5. **Footer** — links, copyright

## Environment Variables

```
# .env.local (never commit this file)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## AI Assistant Guidelines

- Follow the conventions above strictly — no deviations without asking
- Do not add dependencies without confirming with the user
- Prefer editing existing files over creating new ones
- Keep components small and focused (single responsibility)
- Run `npm run lint` and `npm run typecheck` before considering a task done
- Do not add comments unless the "why" is non-obvious
- Do not generate placeholder lorem ipsum content in production code — ask for real copy
