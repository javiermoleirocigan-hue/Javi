'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SNOW_COUNT = 600

export default function SnowExplosion({ triggered }: { triggered: boolean }) {
  const meshRef = useRef<THREE.Points>(null)
  const velocities = useRef(new Float32Array(SNOW_COUNT * 3))
  const triggerTime = useRef<number | null>(null)
  const isLive = useRef(false)

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(SNOW_COUNT * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.07,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      depthWrite: false,
    })

    return { geometry: geo, material: mat }
  }, [])

  useEffect(() => {
    if (!triggered || isLive.current) return
    isLive.current = true

    const positions = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < SNOW_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 1.5 + Math.random() * 5
      velocities.current[i * 3]     = Math.sin(phi) * Math.cos(theta) * speed
      velocities.current[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed + 1.5
      velocities.current[i * 3 + 2] = Math.cos(phi) * speed * 0.5
      positions[i * 3]     = (Math.random() - 0.5) * 0.3
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    geometry.attributes.position.needsUpdate = true
    material.opacity = 1
  }, [triggered, geometry, material])

  useFrame((state, delta) => {
    if (!isLive.current || !meshRef.current) return

    if (triggerTime.current === null) {
      triggerTime.current = state.clock.elapsedTime
    }

    const elapsed = state.clock.elapsedTime - triggerTime.current
    const positions = geometry.attributes.position.array as Float32Array

    for (let i = 0; i < SNOW_COUNT; i++) {
      velocities.current[i * 3 + 1] -= 4.5 * delta
      positions[i * 3]     += velocities.current[i * 3]     * delta
      positions[i * 3 + 1] += velocities.current[i * 3 + 1] * delta
      positions[i * 3 + 2] += velocities.current[i * 3 + 2] * delta
    }
    geometry.attributes.position.needsUpdate = true

    // Fade out over 3 seconds
    material.opacity = Math.max(0, 1 - elapsed / 3)

    if (elapsed > 3.5) {
      isLive.current = false
    }
  })

  return <points ref={meshRef} geometry={geometry} material={material} />
}
