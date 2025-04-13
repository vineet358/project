"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
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

export default function CategoriesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [postCount, setPostCount] = useState<[number, number]>([0, 100])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "oldest" | "a-z" | "z-a">("popular")
  const [mounted, setMounted] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [activeTab, setActiveTab] = useState("academics")

  // All available categories
  const allCategories = [
    {
      name: "Academics",
      icon: BookOpen,
      count: 42,
      featured: true,
      description: "Educational content and academic research",
    },
    { name: "Events", icon: Calendar, count: 28, featured: true, description: "Upcoming and past events coverage" },
    {
      name: "Research",
      icon: Lightbulb,
      count: 35,
      featured: true,
      description: "Latest research findings and breakthroughs",
    },
    {
      name: "Career",
      icon: Briefcase,
      count: 24,
      featured: false,
      description: "Career advice and professional development",
    },
    {
      name: "Campus Life",
      icon: Bookmark,
      count: 31,
      featured: true,
      description: "Life on campus and student experiences",
    },
    { name: "Trending", icon: TrendingUp, count: 19, featured: true, description: "Popular and trending topics" },
    { name: "Technology", icon: Code, count: 47, featured: true, description: "Tech news, reviews, and innovations" },
    { name: "Arts", icon: Music, count: 22, featured: false, description: "Arts, music, and creative expressions" },
    { name: "Photography", icon: Camera, count: 18, featured: false, description: "Photography tips and showcases" },
    {
      name: "Lifestyle",
      icon: Coffee,
      count: 29,
      featured: false,
      description: "Lifestyle, wellness, and personal growth",
    },
    { name: "Health", icon: Heart, count: 33, featured: true, description: "Health, fitness, and wellbeing" },
    {
      name: "Global",
      icon: Globe,
      count: 26,
      featured: false,
      description: "Global perspectives and international topics",
    },
    { name: "Innovation", icon: Zap, count: 37, featured: true, description: "Innovations and future trends" },
  ]

  // Filter categories based on search and other filters
  const filteredCategories = allCategories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!showFeaturedOnly || category.featured) &&
        (selectedCategories.length === 0 || selectedCategories.includes(category.name)) &&
        category.count >= postCount[0] &&
        category.count <= postCount[1],
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return -1 // Mocked, would use date in real app
        case "oldest":
          return 1 // Mocked, would use date in real app
        case "a-z":
          return a.name.localeCompare(b.name)
        case "z-a":
          return b.name.localeCompare(a.name)
        case "popular":
        default:
          return b.count - a.count
      }
    })

  // Calculate active filters
  useEffect(() => {
    let count = 0
    if (searchQuery) count++
    if (showFeaturedOnly) count++
    if (selectedCategories.length > 0) count++
    if (postCount[0] > 0 || postCount[1] < 100) count++
    if (sortBy !== "popular") count++
    setActiveFilters(count)
  }, [searchQuery, showFeaturedOnly, selectedCategories, postCount, sortBy])

  useEffect(() => {
    setMounted(true)
  }, [])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPostCount([0, 100])
    setShowFeaturedOnly(false)
    setSortBy("popular")
  }

  // Navigate to category detail page
  const navigateToCategory = (categoryName: string) => {
    router.push(`/category/${categoryName.toLowerCase()}`)
  }

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Handle suggest category
  const handleSuggestCategory = () => {
    // In a real app, this would open a form or modal
    alert("Suggest a category feature will be implemented soon!")
  }

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
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Explore Categories</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Discover content organized by topics that matter to you. Browse our collection of categories to find
              exactly what you're looking for.
            </p>
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
              placeholder="Search categories..."
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
              {activeFilters > 0 && (
                <span className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full text-xs dark:bg-gray-700 dark:text-gray-200">
                  {activeFilters}
                </span>
              )}
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
                        setSortBy("popular")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        sortBy === "popular" ? "bg-gray-100 dark:bg-gray-800" : ""
                      } dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Most Popular
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("newest")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "newest" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("oldest")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "oldest" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Oldest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("a-z")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "a-z" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      A-Z
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("z-a")
                        setShowSortDropdown(false)
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "z-a" ? "bg-gray-100 dark:bg-gray-800" : ""} dark:hover:bg-gray-800 hover:bg-gray-100`}
                    >
                      Z-A
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
          {/* Filters Sidebar - Desktop */}
          <div
            id="mobile-filters"
            className={`md:w-1/4 lg:w-1/5 space-y-6 md:block ${showMobileFilters ? "block" : "hidden"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold dark:text-white">Filters</h2>
              {activeFilters > 0 && (
                <button
                  className="text-sm text-purple-600 dark:text-[#00e5FF] hover:text-purple-800 dark:hover:text-[#00e5FF]/80"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Featured Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium dark:text-white">Featured</h3>
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showFeaturedOnly}
                    onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-[#00e5FF]"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Show featured only</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Category Selection */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium dark:text-white">Categories</h3>
              <div className="h-[200px] overflow-y-auto pr-4">
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${category.name}`}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:bg-[#1A1A1A] dark:border-gray-700"
                        checked={selectedCategories.includes(category.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category.name])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category.name))
                          }
                        }}
                      />
                      <label
                        htmlFor={`category-${category.name}`}
                        className="flex items-center justify-between w-full text-sm dark:text-white"
                      >
                        <span>{category.name}</span>
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          {category.count}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Post Count Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium dark:text-white">Post Count</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {postCount[0]} - {postCount[1]}
                </span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={postCount[0]}
                  onChange={(e) => setPostCount([Number.parseInt(e.target.value), postCount[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={postCount[1]}
                  onChange={(e) => setPostCount([postCount[0], Number.parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 dark:bg-gray-700"
                />
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              className="w-full md:hidden mt-4 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors dark:bg-[#00e5FF] dark:text-[#0a0a0a] dark:hover:bg-[#00e5FF]/90"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>

          {/* Categories Grid/List */}
          <div className="md:w-3/4 lg:w-4/5">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 dark:text-white">No categories found</h3>
                <p className="text-gray-500 mb-4 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors dark:bg-[#00e5FF] dark:text-[#0a0a0a] dark:hover:bg-[#00e5FF]/90"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-medium text-gray-900 dark:text-white">{filteredCategories.length}</span> of{" "}
                    <span className="font-medium text-gray-900 dark:text-white">{allCategories.length}</span> categories
                  </p>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredCategories.map((category) => (
                      <motion.div key={category.name} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <div
                          onClick={() => navigateToCategory(category.name)}
                          className="h-full overflow-hidden border rounded-lg hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-[#1A1A1A] cursor-pointer"
                        >
                          <div className="p-4 pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-md bg-purple-100 dark:bg-[#00e5FF]/20">
                                  <category.icon className="h-5 w-5 text-purple-600 dark:text-[#00e5FF]" />
                                </div>
                                <h3 className="text-xl font-semibold dark:text-white">{category.name}</h3>
                              </div>
                              {category.featured && (
                                <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-[#00e5FF]/20 dark:text-[#00e5FF] rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">{category.count} posts</span>
                              <span className="text-purple-600 dark:text-[#00e5FF] font-medium">View Category →</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCategories.map((category) => (
                      <motion.div key={category.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <div
                          onClick={() => navigateToCategory(category.name)}
                          className="overflow-hidden border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-[#1A1A1A] cursor-pointer"
                        >
                          <div className="flex items-center p-4">
                            <div className="p-3 rounded-md bg-purple-100 mr-4 dark:bg-[#00e5FF]/20">
                              <category.icon className="h-6 w-6 text-purple-600 dark:text-[#00e5FF]" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold dark:text-white">{category.name}</h3>
                                {category.featured && (
                                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-[#00e5FF]/20 dark:text-[#00e5FF] rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">{category.description}</p>
                            </div>
                            <div className="ml-4 flex items-center gap-4">
                              <span className="px-2 py-1 text-xs border border-gray-200 rounded-full dark:border-gray-700 dark:text-gray-300">
                                {category.count} posts
                              </span>
                              <button
                                className="text-sm text-purple-600 dark:text-[#00e5FF] px-3 py-1 hover:bg-purple-50 dark:hover:bg-[#00e5FF]/10 rounded"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigateToCategory(category.name)
                                }}
                              >
                                View
                              </button>
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

      {/* Featured Categories Section */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a]/80 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
              Explore our most popular categories with the highest engagement
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="tabs flex overflow-x-auto mb-8">
              {["academics", "technology", "research", "health", "events", "innovation"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-600 dark:border-[#00e5FF] dark:text-[#00e5FF]"
                      : "text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-[#00e5FF]"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="overflow-hidden border rounded-lg hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-[#1A1A1A] cursor-pointer"
                    onClick={() => navigateToCategory(activeTab)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}+${i}`}
                        alt={`${activeTab} post ${i}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold line-clamp-1 dark:text-white">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Article {i}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-2 dark:text-gray-400">
                        A sample article about {activeTab} showcasing the latest developments and insights.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#1A1A1A]"
                  onClick={() => navigateToCategory(activeTab)}
                >
                  View All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Suggest a new category or topic that you'd like to see on our platform. We're always looking to expand our
            content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-3 bg-white text-purple-600 dark:bg-[#1A1A1A] dark:text-[#00e5FF] font-medium rounded-md hover:bg-white/90 dark:hover:bg-[#1A1A1A]/90 w-full sm:w-auto"
              onClick={handleSuggestCategory}
            >
              Suggest a Category
            </button>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
