"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { getCategories } from "../services"

import { ThemeToggle } from "./theme-toggle"

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
    <div className="container mx-auto mb-8 px-10 headers">
      <div className=" w-full  py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer font-semibold text-2xl text-white">
              Blog Next
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          
              <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="ml-4 mt-2 cursor-pointer align-middle  text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
            <ThemeToggle />
          </nav>
        </div>
        </div>
     
      </div>
      
    </div>
  )
}

export default Header
