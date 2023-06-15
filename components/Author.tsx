import React from "react"
import Image from "next/image"
import { grpahCMSImageLoader } from "@/utils"

interface Author {
  bio: string
  name: string
  id: string
  photo: {
    url: string
  }
}

interface AuthorProps {
  author: Author
}

const Author = ({ author }: AuthorProps) => {
  return (
    <div className="relative mb-8 mt-20 rounded-lg bg-black bg-opacity-20 p-12 text-center">
      <div className="absolute -top-14 left-0 right-0 flex w-full justify-center">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={author.name}
          height={100}
          width={100}
          className="rounded-full align-middle"
          src={author.photo.url}
        />
      </div>
      <h3 className="mb-4 mt-4 text-xl font-bold text-white">{author.name}</h3>
      <p className="text-ls text-white">{author.bio}</p>
    </div>
  )
}

export default Author
