import type { Locale } from '@/config/i18n'

// Tipos para nuestras traducciones
export interface Translations {
  metadata: {
    title: string
    description: string
  }
  coming_soon: {
    title: string
    social: {
      follow: string
    }
    footer: {
      rights: string
    }
  }
  blog: {
    title: string
    meta_description: string
    read_more: string
    back_to_blog: string
    back_to_home: string
  }
}

// Función para cargar las traducciones
export async function getTranslations(locale: Locale) {
  return (await import(`@/locales/${locale}.json`)).default as Translations
} 