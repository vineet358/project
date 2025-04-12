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
  PaintBucket,
  Highlighter,
  Table,
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
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false)
  const [showColorDropdown, setShowColorDropdown] = useState(false)
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false)
  const [fontSize, setFontSize] = useState("3")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [textColor, setTextColor] = useState("#000000")
  const [highlightColor, setHighlightColor] = useState("#FFFF00")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [showWordCount, setShowWordCount] = useState(false)
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")

  const editorRef = useRef<HTMLDivElement>(null)
  const history = useRef<string[]>([])
  const historyIndex = useRef(-1)
  const selectionRef = useRef<Range | null>(null)

  const fonts = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Georgia", "Verdana"]
  const fontSizes = ["1", "2", "3", "4", "5", "6", "7"]
  const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]
  const highlightColors = ["#FFFF00", "#00FFFF", "#FF00FF", "#FF0000", "#00FF00", "#0000FF"]

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const saveSelection = () => {
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) {
        selectionRef.current = sel.getRangeAt(0)
      }
    }

    editor.addEventListener('mouseup', saveSelection)
    editor.addEventListener('keyup', saveSelection)

    return () => {
      editor.removeEventListener('mouseup', saveSelection)
      editor.removeEventListener('keyup', saveSelection)
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
      document.execCommand("fontName", false, fontFamily)
      document.execCommand("fontSize", false, fontSize)
    }
    saveState()
  }, [])

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word).length
    const chars = content.length
    setWordCount(words)
    setCharCount(chars)
  }, [content])

  const saveState = () => {
    if (!editorRef.current) return
    const html = editorRef.current.innerHTML
    if (html === history.current[historyIndex.current]) return
    
    history.current = history.current.slice(0, historyIndex.current + 1)
    history.current.push(html)
    historyIndex.current++
    setContent(html)
  }

  const applyFormatting = (command: string, value?: string) => {
    if (!editorRef.current) return
    
    const sel = window.getSelection()
    if (selectionRef.current && sel) {
      sel.removeAllRanges()
      sel.addRange(selectionRef.current.cloneRange())
    }

    editorRef.current.focus()
    
    try {
      document.execCommand("styleWithCSS", true)
      switch (command) {
        case "fontFamily":
          document.execCommand("fontName", false, value)
          setFontFamily(value || "Arial")
          break
        case "fontSize":
          document.execCommand("fontSize", false, value)
          setFontSize(value || "3")
          break
        case "textColor":
          document.execCommand("foreColor", false, value)
          setTextColor(value || "#000000")
          break
        case "highlight":
          document.execCommand("hiliteColor", false, value)
          setHighlightColor(value || "#FFFF00")
          break
        case "createLink":
          const url = prompt("Enter URL:", "https://")
          if (url) document.execCommand("createLink", false, url)
          break
        case "insertImage":
          const imgUrl = prompt("Enter image URL:", "https://")
          if (imgUrl) document.execCommand("insertImage", false, imgUrl)
          break
        case "insertTable":
          insertTable()
          break
        default:
          document.execCommand(command, false)
      }
      saveState()
    } catch (err) {
      console.error("Error executing command:", err)
    }

    const newSel = window.getSelection()
    if (newSel && newSel.rangeCount > 0) {
      selectionRef.current = newSel.getRangeAt(0)
    }
  }

  const insertTable = () => {
    const rows = Number.parseInt(prompt("Number of rows:", "3") || "3")
    const cols = Number.parseInt(prompt("Number of columns:", "3") || "3")
    
    let tableHTML = `<table class="w-full my-4" style="border-collapse: collapse;">`
    for (let i = 0; i < rows; i++) {
      tableHTML += "<tr>"
      for (let j = 0; j < cols; j++) {
        tableHTML += `<td class="border dark:border-gray-600 p-2">Cell</td>`
      }
      tableHTML += "</tr>"
    }
    tableHTML += "</table>"
    
    document.execCommand("insertHTML", false, tableHTML)
    saveState()
  }

  const handleInput = () => {
    saveState()
  }

  const handleUndo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--
      const content = history.current[historyIndex.current]
      setContent(content)
      if (editorRef.current) editorRef.current.innerHTML = content
    }
  }

  const handleRedo = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current++
      const content = history.current[historyIndex.current]
      setContent(content)
      if (editorRef.current) editorRef.current.innerHTML = content
    }
  }

  const handleFindReplace = () => {
    if (!findText) return
    const newContent = content.replace(new RegExp(findText, "g"), replaceText)
    setContent(newContent)
    if (editorRef.current) editorRef.current.innerHTML = newContent
    saveState()
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-lg">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        {/* Font Family */}
        <div className="relative">
          <motion.button
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowFontDropdown(!showFontDropdown)}
          >
            <Type size={18} className="text-gray-800 dark:text-gray-200" />
            <span className="text-sm text-gray-800 dark:text-gray-200">{fontFamily}</span>
          </motion.button>
          
          <AnimatePresence>
            {showFontDropdown && (
              <motion.div
                variants={dropdownVariants}
                className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg"
              >
                {fonts.map(font => (
                  <div
                    key={font}
                    onClick={() => {
                      applyFormatting("fontFamily", font)
                      setShowFontDropdown(false)
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
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
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
          >
            <Heading size={18} className="text-gray-800 dark:text-gray-200" />
            <span className="text-sm text-gray-800 dark:text-gray-200">{fontSize}</span>
          </motion.button>
          
          <AnimatePresence>
            {showFontSizeDropdown && (
              <motion.div
                variants={dropdownVariants}
                className="absolute z-10 mt-1 w-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg"
              >
                {fontSizes.map(size => (
                  <div
                    key={size}
                    onClick={() => {
                      applyFormatting("fontSize", size)
                      setShowFontSizeDropdown(false)
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-center text-gray-800 dark:text-gray-200"
                  >
                    {size}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Formatting */}
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("bold")}
        >
          <Bold size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("italic")}
        >
          <Italic size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("underline")}
        >
          <Underline size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>

        {/* Text Color */}
        <div className="relative">
          <motion.button
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            onClick={() => setShowColorDropdown(!showColorDropdown)}
          >
            <PaintBucket size={18} className="text-gray-800 dark:text-gray-200" />
            <div className="w-4 h-4 rounded border dark:border-gray-600" style={{ backgroundColor: textColor }} />
          </motion.button>
          
          <AnimatePresence>
            {showColorDropdown && (
              <motion.div
                variants={dropdownVariants}
                className="absolute z-10 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg grid grid-cols-4 gap-1"
              >
                {colors.map(color => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded cursor-pointer border dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      applyFormatting("textColor", color)
                      setShowColorDropdown(false)
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Highlight Color */}
        <div className="relative">
          <motion.button
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
            onClick={() => setShowHighlightDropdown(!showHighlightDropdown)}
          >
            <Highlighter size={18} className="text-gray-800 dark:text-gray-200" />
            <div className="w-4 h-4 rounded border dark:border-gray-600" style={{ backgroundColor: highlightColor }} />
          </motion.button>
          
          <AnimatePresence>
            {showHighlightDropdown && (
              <motion.div
                variants={dropdownVariants}
                className="absolute z-10 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg grid grid-cols-4 gap-1"
              >
                {highlightColors.map(color => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded cursor-pointer border dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      applyFormatting("highlight", color)
                      setShowHighlightDropdown(false)
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lists */}
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("insertUnorderedList")}
        >
          <List size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("insertOrderedList")}
        >
          <ListOrdered size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>

        {/* Alignment */}
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("justifyLeft")}
        >
          <AlignLeft size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("justifyCenter")}
        >
          <AlignCenter size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("justifyRight")}
        >
          <AlignRight size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>

        {/* Insert */}
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("insertImage")}
        >
          <ImageIcon size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("createLink")}
        >
          <Link size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => applyFormatting("insertTable")}
        >
          <Table size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>

        {/* History */}
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleUndo}
        >
          <Undo size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleRedo}
        >
          <Redo size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>

        {/* Utilities */}
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setShowFindReplace(!showFindReplace)}
        >
          <Search size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
        <motion.button
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setShowWordCount(!showWordCount)}
        >
          <FileText size={18} className="text-gray-800 dark:text-gray-200" />
        </motion.button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 bg-white dark:bg-gray-900 outline-none overflow-auto text-gray-800 dark:text-gray-200"
        style={{ 
          fontFamily: "inherit", 
          fontSize: "inherit" 
        }}
      />

      {/* Find/Replace Panel */}
      <AnimatePresence>
        {showFindReplace && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-2 border-t border-gray-300 dark:border-gray-700 flex gap-2 items-center bg-gray-100 dark:bg-gray-800"
          >
            <input
              type="text"
              placeholder="Find"
              className="flex-1 p-1 border rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Replace"
              className="flex-1 p-1 border rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
            <motion.button
              variants={buttonVariants} 
              whileHover="hover" 
              whileTap="tap"
              className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleFindReplace}
            >
              Replace
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Word Count Panel */}
      <AnimatePresence>
        {showWordCount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-2 border-t border-gray-300 dark:border-gray-700 text-sm flex justify-between bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}