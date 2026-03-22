import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useProgress } from '../hooks/useProgress'
import * as THREE from 'three'

function FloatingDodecahedron() {
  const meshRef = useRef()
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 200 }) {
  const mesh = useRef()
  const colors = useMemo(() => ['#ff4d6d', '#ffaa2c', '#4da6ff', '#6b6b82'], [])

  const [positions, particleColors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorObjs = colors.map(c => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 2 + Math.random() * 2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = colorObjs[i % colorObjs.length]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count, colors])

  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.elapsedTime * 0.15
      const posAttr = mesh.current.geometry.attributes.position
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]
        const z = positions[i3 + 2]
        const angle = t + i * 0.01
        posAttr.array[i3] = x * Math.cos(angle) - z * Math.sin(angle)
        posAttr.array[i3 + 1] = y + Math.sin(t + i * 0.05) * 0.1
        posAttr.array[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle)
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.slice()} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particleColors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <FloatingDodecahedron />
      <ParticleField count={200} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function Hero() {
  const { count } = useProgress()
  const [showCanvas, setShowCanvas] = useState(true)
  const pct = Math.round((count / 60) * 100)

  const scrollToSections = () => {
    document.getElementById('sections-start')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="max-w-[960px] mx-auto px-5 pt-16 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left side */}
        <div className="flex-1 text-center md:text-left">
          <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
            // python mastery roadmap
          </p>
          <h1
            className="font-display font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--text-primary)' }}
          >
            Python Mastery
          </h1>
          <p className="font-mono text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            60 topics · 15 sections · built different 🐍
          </p>
          <div className="flex gap-3 justify-center md:justify-start mt-4 flex-wrap">
            <span
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              10 topics loaded
            </span>
            <span
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
            >
              your progress: {pct}%
            </span>
          </div>
          <button
            onClick={scrollToSections}
            className="mt-6 font-mono text-sm px-6 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
            }}
          >
            start learning ↓
          </button>
        </div>

        {/* Right side — Three.js canvas (hidden on mobile) */}
        <div className="hidden md:block w-[320px] h-[320px] relative">
          {showCanvas && (
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              onCreated={() => {}}
              style={{ borderRadius: '12px' }}
              onError={() => setShowCanvas(false)}
            >
              <Scene />
            </Canvas>
          )}
        </div>

        {/* Mobile fallback blob */}
        <div className="md:hidden w-40 h-40 rounded-full animate-pulse" style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          opacity: 0.3,
        }} />
      </div>
    </div>
  )
}
