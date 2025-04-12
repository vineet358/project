"use client"

import type React from "react"

import { useState } from "react"
import type { BlogPost } from "@/app/types"
import TextEditor from "./text-editor"
import FeaturedImage from "./featured-image"
import { ChevronDown } from "lucide-react"

interface EditorMainProps {
  post: BlogPost
  setPost: React.Dispatch<React.SetStateAction<BlogPost>>
}

export default function EditorMain({ post, setPost }: EditorMainProps) {
  const [tagInput, setTagInput] = useState("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const categories = ["Technology", "Business", "Health", "Education", "Lifestyle", "Travel", "Food", "Career"]

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, title: e.target.value })
  }

  const handleCategorySelect = (category: string) => {
    setPost({ ...post, category })
    setShowCategoryDropdown(false)
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
        if (post.tags.length < 10) {
          setPost({ ...post, tags: [...post.tags, tagInput.trim()] })
          setTagInput("")
        } else {
          alert("Maximum 10 tags allowed")
        }
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleImageUpload = (imageUrl: string) => {
    setPost({ ...post, featuredImage: imageUrl })
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter your blog title here..."
        value={post.title}
        onChange={handleTitleChange}
        className="w-full p-2 text-3xl font-bold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-600"
      />

      {/* Category and Tags */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <label className="block mb-2 font-medium">Category</label>
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
            >
              <span>{post.category || "Select a category"}</span>
              <ChevronDown size={18} />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <label className="block mb-2 font-medium">Tags</label>
          <div className="p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center gap-1">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add tags (max 10)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className="w-full bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add a tag</p>
        </div>
      </div>

      {/* Text Editor */}
      <TextEditor content={post.content} setContent={(content) => setPost({ ...post, content })} />

      {/* Featured Image */}
      <FeaturedImage featuredImage={post.featuredImage} onImageUpload={handleImageUpload} />
    </div>
  )
}

