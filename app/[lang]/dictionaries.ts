import "server-only"

export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  coming_soon: {
    title: string
    countdown: {
      days: string
      hours: string
      minutes: string
      seconds: string
    }
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

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
}

export async function getDictionary(locale: "es" | "en" | "pt") {
  return dictionaries[locale]()
}