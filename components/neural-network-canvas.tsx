"use client"

import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

interface NeuralNetworkCanvasProps {
  particleCount?: number
  lineDistance?: number
  particleRadius?: number
  particleSpeed?: number
  lineColor?: string
  particleColor?: string
}

export function NeuralNetworkCanvas({
  particleCount = 60,
  lineDistance = 150, // Increased from 100 to 150 to allow more connections
  particleRadius = 4.5,
  particleSpeed = 0.1,
  lineColor = "rgba(0, 255, 255, 0.9)", // Bright cyan base color
  particleColor = "rgba(102, 217, 239, 0.8)", // Teal particle color
}: NeuralNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const dimsRef = useRef({ width: 0, height: 0 })
  const frameRef = useRef<number | null>(null)

  /* -------- Helpers -------- */
  const createParticle = (w: number, h: number): Particle => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * particleSpeed,
    vy: (Math.random() - 0.5) * particleSpeed,
    radius: particleRadius,
    color: particleColor,
  })

  const initParticles = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { width, height } = canvas.getBoundingClientRect()
    dimsRef.current = { width, height }

    canvas.width = width
    canvas.height = height

    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(width, height))
  }

  const drawFrame = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = dimsRef.current
    ctx.clearRect(0, 0, width, height)

    const particles = particlesRef.current

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]

      /* Update position */
      p1.x += p1.vx
      p1.y += p1.vy

      /* Bounce on edges */
      if (p1.x < 0 || p1.x > width) p1.vx *= -1
      if (p1.y < 0 || p1.y > height) p1.vy *= -1

      /* Draw particle */
      ctx.beginPath()
      ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
      ctx.fillStyle = p1.color
      ctx.fill()

      /* Connect to other particles */
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < lineDistance) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          // Calculate alpha based on distance, with a higher maximum opacity (0.6)
          const alpha = (1 - dist / lineDistance) * 0.6 // Increased from 0.2 to 0.6
          ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${alpha})`)
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawFrame(ctx)
    frameRef.current = requestAnimationFrame(animate)
  }

  /* -------- Lifecycle -------- */
  useEffect(() => {
    initParticles()
    frameRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      cancelAnimationFrame(frameRef.current as number)
      initParticles()
      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // empty deps → runs once

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
