"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Link,
  Undo,
  Redo,
  Type,
  Heading,
  Heading1,
  Heading2,
  PaintBucket,
  Highlighter,
  Table,
  Indent,
  Outdent,
  Search,
  FileText,
  Strikethrough,
  Superscript,
  Subscript,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TextEditorProps {
  content: string
  setContent: (content: string) => void
}

export default function TextEditor({ content, setContent }: TextEditorProps) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState("")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false)
  const [showColorDropdown, setShowColorDropdown] = useState(false)
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false)
  const [fontSize, setFontSize] = useState("16px")
  const [fontFamily, setFontFamily] = useState("Inter")
  const [textColor, setTextColor] = useState("#000000")
  const [highlightColor, setHighlightColor] = useState("#FFFF00")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [showWordCount, setShowWordCount] = useState(false)
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")

  const editorRef = useRef<HTMLDivElement>(null)

  const fonts = [
    "Inter",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Comic Sans MS",
    "Impact",
  ]

  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "48px"]

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800000",
    "#008000",
    "#000080",
  ]

  const highlightColors = [
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFA500",
    "#A020F0",
    "#FFC0CB",
    "#FFFFFF",
  ]

  useEffect(() => {
    // Count words and characters
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    const chars = content.length

    setWordCount(words)
    setCharCount(chars)
  }, [content])

  const handleSelectionChange = () => {
    if (editorRef.current) {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          setSelectedText(selection.toString())
          setSelectionStart(range.startOffset)
          setSelectionEnd(range.endOffset)
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange)
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [])

  const applyFormatting = (format: string) => {
    setSelectedFormat(format)

    if (!editorRef.current) return

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    if (!editorRef.current.contains(range.commonAncestorContainer)) return

    const selectedText = selection.toString()
    if (!selectedText) {
      // If no text is selected, show a notification or tooltip
      alert(`Please select text before applying ${format} formatting`)
      return
    }

    // Create a document fragment for the formatted content
    const fragment = document.createDocumentFragment()
    let element: HTMLElement

    switch (format) {
      case "bold":
        element = document.createElement("strong")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "italic":
        element = document.createElement("em")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "underline":
        element = document.createElement("u")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "strikethrough":
        element = document.createElement("s")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "superscript":
        element = document.createElement("sup")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "subscript":
        element = document.createElement("sub")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "h1":
        element = document.createElement("h1")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "h2":
        element = document.createElement("h2")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "h3":
        element = document.createElement("h3")
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "bullet-list":
        element = document.createElement("ul")
        const liBullet = document.createElement("li")
        liBullet.textContent = selectedText
        element.appendChild(liBullet)
        fragment.appendChild(element)
        break
      case "numbered-list":
        element = document.createElement("ol")
        const liNumber = document.createElement("li")
        liNumber.textContent = selectedText
        element.appendChild(liNumber)
        fragment.appendChild(element)
        break
      case "align-left":
        element = document.createElement("div")
        element.style.textAlign = "left"
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "align-center":
        element = document.createElement("div")
        element.style.textAlign = "center"
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "align-right":
        element = document.createElement("div")
        element.style.textAlign = "right"
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "font-family":
        element = document.createElement("span")
        element.style.fontFamily = fontFamily
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "font-size":
        element = document.createElement("span")
        element.style.fontSize = fontSize
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "text-color":
        element = document.createElement("span")
        element.style.color = textColor
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "highlight":
        element = document.createElement("span")
        element.style.backgroundColor = highlightColor
        element.textContent = selectedText
        fragment.appendChild(element)
        break
        case "link":
            const url = prompt("Enter URL:", "https://")
            if (url) {
                const element = document.createElement("a") as HTMLAnchorElement // Type assertion
                element.href = url
                element.target = "_blank"
                element.textContent = selectedText
                fragment.appendChild(element)
            } else {
                return
            }
            break
        
      case "image":
            const imageUrl = prompt("Enter image URL:", "https://")
            if (imageUrl) {
                const element = document.createElement("img") as HTMLImageElement // Type assertion
                element.src = imageUrl
                element.alt = selectedText
                element.style.maxWidth = "100%"
                fragment.appendChild(element)
            } else {
                return
            }
            break
      case "table":
        const rows = Number.parseInt(prompt("Number of rows:", "3") || "3")
        const cols = Number.parseInt(prompt("Number of columns:", "3") || "3")

        element = document.createElement("table")
        element.style.width = "100%"
        element.style.borderCollapse = "collapse"

        for (let i = 0; i < rows; i++) {
          const tr = document.createElement("tr")
          for (let j = 0; j < cols; j++) {
            const td = document.createElement("td")
            td.style.border = "1px solid #ccc"
            td.style.padding = "8px"
            td.textContent = "Cell"
            tr.appendChild(td)
          }
          element.appendChild(tr)
        }

        fragment.appendChild(element)
        break
      case "indent":
        element = document.createElement("div")
        element.style.marginLeft = "20px"
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      case "outdent":
        element = document.createElement("div")
        element.style.marginLeft = "0"
        element.textContent = selectedText
        fragment.appendChild(element)
        break
      default:
        return
    }

    // Replace the selected text with the formatted content
    range.deleteContents()
    range.insertNode(fragment)

    // Update the content state with the new HTML
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const handleFindReplace = () => {
    if (!findText) return

    let newContent = content
    if (replaceText) {
      // Replace all occurrences
      newContent = content.split(findText).join(replaceText)
    } else {
      // Just highlight the first occurrence
      const index = content.indexOf(findText)
      if (index !== -1) {
        const highlightedText = `<span style="background-color: yellow">${findText}</span>`
        newContent = content.substring(0, index) + highlightedText + content.substring(index + findText.length)
      }
    }

    setContent(newContent)
  }

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML
    setContent(newContent)
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-lg">
      {/* Main Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        {/* Font Family */}
        <div className="relative">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => {
              setShowFontDropdown(!showFontDropdown)
              setShowFontSizeDropdown(false)
              setShowColorDropdown(false)
              setShowHighlightDropdown(false)
            }}
            className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Font Family"
          >
            <Type size={18} />
            <span className="text-sm hidden sm:inline">{fontFamily}</span>
            <ChevronDownIcon size={14} />
          </motion.button>

          <AnimatePresence>
            {showFontDropdown && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {fonts.map((font) => (
                  <div
                    key={font}
                    onClick={() => {
                      setFontFamily(font)
                      setShowFontDropdown(false)
                      if (selectedText) {
                        applyFormatting("font-family")
                      }
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Font Size */}
        <div className="relative">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => {
              setShowFontSizeDropdown(!showFontSizeDropdown)
              setShowFontDropdown(false)
              setShowColorDropdown(false)
              setShowHighlightDropdown(false)
            }}
            className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Font Size"
          >
            <Heading size={18} />
            <span className="text-sm hidden sm:inline">{fontSize}</span>
            <ChevronDownIcon size={14} />
          </motion.button>

          <AnimatePresence>
            {showFontSizeDropdown && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className="absolute z-10 mt-1 w-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {fontSizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => {
                      setFontSize(size)
                      setShowFontSizeDropdown(false)
                      if (selectedText) {
                        applyFormatting("font-size")
                      }
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    style={{ fontSize: size }}
                  >
                    {size}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Text Formatting */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("bold")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "bold" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Bold"
        >
          <Bold size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("italic")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "italic" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Italic"
        >
          <Italic size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("underline")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "underline" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Underline"
        >
          <Underline size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("strikethrough")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "strikethrough" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Strikethrough"
        >
          <Strikethrough size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("superscript")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "superscript" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Superscript"
        >
          <Superscript size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("subscript")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "subscript" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Subscript"
        >
          <Subscript size={18} />
        </motion.button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Text Color */}
        <div className="relative">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => {
              setShowColorDropdown(!showColorDropdown)
              setShowFontDropdown(false)
              setShowFontSizeDropdown(false)
              setShowHighlightDropdown(false)
            }}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            aria-label="Text Color"
          >
            <PaintBucket size={18} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: textColor }}></div>
          </motion.button>

          <AnimatePresence>
            {showColorDropdown && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className="absolute z-10 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
              >
                <div className="grid grid-cols-5 gap-1">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => {
                        setTextColor(color)
                        setShowColorDropdown(false)
                        if (selectedText) {
                          applyFormatting("text-color")
                        }
                      }}
                      className="w-6 h-6 rounded-full cursor-pointer border border-gray-300 dark:border-gray-700"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Highlight Color */}
        <div className="relative">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => {
              setShowHighlightDropdown(!showHighlightDropdown)
              setShowFontDropdown(false)
              setShowFontSizeDropdown(false)
              setShowColorDropdown(false)
            }}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            aria-label="Highlight Color"
          >
            <Highlighter size={18} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: highlightColor }}></div>
          </motion.button>

          <AnimatePresence>
            {showHighlightDropdown && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className="absolute z-10 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
              >
                <div className="grid grid-cols-5 gap-1">
                  {highlightColors.map((color) => (
                    <div
                      key={color}
                      onClick={() => {
                        setHighlightColor(color)
                        setShowHighlightDropdown(false)
                        if (selectedText) {
                          applyFormatting("highlight")
                        }
                      }}
                      className="w-6 h-6 rounded-full cursor-pointer border border-gray-300 dark:border-gray-700"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Headings */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("h1")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "h1" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Heading 1"
        >
          <Heading1 size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("h2")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "h2" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Heading 2"
        >
          <Heading2 size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("h3")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "h3" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Heading 3"
        >
          <span className="font-bold">H3</span>
        </motion.button>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        {/* Lists */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("bullet-list")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "bullet-list" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Bullet List"
        >
          <List size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("numbered-list")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "numbered-list" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Numbered List"
        >
          <ListOrdered size={18} />
        </motion.button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Alignment */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("align-left")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "align-left" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Align Left"
        >
          <AlignLeft size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("align-center")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "align-center" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Align Center"
        >
          <AlignCenter size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("align-right")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "align-right" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Align Right"
        >
          <AlignRight size={18} />
        </motion.button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Indentation */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("indent")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "indent" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Indent"
        >
          <Indent size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("outdent")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "outdent" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Outdent"
        >
          <Outdent size={18} />
        </motion.button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Insert */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("image")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "image" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Insert Image"
        >
          <ImageIcon size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("link")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "link" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Insert Link"
        >
          <Link size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("table")}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedFormat === "table" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Insert Table"
        >
          <Table size={18} />
        </motion.button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        {/* Utilities */}
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => setShowFindReplace(!showFindReplace)}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${showFindReplace ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Find and Replace"
        >
          <Search size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => setShowWordCount(!showWordCount)}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${showWordCount ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          aria-label="Word Count"
        >
          <FileText size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("undo")}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Undo"
        >
          <Undo size={18} />
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onClick={() => applyFormatting("redo")}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Redo"
        >
          <Redo size={18} />
        </motion.button>
      </div>

      {/* Find and Replace */}
      <AnimatePresence>
        {showFindReplace && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 overflow-hidden"
          >
            <div className="p-3 flex flex-wrap gap-2">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm mb-1">Find</label>
                <input
                  type="text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm mb-1">Replace</label>
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
              </div>
              <div className="flex items-end">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  onClick={handleFindReplace}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {replaceText ? "Replace All" : "Find"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={handleContentChange}
          className="w-full min-h-[300px] p-4 bg-white dark:bg-gray-800 outline-none overflow-auto"
          style={{ fontFamily }}
        ></div>

        {/* Placeholder text that disappears when content is added */}
        {!content && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
            Start writing your blog post here...
          </div>
        )}
      </div>

      {/* Word Count */}
      <AnimatePresence>
        {showWordCount && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex justify-between">
              <span>Words: {wordCount}</span>
              <span>Characters: {charCount}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper component for the dropdown icon
function ChevronDownIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}

