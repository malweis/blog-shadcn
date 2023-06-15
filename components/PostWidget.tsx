"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getRecentPosts, getSimilarPosts } from "@/services"
import moment from "moment"

import { grpahCMSImageLoader } from "../utils"

interface Post {
  cursor: string

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

type PostWidgetProps = {
  slug?: string
  categories?: string
}

const PostWidget = ({ slug, categories }: PostWidgetProps) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res))
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res))
    }
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? "Post Relacionados" : "Posts Recientes"}
      </h3>
      {relatedPosts.map((post: Post) => (
        <div key={post.title} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={post.title}
              height={60}
              width={60}
              className="rounded-full align-middle"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flew-grow ml-4">
            <p className="font-xs text-gray-500">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
