"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import Image from "next/image"

interface FeaturedImageProps {
  featuredImage: string | null
  onImageUpload: (imageUrl: string) => void
}

export default function FeaturedImage({ featuredImage, onImageUpload }: FeaturedImageProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // In a real app, this would upload the file to a server
    // For this demo, we'll create a local URL
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Featured Image</h3>

      {featuredImage ? (
        <div className="relative">
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt="Featured image"
            width={1200}
            height={600}
            className="w-full h-auto rounded-md object-cover"
          />
          <button
            onClick={() => onImageUpload("")}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            aria-label="Remove image"
          >
            &times;
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-8 text-center ${
            isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Upload size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <p className="mb-2">Drag and drop an image here, or click to select a file</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Recommended size: 1200 x 600 pixels (16:9 ratio)
            </p>
            <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

