'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import PadelRacket from './PadelRacket'
import SnowExplosion from './SnowExplosion'

interface PadelSceneProps {
  scrollProgress: number
  snowTriggered: boolean
}

export default function PadelScene({ scrollProgress, snowTriggered }: PadelSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ localClippingEnabled: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={2} castShadow />
        <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#a0c0ff" />
        <pointLight position={[0, 3, 3]} color="#4ADE80" intensity={3} />
        <pointLight position={[-3, -2, 1]} color="#ffffff" intensity={1} />

        <PadelRacket scrollProgress={scrollProgress} />
        <SnowExplosion triggered={snowTriggered} />

        <Environment preset="studio" background={false} />
      </Suspense>
    </Canvas>
  )
}
