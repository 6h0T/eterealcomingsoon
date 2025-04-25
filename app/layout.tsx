import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Rowdies, Trade_Winds } from "next/font/google"
import { cn } from "@/lib/utils"

// Fuentes
const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-rowdies",
})

const tradeWinds = Trade_Winds({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-trade-winds",
})

export const metadata: Metadata = {
  title: "EterealConquest - Próximamente",
  description: "Una nueva era de Mu Online está por comenzar. Prepárate para la aventura.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={cn("min-h-screen antialiased", rowdies.variable, tradeWinds.variable)}>{children}</body>
    </html>
  )
}
