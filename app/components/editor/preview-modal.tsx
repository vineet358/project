"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  category: string
  tags: string[]
  featuredImage: string | null
  fontFamily: string // Add fontFamily prop
}

export default function PreviewModal({
  isOpen,
  onClose,
  title,
  content,
  category,
  tags,
  featuredImage,
  fontFamily, // Receive fontFamily prop
}: PreviewModalProps) {
  if (!isOpen) return null

  const formatDate = () => {
    const date = new Date()
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-[#1A1A1A] rounded-lg shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-[#1A1A1A] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <div className="p-6 border-b border-gray-200 dark:border-[#1A1A1A]">
              <h2 className="text-xl font-bold">Post Preview</h2>
              <p className="text-gray-600 dark:text-gray-400">This is how your post will appear when published</p>
            </div>

            <div className="p-6">
              <div 
                className="bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 min-h-[500px] p-4 overflow-auto"
                style={{ fontFamily }} // Apply font family to container
              >
                <article className="max-w-none">
                  <header className="mb-8">
                    <h1 
                      className="text-3xl font-bold mb-4" 
                      style={{ fontFamily }} // Apply to title
                    >
                      {title || "Untitled Post"}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>Published on {formatDate()}</span>
                      {category && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                          {category}
                        </span>
                      )}
                    </div>

                    {featuredImage && (
                      <div className="mb-6">
                        <img
                          src={featuredImage}
                          alt={title || "Featured image"}
                          className="w-full h-auto rounded-lg object-cover"
                          style={{ maxHeight: "400px" }}
                        />
                      </div>
                    )}
                  </header>

                  <div 
                    className="editor-preview-content"
                    dangerouslySetInnerHTML={{ __html: content || "<p>No content yet...</p>" }}
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                    }}
                  />

                  {tags.length > 0 && (
                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}