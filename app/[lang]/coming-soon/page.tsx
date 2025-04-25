import type React from "react"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { FaDiscord } from "react-icons/fa"
import VideoBackground from "./video-background"
import FloatingLogo from "./floating-logo"
import LanguageSelector from "./language-selector"
import { getDictionary, type Dictionary } from "../dictionaries"

export default async function ComingSoonPage({
  params,
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as "es" | "en" | "pt") as Dictionary

  return (
    <div className="h-screen flex flex-col items-center justify-between relative overflow-hidden text-white p-4">
      {/* Video Background */}
      <VideoBackground videoUrl="/0410.mp4" />

      {/* Overlay para mejorar la legibilidad del contenido */}
      <div className="absolute inset-0 bg-bunker-950/70 z-0"></div>

      {/* Selector de idioma (esquina superior derecha) */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector currentLang={params.lang} />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10 relative h-full">
        {/* Espacio superior flexible */}
        <div className="flex-1" />

        {/* Contenedor central con título y logo */}
        <div className="flex flex-col items-center">
          {/* Encabezado "Próximamente en Mayo" */}
          <h2 className="font-trade-winds text-2xl md:text-3xl text-gold-400 text-center tracking-wider mb-4">
            {dict.coming_soon.title}
          </h2>

          {/* Logo Flotante */}
          <div>
            <FloatingLogo />
          </div>
        </div>

        {/* Espacio flexible más pequeño */}
        <div className="flex-[0.5]" />

        {/* Social Media Links */}
        <div className="w-full text-center mb-8">
          <h3 className="text-center text-gold-300 mb-3 font-trade-winds text-sm md:text-base">
            {dict.coming_soon.social.follow}
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
            <SocialLink 
              href="https://discord.gg/2pF7h7uvRU" 
              icon={<FaDiscord className="w-7 h-7" />} 
              label="Discord" 
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-bunker-200 text-xs">
          &copy; {new Date().getFullYear()} EterealConquest - {dict.coming_soon.footer.rights}
          <span className="mx-2">•</span>
          <Link href={`/${params.lang}/mu-blog`} className="hover:text-gold-400 transition-colors">
            Blog
          </Link>
        </footer>
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
      style={{ width: "3.75rem", height: "3.75rem" }}
    >
      <span className="transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
    </Link>
  )
}
