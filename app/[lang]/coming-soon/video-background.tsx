"use client"

import { useEffect, useRef } from "react"

export default function VideoBackground({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error al reproducir el video automáticamente:", error)
      })
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden">
      <video ref={videoRef} className="absolute min-w-full min-h-full object-cover" autoPlay loop muted playsInline>
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    </div>
  )
}
