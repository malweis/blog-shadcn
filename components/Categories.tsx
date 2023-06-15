"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getCategories } from "@/services"

type category = {
  slug: string
  name: string
}

export const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((res) => setCategories(res))
  }, [])
  return (
    <div className="mb-8 rounded-lg bg-background p-8  border shadow-lg">
      <h3 className="mb-8 border-b border-accent pb-4 text-xl  text-primary font-semibold">Categorias</h3>
      {categories.map((category: category) => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <span className="mb-3 block  text-primary cursor-pointer pb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
