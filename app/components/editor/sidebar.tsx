"use client"

import { useState } from "react"
import type { DraftPost } from "@/app/types"
import { ChevronDown, Info, HelpCircle } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  drafts: DraftPost[]
}

export default function Sidebar({ drafts }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    contentStandards: false,
    formattingGuidelines: false,
    imageUsage: false,
    toneAndStyle: false,
    reviewProcess: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const sectionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  }

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  }

  return (
    <div className="w-full lg:w-96 space-y-6">
      {/* Drafts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-[#333333] overflow-hidden shadow-md"
      >
        <div className="p-4 border-b border-gray-200 dark:border-[#333333] flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Drafts</h2>
          <span className="bg-gray-200 dark:bg-[#00e5FF] px-2 py-1 rounded-full text-sm dark:text-black">{drafts.length}</span>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-[400px] overflow-auto">
          {drafts.map((draft, index) => (
            <motion.div
              key={draft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer dark:bg-[#0a0a0a]"
            >
              <div className="flex gap-3">
                <Image
                  src={draft.image || "/placeholder.svg"}
                  alt={draft.title}
                  width={70}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">{draft.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{draft.excerpt}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded-full">
                      {draft.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{draft.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Publishing Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-[#333333] overflow-hidden shadow-md"
      >
        <div className="p-4 border-b border-gray-200 dark:border-[#333333] flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          <h2 className="text-xl font-bold">Publishing Guidelines</h2>
        </div>

        {/* Content Standards */}
        <div className="border-b border-gray-200 dark:border-[#333333]">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => toggleSection("contentStandards")}
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
          >
            <span className="font-medium">Content Standards</span>
            <motion.div
              animate={{ rotate: expandedSections.contentStandards ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {expandedSections.contentStandards && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ensure content is original and not plagiarized</li>
                    <li>Fact-check all claims and provide sources</li>
                    <li>Avoid offensive or controversial language</li>
                    <li>Minimum 800 words for standard posts</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Formatting Guidelines */}
        <div className="border-b border-gray-200 dark:border-[#333333]">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => toggleSection("formattingGuidelines")}
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
          >
            <span className="font-medium">Formatting Guidelines</span>
            <motion.div
              animate={{ rotate: expandedSections.formattingGuidelines ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {expandedSections.formattingGuidelines && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Use headings to organize content (H2, H3)</li>
                    <li>Keep paragraphs short (3-4 sentences max)</li>
                    <li>Use bullet points for lists</li>
                    <li>Include relevant images with proper attribution</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Image Usage */}
        <div className="border-b border-gray-200 dark:border-[#333333]">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => toggleSection("imageUsage")}
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
          >
            <span className="font-medium">Image Usage</span>
            <motion.div animate={{ rotate: expandedSections.imageUsage ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {expandedSections.imageUsage && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Use high-quality, relevant images</li>
                    <li>Ensure proper licensing for all images</li>
                    <li>Optimize images for web (max 500KB per image)</li>
                    <li>Include alt text for accessibility</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tone and Style */}
        <div className="border-b border-gray-200 dark:border-[#333333]">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => toggleSection("toneAndStyle")}
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
          >
            <span className="font-medium">Tone and Style</span>
            <motion.div animate={{ rotate: expandedSections.toneAndStyle ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {expandedSections.toneAndStyle && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Maintain a professional but conversational tone</li>
                    <li>Avoid jargon unless writing for a technical audience</li>
                    <li>Be inclusive and respectful in language</li>
                    <li>Use active voice when possible</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Review Process */}
        <div>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => toggleSection("reviewProcess")}
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
          >
            <span className="font-medium">Review Process</span>
            <motion.div animate={{ rotate: expandedSections.reviewProcess ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {expandedSections.reviewProcess && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All posts undergo editorial review before publishing</li>
                    <li>Expect feedback within 48 hours</li>
                    <li>You may be asked to make revisions</li>
                    <li>Final approval is required before publishing</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  )
}

