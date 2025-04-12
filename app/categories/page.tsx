"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
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
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [postCount, setPostCount] = useState<[number, number]>([0, 100])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "oldest" | "a-z" | "z-a">("popular")
  const [mounted, setMounted] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
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

  if (!mounted) return null

  return (
    <div className="min-h-screen ">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue to-purple py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Explore Categories</h1>
            <p className="text-gray-600 text-lg">
              Discover content organized by topics that matter to you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-auto md:min-w-[300px] lg:min-w-[400px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search categories..."
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <button
              className="md:hidden flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-5 w-5" />
              Filters
              {activeFilters > 0 && (
                <span className="ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-sm">
                  {activeFilters}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <ArrowUpDown className="h-5 w-5" />
                Sort
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <div className="px-3 py-1 text-sm text-gray-500">Sort by</div>
                    <hr className="my-1" />
                    {["popular", "newest", "oldest", "a-z", "z-a"].map((option) => (
                      <button
                        key={option}
                        className={`w-full px-3 py-2 text-left text-sm ${
                          sortBy === option ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setSortBy(option as any)
                          setIsSortOpen(false)
                        }}
                      >
                        {option.charAt(0).toUpperCase() + option.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-5 w-5" />
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <button
                className={`p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-1/4 lg:w-1/5 space-y-6 ${showMobileFilters ? "block" : "hidden"} md:block`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {activeFilters > 0 && (
                <button
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Featured</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="custom-switch">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  />
                  <span className="custom-switch-slider" />
                </div>
                <span className="text-sm">Show featured only</span>
              </label>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="overflow-y-auto h-[200px] pr-4">
                {allCategories.map((category) => (
                  <label
                    key={category.name}
                    className="flex items-center gap-2 py-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category.name])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category.name))
                        }
                      }}
                      className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 custom-checkbox"
                    />
                    <span className="flex-1 text-sm">{category.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Post Count</h3>
                <span className="text-xs text-gray-500">
                  {postCount[0]} - {postCount[1]}
                </span>
              </div>
              <input
                type="range"
                className="custom-slider"
                min="0"
                max="100"
                value={postCount[1]}
                onChange={(e) => setPostCount([postCount[0], parseInt(e.target.value)])}
              />
            </div>

            <button
              className="w-full md:hidden mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>

          {/* Categories Grid/List */}
          <div className="md:w-3/4 lg:w-4/5">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No categories found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-500">
                    Showing <span className="font-medium text-gray-900">{filteredCategories.length}</span> categories
                  </p>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredCategories.map((category) => (
                      <motion.div key={category.name} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <Link href={`/category/${category.name.toLowerCase()}`}>
                          <div className="custom-card h-full p-6 hover:shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-md bg-blue-100">
                                  <category.icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                              </div>
                              {category.featured && (
                                <span className="custom-badge">Featured</span>
                              )}
                            </div>
                            <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{category.count} posts</span>
                              <span className="text-blue-600 font-medium">View →</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCategories.map((category) => (
                      <motion.div key={category.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <Link href={`/category/${category.name.toLowerCase()}`}>
                          <div className="custom-card p-4 hover:shadow-md">
                            <div className="flex items-center">
                              <div className="p-3 rounded-md bg-blue-100 mr-4">
                                <category.icon className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="text-lg font-semibold">{category.name}</h3>
                                  {category.featured && <span className="custom-badge">Featured</span>}
                                </div>
                                <p className="text-gray-500 text-sm">{category.description}</p>
                              </div>
                              <div className="ml-4 flex items-center gap-4">
                                <span className="custom-badge">{category.count} posts</span>
                                <button className="text-blue-600 hover:text-blue-700 text-sm">
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Featured Categories */}
        <section className="bg-gray-100 py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Popular Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our most popular categories with the highest engagement
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex overflow-x-auto pb-2 mb-8">
                {["academics", "technology", "research", "health", "events", "innovation"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="custom-card overflow-hidden">
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}+${i}`}
                        alt={`${activeTab} post ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Article {i}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        A sample article about {activeTab} showcasing the latest developments.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  View All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Posts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Suggest a new category or topic that you'd like to see on our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 font-medium">
                Suggest a Category
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white rounded-lg hover:bg-white/10 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}