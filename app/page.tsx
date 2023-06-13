import Link from "next/link"
import { PostWidget, Postcard, Categories } from "@/components"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

const post = [
  { title: "React Testing", excerpt: "Learn React Testing" },
  { title: "React with tailwind", excerpt: "Learn React with tailwind" },
]

export default function IndexPage() {
  return (
    <section className="container mx-auto px-10 mb-8 bg-gray-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {post.map((post, index) => (
            <div>
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8"></div>
        </div>
      </div>
    </section>
  )
}
