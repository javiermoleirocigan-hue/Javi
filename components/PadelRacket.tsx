'use client'

import { useRef, useMemo, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  scrollProgress: number
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// Exploded target positions for each piece
const EXPLODED: Record<string, { pos: [number, number, number]; rot: [number, number, number] }> = {
  frame:  { pos: [3.2,  1.8, -0.8], rot: [0.2,  0.9,  0.4] },
  handle: { pos: [0.5, -4.0,  1.2], rot: [0.5,  0.1,  0.3] },
  faceTL: { pos: [-2.8,  2.8,  1.6], rot: [0.4, -0.6,  0.5] },
  faceTR: { pos: [ 2.8,  2.8, -1.4], rot: [-0.3,  0.7, -0.4] },
  faceBL: { pos: [-2.6, -2.2, -1.8], rot: [0.6,  0.4, -0.3] },
  faceBR: { pos: [ 2.6, -2.2,  1.4], rot: [-0.5, -0.3,  0.6] },
}

const ASSEMBLED: Record<string, { pos: [number, number, number]; rot: [number, number, number] }> = {
  frame:  { pos: [0, 0.05, 0],   rot: [0, 0, 0] },
  handle: { pos: [0, -1.42, 0],  rot: [0, 0, 0] },
  faceTL: { pos: [0, 0, 0.02],   rot: [0, 0, 0] },
  faceTR: { pos: [0, 0, 0.02],   rot: [0, 0, 0] },
  faceBL: { pos: [0, 0, 0.02],   rot: [0, 0, 0] },
  faceBR: { pos: [0, 0, 0.02],   rot: [0, 0, 0] },
}

function createRacketFaceShape(): THREE.Shape {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.88)
  shape.bezierCurveTo(0.58, 0.88, 0.63, 0.42, 0.63, 0)
  shape.bezierCurveTo(0.63, -0.38, 0.48, -0.60, 0, -0.66)
  shape.bezierCurveTo(-0.48, -0.60, -0.63, -0.38, -0.63, 0)
  shape.bezierCurveTo(-0.63, 0.42, -0.58, 0.88, 0, 0.88)

  for (let row = -2; row <= 3; row++) {
    const offset = row % 2 === 0 ? 0 : 0.1
    for (let col = -2; col <= 2; col++) {
      const x = col * 0.22 + offset
      const y = row * 0.2 + 0.08
      const nx = x / 0.52
      const ny = (y - 0.1) / 0.72
      if (nx * nx + ny * ny < 0.88) {
        const hole = new THREE.Path()
        hole.absarc(x, y, 0.065, 0, Math.PI * 2, false)
        shape.holes.push(hole)
      }
    }
  }
  return shape
}

function createFrameGeometry(): THREE.TubeGeometry {
  const pts = []
  for (let i = 0; i <= 80; i++) {
    const a = (i / 80) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * 0.66, Math.sin(a) * 0.9 + 0.05, 0))
  }
  const curve = new THREE.CatmullRomCurve3(pts, true)
  return new THREE.TubeGeometry(curve, 80, 0.042, 8, true)
}

function lerp3(
  mesh: THREE.Object3D,
  key: string,
  t: number,
) {
  const a = ASSEMBLED[key]
  const e = EXPLODED[key]
  mesh.position.set(
    a.pos[0] + (e.pos[0] - a.pos[0]) * t,
    a.pos[1] + (e.pos[1] - a.pos[1]) * t,
    a.pos[2] + (e.pos[2] - a.pos[2]) * t,
  )
  mesh.rotation.set(
    a.rot[0] + (e.rot[0] - a.rot[0]) * t,
    a.rot[1] + (e.rot[1] - a.rot[1]) * t,
    a.rot[2] + (e.rot[2] - a.rot[2]) * t,
  )
}

const WHITE_PARAMS = {
  color: '#F2F2F8',
  metalness: 0.08,
  roughness: 0.18,
  clearcoat: 0.6,
  clearcoatRoughness: 0.1,
} as const

const whiteMat = new THREE.MeshPhysicalMaterial(WHITE_PARAMS)

const handleMat = new THREE.MeshPhysicalMaterial({
  color: '#111111',
  metalness: 0.6,
  roughness: 0.3,
})

const gripMat = new THREE.MeshPhysicalMaterial({
  color: '#4ADE80',
  metalness: 0.3,
  roughness: 0.2,
  emissive: '#4ADE80',
  emissiveIntensity: 0.5,
})

export default function PadelRacket({ scrollProgress: s }: Props) {
  const groupRef = useRef<THREE.Group>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const handleRef = useRef<THREE.Mesh>(null)
  const faceTLRef = useRef<THREE.Mesh>(null)
  const faceTRRef = useRef<THREE.Mesh>(null)
  const faceBLRef = useRef<THREE.Mesh>(null)
  const faceBRRef = useRef<THREE.Mesh>(null)

  const { frameGeom, faceGeom, handleGeom, gripGeom, faceMats } = useMemo(() => {
    const faceShape = createRacketFaceShape()
    return {
      frameGeom: createFrameGeometry(),
      faceGeom: new THREE.ExtrudeGeometry(faceShape, {
        depth: 0.05,
        bevelEnabled: true,
        bevelSize: 0.012,
        bevelThickness: 0.012,
        bevelSegments: 2,
      }),
      handleGeom: new THREE.CylinderGeometry(0.1, 0.086, 0.76, 14),
      gripGeom: new THREE.CylinderGeometry(0.112, 0.112, 0.32, 14),
      faceMats: [
        // TL: x<0, y>0
        new THREE.MeshPhysicalMaterial({
          ...WHITE_PARAMS,
          clippingPlanes: [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
          ],
        }),
        // TR: x>0, y>0
        new THREE.MeshPhysicalMaterial({
          ...WHITE_PARAMS,
          clippingPlanes: [
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
          ],
        }),
        // BL: x<0, y<0
        new THREE.MeshPhysicalMaterial({
          ...WHITE_PARAMS,
          clippingPlanes: [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
          ],
        }),
        // BR: x>0, y<0
        new THREE.MeshPhysicalMaterial({
          ...WHITE_PARAMS,
          clippingPlanes: [
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
          ],
        }),
      ],
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Compute explode progress 0→1→0
    let explodeT = 0
    let scale = 1

    if (s < 0.06) {
      // Fade in
      scale = easeInOut(s / 0.06)
      explodeT = 0
    } else if (s < 0.42) {
      // Exploding
      scale = 1
      explodeT = easeInOut((s - 0.06) / 0.36)
    } else if (s < 0.76) {
      // Reassembling
      scale = 1
      explodeT = 1 - easeInOut((s - 0.42) / 0.34)
    } else {
      // Assembled — slow spin + hover
      scale = 1
      explodeT = 0
      groupRef.current.rotation.y = time * 0.4
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.06
    }

    groupRef.current.scale.setScalar(scale)

    if (s < 0.76) {
      // Mouse parallax when not spinning
      groupRef.current.rotation.x = state.mouse.y * 0.12
      groupRef.current.rotation.y = state.mouse.x * 0.15
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.04
    }

    // Animate each part
    const parts: { ref: RefObject<THREE.Object3D | null>; key: string }[] = [
      { ref: frameRef, key: 'frame' },
      { ref: handleRef, key: 'handle' },
      { ref: faceTLRef, key: 'faceTL' },
      { ref: faceTRRef, key: 'faceTR' },
      { ref: faceBLRef, key: 'faceBL' },
      { ref: faceBRRef, key: 'faceBR' },
    ]

    for (const { ref, key } of parts) {
      if (ref.current) lerp3(ref.current, key, explodeT)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Oval frame */}
      <mesh ref={frameRef} geometry={frameGeom} material={whiteMat} castShadow />

      {/* Handle */}
      <mesh ref={handleRef} geometry={handleGeom} material={handleMat} castShadow position={ASSEMBLED.handle.pos} />
      <mesh geometry={gripGeom} material={gripMat} position={[0, -1.18, 0]} />

      {/* Face quadrants */}
      <mesh ref={faceTLRef} geometry={faceGeom} material={faceMats[0]} position={ASSEMBLED.faceTL.pos} />
      <mesh ref={faceTRRef} geometry={faceGeom} material={faceMats[1]} position={ASSEMBLED.faceTR.pos} />
      <mesh ref={faceBLRef} geometry={faceGeom} material={faceMats[2]} position={ASSEMBLED.faceBL.pos} />
      <mesh ref={faceBRRef} geometry={faceGeom} material={faceMats[3]} position={ASSEMBLED.faceBR.pos} />
    </group>
  )
}
