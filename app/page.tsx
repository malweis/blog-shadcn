import Link from "next/link"
import { Categories, PostCard, PostWidget } from "@/components"
import { FeaturedPosts } from "@/sections"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

import { getPosts } from "../services"

interface Post {
  cursor: string
  node: {
    author: {
      bio: string
      name: string
      id: string
      photo: {
        url: string
      }
    }
    createdAt: string
    slug: string
    title: string
    excerpt: string
    featuredImage: {
      url: string
    }
    categories: {
      name: string
      slug: string
    }[]
  }
}

export default async function IndexPage() {
  const post = await getPosteos()
  return (
    <section className="container mx-auto mb-8 px-10 ">
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {post.map((post: Post) => (
            <PostCard key={post.node.title} post={post} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </section>
  )
}

// `app` directory

// This function can be named anything
async function getPosteos() {
  const res = (await await getPosts()) || []
  const post = res

  return post
}
