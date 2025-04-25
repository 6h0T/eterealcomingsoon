import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bunker-950 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-trade-winds text-gold-400 mb-4">404</h1>
        <h2 className="text-2xl mb-6">Página no encontrada</h2>
        <p className="text-bunker-300 mb-8">La página que estás buscando no existe o ha sido movida.</p>
        <Link
          href="/"
          className="inline-block bg-gold-500 hover:bg-gold-600 text-bunker-950 font-bold py-2 px-6 rounded-md transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
