import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMASH CREW — We Ball Different',
  description: 'El equipo de pádel más épico de la ciudad. Amigos, smashes y buenas vibras.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
