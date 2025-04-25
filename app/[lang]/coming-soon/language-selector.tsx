"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Globe } from "lucide-react"

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
]

export default function LanguageSelector({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => setIsOpen(!isOpen)

  const changeLanguage = (langCode: string) => {
    // Obtener la ruta actual y reemplazar el código de idioma
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(/^\/[^/]+/, `/${langCode}`)

    router.push(newPath)
    setIsOpen(false)
  }

  // Encontrar el nombre del idioma actual
  const currentLanguage = languages.find((lang) => lang.code === currentLang)?.name || "Español"

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-bunker-800/80 text-gold-400 hover:bg-gold-500 hover:text-bunker-950 px-3 py-2 rounded-md transition-colors duration-300"
      >
        <Globe className="w-5 h-5" />
        <span>{currentLanguage}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-bunker-800/95 backdrop-blur-sm border border-gold-500/30 rounded-md shadow-lg z-50">
          <ul>
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-gold-500/20 transition-colors duration-200 ${
                    currentLang === lang.code ? "text-gold-400 font-bold" : "text-white"
                  }`}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
