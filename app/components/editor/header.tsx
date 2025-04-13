"use client"

import { Save, Eye } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  saveDraft: () => void
  previewPost: () => void
  publishPost: () => void
  toggleDarkMode: () => void
  darkMode: boolean
}

export default function HeaderWriteBlog({ saveDraft, previewPost, publishPost}: HeaderProps) {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  }

  return (
    <header className="p-4 border-b border-gray-200 dark:border-[#333333] bg-white dark:bg-[#0a0a0a] shadow-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Write a New Blog Post
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Share your knowledge and insights with our community
          </motion.p>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={saveDraft}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Save size={18} />
            <span>Draft</span>
          </motion.button>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={previewPost}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Eye size={18} />
            <span>Preview</span>
          </motion.button>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={publishPost}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            Publish
          </motion.button>
        </div>
      </div>
    </header>
  )
}

