import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const LINK_DIST = 130
    const MOUSE_DIST = 170

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    const mouse = { x: 0, y: 0, active: false }

    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    const seedParticles = () => {
      const count = Math.max(45, Math.min(120, Math.floor((width * height) / 13000)))
      particles = Array.from({ length: count }, () => ({

        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.28, 0.28),
        vy: rand(-0.28, 0.28),
        r: rand(0.7, 1.9),
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.fillStyle = '#020617'
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x <= 0 || p.x >= width) p.vx *= -1
          if (p.y <= 0 || p.y >= height) p.vy *= -1
          p.x = Math.max(0, Math.min(width, p.x))
          p.y = Math.max(0, Math.min(height, p.y))
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        if (mouse.active) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.4
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(203, 231, 217, 0.75)'
        ctx.fill()
      }
    }

    let raf = 0
    const loop = () => {
      draw()
      raf = window.requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onMouseLeave = () => {
      mouse.active = false
    }
    const onResize = () => {
      resize()
      seedParticles()
    }

    const refresh = () => {
      resize()
      if (reduceMotion) draw()
    }

    resize()
    seedParticles()

    if (reduceMotion) {
      draw()
    } else {
      loop()
    }

    const rafRefresh = window.requestAnimationFrame(refresh)
    const onVisible = () => {
      if (!document.hidden) refresh()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('load', refresh)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.cancelAnimationFrame(raf)
      window.cancelAnimationFrame(rafRefresh)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', refresh)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -2, transform: 'translateZ(0)' }}
    />
  )
}
