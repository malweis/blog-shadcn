"use client"

import React from "react"
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "@/components"
import { getPostDetails, getPosts } from "@/services"

import Loader from "@/components/Loader"

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

interface parametros {
  params: {
    slug: string
  }
}

type category = {
  slug: string
  name: string
}


export async function generateStaticParams() {
  return [<Loader />]
}

export default async function Page({ params }: parametros) {
  const post = await getPosteos(params.slug)

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map(
                (category: category) => category.slug
              )}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

async function getPosteos(slug: string) {
  const res = ( await getPostDetails(slug)) || []
  const post = res

  return post
}
