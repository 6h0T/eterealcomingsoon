import { type NextRequest, NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Lista de idiomas soportados
export const locales = ["es", "en", "pt"]
export const defaultLocale = "es"

// Lista de rutas permitidas
const validPaths = ["/coming-soon", "/mu-blog"]

// Función para obtener el idioma preferido del usuario
function getLocale(request: NextRequest) {
  // Negociador para determinar el idioma preferido basado en los headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verificar si la ruta ya incluye un locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    // Extraer el locale y el path
    const [, locale, ...rest] = pathname.split('/')
    const path = '/' + rest.join('/')
    
    // Si el path no está en la lista de rutas válidas y no es un post del blog
    if (!validPaths.some(validPath => path.startsWith(validPath)) && !path.startsWith('/mu-blog/')) {
      // Redirigir a coming-soon
      return NextResponse.redirect(new URL(`/${locale}/coming-soon`, request.url))
    }
    return
  }

  // Redirigir a la ruta con el locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}/coming-soon`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.mp4$).*)",
  ],
}
