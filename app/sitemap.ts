import type { MetadataRoute } from "next"
import { locales } from "@/middleware"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eterealconquest.com"

  // Rutas principales
  const mainRoutes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/coming-soon`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === "es" ? 1 : 0.9,
  }))

  // Rutas del blog
  const blogSlugs = [
    "builds-mg-s6e3",
    "drops-mapas-mu",
    "como-hacer-reset-mu",
    "guia-eventos-mu-online",
    "spot-xp-mu-season6",
  ]

  const blogRoutes = locales.flatMap((locale) => {
    // Índice del blog
    const blogIndex = {
      url: `${baseUrl}/${locale}/mu-blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }

    // Artículos individuales
    const blogPosts = blogSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/mu-blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [blogIndex, ...blogPosts]
  })

  return [...mainRoutes, ...blogRoutes]
}
