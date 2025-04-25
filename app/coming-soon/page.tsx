import type React from "react"
import Link from "next/link"
import { Facebook, Instagram, DiscIcon as Discord } from "lucide-react"
import CountdownTimer from "./countdown-timer"
import VideoBackground from "./video-background"
import FloatingLogo from "./floating-logo"

export default function ComingSoonPage() {
  // Calcular la fecha objetivo (7 días a partir de ahora)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)
  const targetDateString = targetDate.toISOString()

  return (
    <div className="h-screen flex flex-col items-center justify-between relative overflow-hidden text-white p-4">
      {/* Video Background */}
      <VideoBackground videoUrl="/0410.mp4" />

      {/* Overlay para mejorar la legibilidad del contenido */}
      <div className="absolute inset-0 bg-bunker-950/70 z-0"></div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-between z-10 relative h-full py-6">
        {/* Sección superior vacía para equilibrar */}
        <div className="w-full"></div>

        {/* Logo Flotante (centrado en la pantalla) */}
        <div className="flex items-center justify-center">
          <FloatingLogo />
        </div>

        {/* Sección inferior con próximamente, timer y redes sociales */}
        <div className="w-full flex flex-col items-center space-y-6">
          {/* Próximamente */}
          <h2 className="font-trade-winds text-2xl md:text-3xl text-gold-400 text-center tracking-wider">
            PRÓXIMAMENTE
          </h2>

          {/* Countdown Timer */}
          <div className="w-full max-w-2xl">
            <CountdownTimer targetDate={targetDateString} />
          </div>

          {/* Social Media Links */}
          <div className="pt-4 w-full">
            <h3 className="text-center text-gold-300 mb-3 font-trade-winds text-sm md:text-base">
              Seguinos para enterarte de más
            </h3>
            <div className="flex justify-center gap-5 flex-wrap">
              <SocialLink
                href="https://www.facebook.com/eterealconquest"
                icon={<Facebook className="w-7 h-7" />}
                label="Facebook"
              />
              <SocialLink
                href="https://www.instagram.com/eterealconquest.mu/"
                icon={<Instagram className="w-7 h-7" />}
                label="Instagram"
              />
              <SocialLink href="https://discord.gg/2pF7h7uvRU" icon={<Discord className="w-7 h-7" />} label="Discord" />
            </div>
          </div>

          {/* Footer */}
          <footer className="text-bunker-200 text-xs">
            &copy; {new Date().getFullYear()} EterealConquest - Todos los derechos reservados
            <span className="mx-2">•</span>
            <Link href="/mu-blog" className="hover:text-gold-400 transition-colors">
              Blog
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}

// Social Link Component
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-full bg-bunker-800/80 text-gold-400 hover:bg-gold-500 hover:text-bunker-950 transition-all duration-300 group"
      aria-label={label}
      style={{ width: "3.75rem", height: "3.75rem" }} // Equivalente a w-15 h-15
    >
      <span className="transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
    </Link>
  )
}
