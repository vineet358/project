"use client"

import { motion } from "framer-motion"
import { HelpCircle, X } from "lucide-react"
import { useState } from "react"

export default function FormattingHelper() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: "Select text", description: "Click and drag to select text for formatting" },
    { key: "Bold", description: "Select text and click the Bold button" },
    { key: "Italic", description: "Select text and click the Italic button" },
    { key: "Headings", description: "Select text and click H1, H2, or H3" },
    { key: "Lists", description: "Select text and click bullet or numbered list" },
    { key: "Links", description: "Select text, click link button, enter URL" },
    { key: "Images", description: "Select text (for alt text), click image button, enter URL" },
    { key: "Tables", description: "Click table button, specify rows and columns" },
    { key: "Text color", description: "Select text, click color button, choose color" },
    { key: "Font", description: "Select text, click font dropdown, choose font" },
    { key: "Font size", description: "Select text, click size dropdown, choose size" },
  ]

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg z-10"
        aria-label="Formatting Help"
      >
        <HelpCircle size={24} />
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold">Formatting Help</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                To format text in the editor, first select the text you want to format, then click the appropriate
                formatting button.
              </p>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex">
                    <div className="font-medium w-1/3">{shortcut.key}</div>
                    <div className="text-gray-600 dark:text-gray-400 w-2/3">{shortcut.description}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-800 dark:text-blue-200">
                <p className="text-sm">
                  <strong>Tip:</strong> Always select the text you want to format before clicking any formatting button.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

