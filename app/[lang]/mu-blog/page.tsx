import Link from "next/link"
import { getDictionary } from "../dictionaries"
import type { Metadata } from "next"
import { getBlogPosts } from "./blog-data"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as "es" | "en" | "pt")

  return {
    title: `MU Online Blog - EterealConquest`,
    description: dict.blog.meta_description,
  }
}

export default async function BlogIndexPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as "es" | "en" | "pt")
  const posts = await getBlogPosts(params.lang as "es" | "en" | "pt")

  return (
    <div className="min-h-screen bg-bunker-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-trade-winds text-gold-400 mb-8">{dict.blog.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-bunker-900 border border-gold-500/20 rounded-lg overflow-hidden hover:border-gold-500/50 transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gold-300">
                  <Link href={`/${params.lang}/mu-blog/${post.slug}`} className="hover:text-gold-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-bunker-300 mb-4">{post.meta}</p>
                <Link
                  href={`/${params.lang}/mu-blog/${post.slug}`}
                  className="inline-block bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 px-4 py-2 rounded transition-colors"
                >
                  {dict.blog.read_more}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${params.lang}/coming-soon`} className="text-bunker-400 hover:text-gold-400 transition-colors">
            ← {dict.blog.back_to_home}
          </Link>
        </div>
      </div>
    </div>
  )
}
