"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function FloatingLogo() {
  const [position, setPosition] = useState({ y: 0 })

  useEffect(() => {
    // Efecto de flotación suave
    const floatAnimation = () => {
      const time = Date.now() / 1000
      // Movimiento suave de arriba a abajo (8px de desplazamiento)
      const newY = Math.sin(time) * 8
      setPosition({ y: newY })
    }

    // Ejecutar la animación en cada frame
    const animationFrame = requestAnimationFrame(function animate() {
      floatAnimation()
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div
      className="relative"
      style={{
        transform: `translateY(${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <Image
        src="/logo-oficial.png"
        alt="EterealConquest Logo"
        width={576}
        height={576}
        className="drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
        priority
      />
    </div>
  )
}
