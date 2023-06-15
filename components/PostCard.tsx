"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import moment from "moment"

import { grpahCMSImageLoader } from "../utils"

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

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => (
  <div className="mb-8 rounded-lg bg-background border p-0 pb-12 shadow-xl lg:p-8">
    {/* <div className="relative shadow-md inline-block w-full h-60 lg:h-80 mb-6">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={post.title}
        className="shadow-lg rounded-t-lg lg:rounded-lg"
        layout="fill"
        src={post.featuredImage.url}
      />
    </div> */}
    <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
      <img
        src={post.node.featuredImage.url}
        alt=""
        className="absolute h-80 w-full rounded-t-lg object-cover  object-top shadow-lg lg:rounded-lg"
      />
    </div>

    <h1 className="mb-8 cursor-pointer text-center text-3xl font-semibold text-primary transition duration-700 hover:text-pink-600">
      <Link href={`/post/${post.node.slug}`}>{post.node.title}</Link>
    </h1>
    <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
      <div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto ">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.node.author.name}
          height={30}
          width={30}
          className="rounded-full align-middle"
          src={post.node.author.photo.url}
        />
        <p className="ml-2 inline align-middle text-lg font-medium text-primary">
          {post.node.author.name}
        </p>
      </div>
      <div className="font-medium text-foreground ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 inline h-6 w-6 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="align-middle text-primary">
          {moment(post.node.createdAt).format("MMM DD, YYYY")}
        </span>
      </div>
    </div>
    <p className="mb-8 px-4 text-center text-lg font-normal text-primary lg:px-20">
      {post.node.excerpt}
    </p>
    <div className="text-center">
      <Link href={`/post/${post.node.slug}`}>
      <button className="pushable">
  <span className="shadow"></span>
  <span className="edge"></span>
  <span className="front">
    Continuar leyendo
  </span>
</button>
      </Link>
    </div>
  </div>
)

export default PostCard
