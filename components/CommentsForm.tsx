import React, { ChangeEvent, useEffect, useState } from "react"

import { submitComment } from "../services"

interface Slug {
  slug: string
}

interface CommentResponse {
  createComment: any

  // Other properties if applicable
}

interface FormData {
  name: string | null
  email: string | null
  comment: string | null
  storeData: boolean
}

const CommentsForm = ({ slug }: Slug) => {
  const [error, setError] = useState<boolean>(false)
  const [localStorage, setLocalStorage] = useState<Storage | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  })

  useEffect(() => {
    setLocalStorage(window.localStorage)
    const initialFormData: FormData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      storeData: !!(
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email")
      ),
      comment: null,
    }
    setFormData(initialFormData)
  }, [])

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement // Explicitly type target as HTMLInputElement
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }))
    }
  }

  const handlePostSubmission = () => {
    setError(false)
    const { name, email, comment, storeData } = formData
    if (!name || !email || !comment) {
      setError(true)
      return
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      localStorage?.setItem("name", name)
      localStorage?.setItem("email", email)
    } else {
      localStorage?.removeItem("name")
      localStorage?.removeItem("email")
    }
    console.log(commentObj)
    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = ""
          formData.email = ""
        }
        formData.comment = ""
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }))
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
      }
    })
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Deja un comentario
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          value={formData.comment || ""}
          onChange={onInputChange}
          className="h-40 w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          name="comment"
          placeholder="Comentario"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          value={formData.name || ""}
          onChange={onInputChange}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Nombre"
          name="name"
        />
        <input
          type="email"
          value={formData.email || ""}
          onChange={onInputChange}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="cursor-pointer text-gray-500" htmlFor="storeData">
            Guardar mi nombre y email para la proxima vez que comente
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:bg-indigo-900"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comentario enviado con éxito, aparecera una vez sea aprobado
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
