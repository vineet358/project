"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Search,
  Filter,
  ArrowUpDown,
  Grid,
  List,
  BookOpen,
  Calendar,
  Lightbulb,
  Briefcase,
  Bookmark,
  TrendingUp,
  Code,
  Music,
  Camera,
  Coffee,
  Heart,
  Globe,
  Zap,
  X,
} from "lucide-react"

// Mock data for category posts
const generateCategoryPosts = (category: string, count = 12) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Article ${i + 1}`,
    excerpt: `This is a sample article about ${category} showcasing the latest developments and insights.`,
    image: `/placeholder.svg?height=200&width=400&text=${category.charAt(0).toUpperCase() + category.slice(1)}+${i + 1}`,
    date: new Date(Date.now() - i * 86400000).toISOString(), // Random dates
    author: `Author ${(i % 5) + 1}`,
    readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
    featured: i < 3, // First 3 posts are featured
  }))
}

// Category icons mapping
const categoryIcons: Record<string, any> = {
  academics: BookOpen,
  events: Calendar,
  research: Lightbulb,
  career: Briefcase,
  "campus life": Bookmark,
  trending: TrendingUp,
  technology: Code,
  arts: Music,
  photography: Camera,
  lifestyle: Coffee,
  health: Heart,
  global: Globe,
  innovation: Zap,
}

export default function CategoryPage() {
  const router = useRouter()
  const { slug } = useParams() as { slug: string }
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  const [posts, setPosts] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filterFeatured, setFilterFeatured] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Get the appropriate icon component
  const IconComponent = categoryIcons[slug.toLowerCase()] || BookOpen

  useEffect(() => {
    // Generate mock posts for this category
    const categoryPosts = generateCategoryPosts(slug, 12)
    setPosts(categoryPosts)
    setMounted(true)
  }, [slug])

  // Filter and sort posts
  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((post) => !filterFeatured || post.featured)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "popular":
        default:
          // Mock popularity sorting (in a real app this would be based on views/likes)
          return Math.random() - 0.5
      }
    })

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-dropdown="sort"]')) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-[#00e5FF]/20 mb-4">
              <IconComponent className="h-8 w-8 text-purple-600 dark:text-[#00e5FF]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{categoryName}</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Explore all articles and resources related to {categoryName.toLowerCase()}.
            </p>
            <button
              onClick={() => router.push("/categories")}
              className="mt-6 flex items-center text-purple-600 dark:text-[#00e5FF] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Categories
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-auto md:min-w-[300px] lg:min-w-[400px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder={`Search ${categoryName} articles...`}
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-[#1A1A1A] dark:border-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center gap-1 px-3 py-2 border rounded-md text-sm font-medium dark:bg-[#1A1A1A] dark:border-gray-700 dark:text-white"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              aria-expanded={showMobileFilters}
              aria-controls="mobile-filters"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative" data-dropdown="sort">
              <button
                className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm font-medium dark:bg-[#1A1A1A] dark:border-gray-700 dark:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowSortDropdown(!showSortDropdown)
                }}
                aria-expanded={showSortDropdown}
                aria-controls="sort-dropdown"
              >
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </button>
              {showSortDropdown && (
                <div
                  id="sort-dropdown"
                  className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#1A1A1A] rounded-md shadow-lg z-10 border dark:border-gray-700"
                >
                  <div className="py-1 px-2 text-sm font-medium border-b dark:border-gray-700">Sort by</div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSortBy("newest")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "newest" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Newest First
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("oldest")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "oldest" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Oldest First
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("popular")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "popular" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Most Popular
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-md overflow-hidden dark:border-gray-700">
              <button
                className={`h-9 px-3 ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white dark:bg-[#00e5FF] dark:text-[#0a0a0a]"
                    : "bg-white text-gray-700 dark:bg-[#1A1A1A] dark:text-white"
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </button>
              <div className="w-px h-9 bg-gray-200 dark:bg-gray-700"></div>
              <button
                className={`h-9 px-3 ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white dark:bg-[#00e5FF] dark:text-[#0a0a0a]"
                    : "bg-white text-gray-700 dark:bg-[#1A1A1A] dark:text-white"
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Mobile & Desktop */}
          <div
            id="mobile-filters"
            className={`md:w-1/4 lg:w-1/5 space-y-6 md:block ${showMobileFilters ? "block" : "hidden"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold dark:text-white">Filters</h2>
              <button
                className="text-sm text-purple-600 dark:text-[#00e5FF] hover:text-purple-800 dark:hover:text-[#00e5FF]/80"
                onClick={() => {
                  setFilterFeatured(false)
                  setSearchQuery("")
                }}
              >
                Clear All
              </button>
            </div>

            {/* Featured Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium dark:text-white">Show Only</h3>
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={filterFeatured}
                    onChange={() => setFilterFeatured(!filterFeatured)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-[#00e5FF]"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Featured articles</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Category Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium dark:text-white">About this Category</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {categoryName} contains articles, resources, and discussions related to {slug.toLowerCase()} topics.
                Explore the latest content and stay updated with new developments.
              </p>
            </div>

            {/* Mobile Close Button */}
            <button
              className="w-full md:hidden mt-4 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors dark:bg-[#00e5FF] dark:text-[#0a0a0a] dark:hover:bg-[#00e5FF]/90"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>

          {/* Posts Grid/List */}
          <div className="md:w-3/4 lg:w-4/5">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 dark:text-white">No articles found</h3>
                <p className="text-gray-500 mb-4 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors dark:bg-[#00e5FF] dark:text-[#0a0a0a] dark:hover:bg-[#00e5FF]/90"
                  onClick={() => {
                    setFilterFeatured(false)
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Showing <span className="font-medium text-gray-900 dark:text-white">{filteredPosts.length}</span>{" "}
                    articles
                  </p>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredPosts.map((post) => (
                      <motion.div key={post.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <div className="h-full overflow-hidden border rounded-lg hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-[#1A1A1A] cursor-pointer">
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {post.featured && (
                              <div className="absolute top-2 right-2">
                                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-[#00e5FF]/20 dark:text-[#00e5FF] rounded-full">
                                  Featured
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold line-clamp-1 dark:text-white">{post.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-2 dark:text-gray-400">{post.excerpt}</p>
                            <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <motion.div key={post.id} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <div className="overflow-hidden border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-[#1A1A1A] cursor-pointer">
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative sm:w-48 h-40">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold dark:text-white">{post.title}</h3>
                                {post.featured && (
                                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-[#00e5FF]/20 dark:text-[#00e5FF] rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500 text-sm mt-1 dark:text-gray-400 line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-4">
                                  <span>{new Date(post.date).toLocaleDateString()}</span>
                                  <span>{post.readTime}</span>
                                </div>
                                <button className="text-sm text-purple-600 dark:text-[#00e5FF] hover:underline">
                                  Read More
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related Categories */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a]/80 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Related Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
              Explore other categories that might interest you
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(categoryIcons)
              .filter(([key]) => key !== slug.toLowerCase())
              .slice(0, 6)
              .map(([key, Icon]) => (
                <motion.div key={key} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Link href={`/category/${key}`} className="block">
                    <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-[#1A1A1A]">
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-[#00e5FF]/20 mb-3">
                        <Icon className="h-6 w-6 text-purple-600 dark:text-[#00e5FF]" />
                      </div>
                      <span className="text-sm font-medium text-center dark:text-white">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
