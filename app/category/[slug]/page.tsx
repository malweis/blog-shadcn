import React from "react"
import { useRouter } from "next/navigation"

import Loader from "@/components/Loader"

import { Categories, PostCard } from "../../../components"
import { getCategories, getCategoryPost } from "../../../services"

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

interface category{

    name: string
    slug: string
 
}

interface parametros {
  params: {
    slug: string
  }
}



export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((categories :category) => ({
    slug: categories.slug,
  }))
}

export default async function Page({ params }: parametros) {
  const post = await getPostos(params.slug)

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {post.map((post: Post, index: number) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

// Fetch data at build time

async function getPostos(slug: string) {
  const res = ( await getCategoryPost(slug)) || []
  const post = res

  return post
}
