import { redirect } from 'next/navigation'
import { defaultLocale } from '@/middleware'

// Redirigir la ruta raíz al idioma predeterminado
export default async function Home() {
  redirect(`/${defaultLocale}/coming-soon`)
}
