import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getDictionary } from "../../dictionaries"
import type { Metadata } from "next"
import { getBlogPost, getBlogPosts } from "../blog-data"

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.lang as "es" | "en" | "pt", params.slug)

  if (!post) {
    return {
      title: "Post not found",
    }
  }

  return {
    title: `${post.title} - EterealConquest`,
    description: post.meta,
  }
}

export async function generateStaticParams({
  params,
}: {
  params: { lang: string }
}) {
  const posts = await getBlogPosts(params.lang as "es" | "en" | "pt")

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const dict = await getDictionary(params.lang as "es" | "en" | "pt")
  const post = await getBlogPost(params.lang as "es" | "en" | "pt", params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bunker-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article>
          <h1 className="text-3xl md:text-4xl font-trade-winds text-gold-400 mb-6">{post.title}</h1>

          {post.image && (
            <div className="mb-8 relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <div className="prose prose-invert prose-gold max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-bunker-200 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-bunker-800">
            <div className="flex justify-between items-center">
              <Link href={`/${params.lang}/mu-blog`} className="text-bunker-400 hover:text-gold-400 transition-colors">
                ← {dict.blog.back_to_blog}
              </Link>

              <Link
                href={`/${params.lang}/coming-soon`}
                className="text-bunker-400 hover:text-gold-400 transition-colors"
              >
                {dict.blog.back_to_home} →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
