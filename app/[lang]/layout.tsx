import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Rowdies, Trade_Winds } from "next/font/google"
import { cn } from "@/lib/utils"
import { locales } from "@/middleware"
import { getDictionary } from "./dictionaries"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as "es" | "en" | "pt")

  return {
    title: `ETEREALCONQUEST | MU SEASON 6 EP 3`,
    description: dict.metadata.description,
    openGraph: {
      title: `ETEREALCONQUEST | MU SEASON 6 EP 3`,
      description: dict.metadata.description,
      url: "https://eterealconquest.com",
      siteName: "EterealConquest",
      images: [
        {
          url: "/logo-oficial.png",
          width: 576,
          height: 576,
          alt: "EterealConquest Logo",
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `ETEREALCONQUEST | MU SEASON 6 EP 3`,
      description: dict.metadata.description,
      images: ["/logo-oficial.png"],
    },
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Validar que el idioma sea uno de los permitidos
  const validLang = locales.includes(params.lang) ? params.lang : "es"
  
  return (
    <html lang={validLang}>
      <body className={cn(
        "min-h-screen antialiased",
        rowdies.variable,
        tradeWinds.variable
      )}>
        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
