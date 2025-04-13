"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  Loader2,
  Clock,
  ThumbsUp,
  Tag,
} from "lucide-react"

// Mock data for blog posts
const allBlogPosts = [
    {
      id: 1,
      title: "The Future of AI in Education",
      excerpt:
        "Exploring how artificial intelligence is transforming the educational landscape and creating new opportunities for personalized learning experiences.",
      image: "https://picsum.photos/600/400?random=1",
      author: "Dr. Sarah Johnson",
      authorAvatar: "https://picsum.photos/40/40?random=11",
      date: "May 15, 2023",
      category: "Technology",
      readTime: "8 min read",
      likes: 245,
      comments: 32,
      tags: ["AI", "Education", "Technology", "Future"],
    },
    {
      id: 2,
      title: "Student Success Stories: From Campus to Career",
      excerpt:
        "Inspiring journeys of recent graduates who found success in their chosen fields through determination and the support of mentors.",
      image: "https://picsum.photos/600/400?random=2",
      author: "Prof. Michael Chen",
      authorAvatar: "https://picsum.photos/40/40?random=12",
      date: "June 2, 2023",
      category: "Career",
      readTime: "6 min read",
      likes: 189,
      comments: 24,
      tags: ["Career", "Success", "Students", "Inspiration"],
    },
    {
      id: 3,
      title: "Research Breakthroughs: What's New in 2023",
      excerpt:
        "A roundup of the most significant research developments from our institution that are pushing the boundaries of knowledge.",
      image: "https://picsum.photos/600/400?random=3",
      author: "Dr. Emily Rodriguez",
      authorAvatar: "https://picsum.photos/40/40?random=13",
      date: "June 10, 2023",
      category: "Research",
      readTime: "10 min read",
      likes: 312,
      comments: 45,
      tags: ["Research", "Innovation", "Science", "Discovery"],
    },
    {
      id: 4,
      title: "Campus Sustainability Initiatives: Making a Difference",
      excerpt:
        "How our campus is working towards a greener future with innovative sustainability programs and community involvement.",
      image: "https://picsum.photos/600/400?random=4",
      author: "Environmental Committee",
      authorAvatar: "https://picsum.photos/40/40?random=14",
      date: "June 12, 2023",
      category: "Campus Life",
      readTime: "5 min read",
      likes: 178,
      comments: 19,
      tags: ["Sustainability", "Environment", "Campus", "Green"],
    },
    {
      id: 5,
      title: "The Impact of Virtual Reality on Learning Outcomes",
      excerpt:
        "New study reveals significant improvements in student engagement and retention with VR-enhanced educational experiences.",
      image: "https://picsum.photos/600/400?random=5",
      author: "Tech Research Team",
      authorAvatar: "https://picsum.photos/40/40?random=15",
      date: "June 10, 2023",
      category: "Technology",
      readTime: "7 min read",
      likes: 203,
      comments: 28,
      tags: ["VR", "Education", "Technology", "Learning"],
    },
    {
      id: 6,
      title: "Alumni Spotlight: Leading Innovation in Healthcare",
      excerpt:
        "Meet the graduate who's revolutionizing patient care with AI-powered diagnostics and personalized treatment plans.",
      image: "https://picsum.photos/600/400?random=6",
      author: "Alumni Association",
      authorAvatar: "https://picsum.photos/40/40?random=16",
      date: "June 8, 2023",
      category: "Alumni",
      readTime: "6 min read",
      likes: 156,
      comments: 17,
      tags: ["Healthcare", "Innovation", "Alumni", "AI"],
    },
    {
      id: 7,
      title: "Student Mental Health: Resources and Support",
      excerpt:
        "Comprehensive guide to mental health services available to all students, with insights from wellness experts.",
      image: "https://picsum.photos/600/400?random=7",
      author: "Wellness Center",
      authorAvatar: "https://picsum.photos/40/40?random=17",
      date: "June 5, 2023",
      category: "Health",
      readTime: "4 min read",
      likes: 289,
      comments: 42,
      tags: ["Mental Health", "Wellness", "Support", "Students"],
    },
    {
      id: 8,
      title: "Faculty Research Receives Major Grant Funding",
      excerpt:
        "Groundbreaking research project secures $2.5 million in federal funding to explore new frontiers in quantum computing.",
      image: "https://picsum.photos/600/400?random=8",
      author: "Research Office",
      authorAvatar: "https://picsum.photos/40/40?random=18",
      date: "June 3, 2023",
      category: "Research",
      readTime: "5 min read",
      likes: 134,
      comments: 15,
      tags: ["Research", "Funding", "Quantum Computing", "Faculty"],
    },
    {
      id: 9,
      title: "International Exchange Programs Expanding in 2023",
      excerpt:
        "New partnerships offer students more opportunities to study abroad and gain valuable global perspectives.",
      image: "https://picsum.photos/600/400?random=9",
      author: "International Office",
      authorAvatar: "https://picsum.photos/40/40?random=19",
      date: "June 1, 2023",
      category: "Global",
      readTime: "6 min read",
      likes: 167,
      comments: 23,
      tags: ["International", "Study Abroad", "Global", "Exchange"],
    },
    {
      id: 10,
      title: "The Art of Effective Study Habits",
      excerpt:
        "Expert advice on developing study habits that maximize retention and minimize stress during exam periods.",
      image: "https://picsum.photos/600/400?random=10",
      author: "Academic Success Center",
      authorAvatar: "https://picsum.photos/40/40?random=20",
      date: "May 28, 2023",
      category: "Academics",
      readTime: "7 min read",
      likes: 276,
      comments: 38,
      tags: ["Study", "Academics", "Success", "Tips"],
    },
    {
      id: 11,
      title: "Campus Architecture: Blending Tradition with Innovation",
      excerpt:
        "Exploring the design philosophy behind our campus buildings and how they enhance the learning environment.",
      image: "https://picsum.photos/600/400?random=21",
      author: "Facilities Department",
      authorAvatar: "https://picsum.photos/40/40?random=31",
      date: "May 25, 2023",
      category: "Campus Life",
      readTime: "8 min read",
      likes: 142,
      comments: 19,
      tags: ["Architecture", "Campus", "Design", "Innovation"],
    },
    {
      id: 12,
      title: "Diversity and Inclusion: Building a Stronger Community",
      excerpt:
        "Initiatives and programs that are fostering a more inclusive campus environment where everyone can thrive.",
      image: "https://picsum.photos/600/400?random=22",
      author: "Diversity Office",
      authorAvatar: "https://picsum.photos/40/40?random=32",
      date: "May 22, 2023",
      category: "Community",
      readTime: "9 min read",
      likes: 231,
      comments: 34,
      tags: ["Diversity", "Inclusion", "Community", "Equity"],
    },
  ];
  
// Extract all unique categories
const allCategories = [...new Set(allBlogPosts.map((post) => post.category))]

// Extract all unique tags and count their occurrences
const tagCounts = allBlogPosts.reduce(
  (acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  },
  {} as Record<string, number>,
)

// Convert to array and sort by count
const allTags = Object.entries(tagCounts)
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count)

// Custom components to replace shadcn/ui
const Avatar = ({
  src,
  alt,
  className,
  children,
}: { src?: string; alt?: string; className?: string; children?: React.ReactNode }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 ${className || ""}`}
    >
      {src ? (
        <Image src={src || "/placeholder.svg"} alt={alt || ""} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium text-gray-600">{children}</div>
      )}
    </div>
  )
}

const Badge = ({
  children,
  variant = "default",
  className = "",
  onClick,
}: {
  children: React.ReactNode
  variant?: "default" | "outline"
  className?: string
  onClick?: () => void
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
  const variantClasses =
    variant === "default"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-transparent border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </span>
  )
}

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  onClick,
  type = "button",
}: {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"

  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent",
  }

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-10 w-10",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#333333] dark:bg-[#1A1A1A] ${className}`}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
}

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
}

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
}

const Input = ({
  className = "",
  type = "text",
  placeholder = "",
  value,
  onChange,
}: {
  className?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder-gray-400 dark:focus:ring-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}


const Checkbox = ({
  id,
  checked,
  onCheckedChange,
  className = "",
}: {
  id: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
      />
    </div>
  )
}



// Custom select component
const Select = ({
  value,
  children,
  className = "",
}: {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#333333] dark:border-[#333333] dark:bg-[#1c1c1c]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#1A1A1A] dark:ring-[#333333]">
          {children}
        </div>
      )}
    </div>
  )
}

const SelectItem = ({
  value,
  children,
  onSelect,
}: {
  value: string
  children: React.ReactNode
  onSelect: (value: string) => void
}) => {
  return (
    <div
      className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  )
}


export default function BlogsPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(allBlogPosts)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Filter and sort posts
  useEffect(() => {
    let result = [...allBlogPosts]

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((post) => selectedCategories.includes(post.category))
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Sort posts
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "popular":
        result.sort((a, b) => b.likes - a.likes)
        break
      case "comments":
        result.sort((a, b) => b.comments - a.comments)
        break
      default:
        break
    }

    setFilteredPosts(result)
  }, [selectedCategories, selectedTags, sortBy, searchQuery])

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Load more posts
  const loadMorePosts = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts((prev) => Math.min(prev + 6, filteredPosts.length))
      setIsLoading(false)
    }, 1000)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSortBy("newest")
    setSearchQuery("")
  }


  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">
      <main className="flex-1">
      {/* Page Header */}
      <div className="relative flex justify-center items-center h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden px-4">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 dark:from-indigo-700 dark:via-purple-600 dark:to-pink-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative text-center text-white max-w-3xl">
        <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold pacifico">
        Blog Articles
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg">
        Discover the latest insights, research, and stories from our community of thinkers and innovators.
        </p>
      </div>
    </div>

        {/* Filters and Blog Content */}
        <section className="mx-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Filters - Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center">
                      <Filter className="mr-2 h-5 w-5 text-blue-600 dark:text-[#00FFFF]" />
                      Filters
                    </h3>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-8">
                      Reset All
                    </Button>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                            className="mr-2"
                          />
                          <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Sort By</h4>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectItem value="newest" onSelect={() => setSortBy("newest")}>
                        Newest First
                      </SelectItem>
                      <SelectItem value="oldest" onSelect={() => setSortBy("oldest")}>
                        Oldest First
                      </SelectItem>
                      <SelectItem value="popular" onSelect={() => setSortBy("popular")}>
                        Most Popular
                      </SelectItem>
                      <SelectItem value="comments" onSelect={() => setSortBy("comments")}>
                        Most Comments
                      </SelectItem>
                    </Select>
                  </div>
                </div>

                {/* Tags Cloud */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] p-5">
                  <h3 className="font-bold text-lg flex items-center mb-4">
                    <Tag className="mr-2 h-5 w-5 text-blue-600 dark:text-[#00FFFF]" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(({ tag, count }) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedTags.includes(tag) ? "bg-blue-600 text-white" : "hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag} ({count})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters & Sorting
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </Button>

              {isFilterOpen && (
                <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 animate-in slide-in-from-top">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-8">
                      Reset All
                    </Button>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Sort By</h4>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectItem value="newest" onSelect={() => setSortBy("newest")}>
                        Newest First
                      </SelectItem>
                      <SelectItem value="oldest" onSelect={() => setSortBy("oldest")}>
                        Oldest First
                      </SelectItem>
                      <SelectItem value="popular" onSelect={() => setSortBy("popular")}>
                        Most Popular
                      </SelectItem>
                      <SelectItem value="comments" onSelect={() => setSortBy("comments")}>
                        Most Comments
                      </SelectItem>
                    </Select>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Categories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                            className="mr-2"
                          />
                          <label htmlFor={`mobile-category-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 10).map(({ tag, count }) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedTags.includes(tag) ? "bg-blue-600 text-white" : "hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Grid */}
            <div className="lg:w-3/4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">No posts found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    We couldn't find any posts matching your current filters.
                  </p>
                  <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                      {filteredPosts.slice(0, visiblePosts).map((post) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative aspect-[4/2] overflow-hidden">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105 rounded-t-lg"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-blue-600 hover:bg-blue-700 text-white">{post.category}</Badge>
                              </div>
                            </div>
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <Clock className="h-4 w-4" />
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                              </div>
                              <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="flex items-center space-x-2 mb-3">
                                <Avatar className="h-6 w-6" src={post.authorAvatar}>
                                  {post.author.charAt(0)}
                                </Avatar>
                                <span className="text-sm font-medium">{post.author}</span>
                              </div>
                              <p className="text-gray-500 dark:text-gray-400 line-clamp-3 text-sm mb-3">{post.excerpt}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                              <Link
                                href={`/blog/${post.id}`}
                                className="text-md font-bold text-blue-600 dark:text-[#8a2be2] hover:underline"
                              >
                                Read More
                              </Link>
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  <span className="text-xs">{post.likes}</span>
                                </div>
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  <span className="text-xs">{post.comments}</span>
                                </div>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Load More Button */}
                  {visiblePosts < filteredPosts.length && (
                    <div className="mt-10 text-center">
                      <Button onClick={loadMorePosts} disabled={isLoading} className="px-8 dark:bg-[#0A1A2F] dark:text-[#00e5ff] hover:bg-[#B2F2BB] dark:hover:bg-[#00FFFF] hover:text-[#333333] dark:hover:text-[#333333] border border-white/5">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>Load More Posts</>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        <div className="relative flex justify-center items-center h-[300px] w-full overflow-hidden px-4">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 dark:from-indigo-700 dark:via-purple-600 dark:to-pink-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative text-center text-white max-w-3xl">
        <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold pacifico">
        Stay Updated
        </h2>
        <p className="text-gray-950 dark:text-white max-w-2xl mx-auto mt-6 mb-6">
              Subscribe to our newsletter to receive the latest blog posts and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Your email address" type="email" className="sm:flex-1" />
              <Button className="dark:bg-[#0A1A2F] dark:text-[#00e5ff] hover:bg-[#B2F2BB] dark:hover:bg-[#00FFFF] hover:text-[#333333] dark:hover:text-[#333333]">Subscribe</Button>
            </div>
      </div>
    </div>
      </main>
    </div>
  )
}
