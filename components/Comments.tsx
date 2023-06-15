"use client"

import React, { useEffect, useState } from "react"
import { getComments } from "@/services"
import parse from "html-react-parser"
import moment from "moment"

interface Slug {
  slug: string
}

interface Comment {
  createdAt: string
  name: string
  comment: string
}

const Comments = ({ slug }: Slug) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then((result) => setComments(result))
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="mb-8 rounded-lg bg-background p-8 border pb-12 shadow-lg">
          <h3 className="mb-8 border-b pb-4 text-xl text-primary font-semibold">
            {comments.length} Comentarios
          </h3>
          {comments.map((comment: Comment) => (
            <div
              key={comment.createdAt}
              className="mb-4 border-b border-gray-100 pb-4"
            >
              <p className="mb-4 text-primary">
                <span className="font-semibold text-primary">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMMM Do YYYY")}
              </p>
              <p className="w-full whitespace-pre-line text-primary">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
