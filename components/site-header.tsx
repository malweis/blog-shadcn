"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { getCategories } from "../services"

interface Category {
  name: string
  slug: string
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="inline-block w-full  py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-light text-black">
              Blog Next
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="ml-4 mt-2 cursor-pointer align-middle  text-black md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
