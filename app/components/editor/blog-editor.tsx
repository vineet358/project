"use client"

import { useState, useEffect } from "react"
import EditorMain from "./editor-main"
import Sidebar from "./sidebar"
import type { BlogPost, DraftPost } from "@/app/types"
import { motion, AnimatePresence } from "framer-motion"
import PreviewModal from "./preview-modal"
import HeaderWriteBlog from "./header"

export default function BlogEditor() {
  const [darkMode, setDarkMode] = useState(false)
  const [post, setPost] = useState<BlogPost>({
    title: "",
    category: "",
    tags: [],
    content: "",
    featuredImage: null,
    selectedFont: "Arial", // Added font selection state
  })
  const [drafts, setDrafts] = useState<DraftPost[]>([
    {
      id: "1",
      title: "The Impact of AI on Moder...",
      excerpt: "Exploring how artificial intelligence...",
      category: "Technology",
      timestamp: "2 hours ago",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      title: "5 Essential Study Habits fo...",
      excerpt: "Proven strategies to improve your...",
      category: "Education",
      timestamp: "Yesterday",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      title: "Navigating Career...",
      excerpt: "A guide for students looking to...",
      category: "Career",
      timestamp: "3 days ago",
      image: "/placeholder.svg?height=80&width=80",
    },
  ])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info")
  const [showPreview, setShowPreview] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Show notification
  const showNotificationMessage = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)

    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  // Save draft functionality
  const saveDraft = () => {
    if (!post.title) {
      showNotificationMessage("Please add a title to your post before saving", "error")
      return
    }

    const newDraft: DraftPost = {
      id: Date.now().toString(),
      title: post.title.length > 25 ? post.title.substring(0, 22) + "..." : post.title,
      excerpt: post.content.length > 40 ? post.content.substring(0, 37) + "..." : post.content || "No content yet...",
      category: post.category || "Uncategorized",
      timestamp: "Just now",
      image: post.featuredImage || "/placeholder.svg?height=80&width=80",
    }

    setDrafts([newDraft, ...drafts])
    showNotificationMessage("Draft saved successfully!", "success")
  }

  // Preview functionality
  const previewPost = () => {
    if (!post.title || !post.content) {
      showNotificationMessage("Please add both title and content before previewing", "error")
      return
    }

    setShowPreview(true)
  }

  // Publish functionality
  const publishPost = () => {
    if (!post.title || !post.content) {
      showNotificationMessage("Please add both title and content before publishing", "error")
      return
    }

    if (!post.category) {
      showNotificationMessage("Please select a category before publishing", "error")
      return
    }

    // Reset the form
    setPost({
      title: "",
      category: "",
      tags: [],
      content: "",
      featuredImage: null,
      selectedFont: "Arial", // Reset font to default
    })
    
    showNotificationMessage("Your post has been published successfully!", "success")
  }

  // Animation variants
  const notificationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
  }

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
      <motion.div variants={itemVariants}>
        <HeaderWriteBlog
          saveDraft={saveDraft}
          previewPost={previewPost}
          publishPost={publishPost}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
      </motion.div>

      <div className="flex flex-col lg:flex-row flex-1 p-4 gap-6">
        <motion.div variants={itemVariants} className="flex-1">
          <EditorMain post={post} setPost={setPost} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Sidebar drafts={drafts} />
        </motion.div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={notificationVariants}
            className={`fixed top-4 right-4 p-4 rounded-md shadow-lg max-w-md z-50 ${
              notificationType === "success"
                ? "bg-green-500 text-white"
                : notificationType === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            {notificationMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={post.title}
        content={post.content}
        category={post.category}
        tags={post.tags}
        featuredImage={post.featuredImage}
        fontFamily={post.selectedFont} // Pass selected font
      />
    </motion.div>
  )
}