import { get } from "http"
import { type } from "os"
import React from "react"
import Image from "next/image"
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
  content: {
    raw: {
      children: any
    }
  }
}

type modifiedText = {
  modifiedText: Element
}
interface PostCardProps {
  post: Post
}

const PostDetail = ({ post }: PostCardProps) => {
  const getContentFragment = (
    index: number,
    text: any,
    obj: any,
    type?: string
  ) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="mb-4 text-xl  text-primary font-semibold">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-primary ">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case "heading-four":
        return (
          <h4 key={index} className="text-md mb-4  text-primary font-semibold">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        )
      default:
        return modifiedText
    }
  }

  return (
    <div className="m-8 rounded-lg bg-background pb-12 shadow-lg border lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.title}
          height={30}
          width={30}
          className="h-full w-full rounded-t-lg object-top lg:rounded-lg"
          src={post.featuredImage.url}
        />
      </div>
      <div className="px-4 lg:px-0 ">
        <div className="mb-8 flex w-full items-center">
          <div className="mb-4 mr-8  flex w-full items-center lg:mb-0 lg:w-auto ">
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={post.author.name}
              height={30}
              width={30}
              className="rounded-full align-middle"
              src={post.author.photo.url}
            />
            <p className="ml-2 inline align-middle text-lg font-medium text-primary">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
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
            <span className="align-middle  text-primary">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        <h1 className="mb- text-3xl  text-primary font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj: any, index: number) => {
          const children = typeObj.children.map(
            (item: any, itemindex: number) =>
              getContentFragment(itemindex, item.text, item)
          )

          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail
