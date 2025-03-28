"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "../icons"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import PostCard from "../MidSection_Components/post-card"
const blogPosts = [
  {
    id: 1,
    category: "Study Tips",
    title: "Effective Study Techniques for Final Exams",
    author: "Prof. Sarah Johnson",
    date: "28 Mar 2024",
    readTime: "10 mins read",
    excerpt:
      "Discover proven methods to maximize your study sessions and retain information better for your upcoming exams.",
    imageSrc: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    category: "EdTech",
    title: "Digital Tools That Transform Classroom Engagement",
    author: "Michael Chen",
    date: "25 Mar 2024",
    readTime: "8 mins read",
    excerpt:
      "Explore the latest educational technology tools that are helping teachers create more interactive and engaging lessons.",
    imageSrc: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    category: "Wellness",
    title: "Balancing Academics and Mental Health",
    author: "Dr. Emily Rodriguez",
    date: "22 Mar 2024",
    readTime: "12 mins read",
    excerpt:
      "Learn strategies for maintaining your mental wellbeing while managing academic pressures and deadlines.",
    imageSrc: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 4,
    category: "Curriculum",
    title: "The Future of STEM Education",
    author: "Dr. James Wilson",
    date: "20 Mar 2024",
    readTime: "15 mins read",
    excerpt:
      "An in-depth look at how STEM education is evolving and preparing students for careers that don't yet exist.",
    imageSrc: "https://picsum.photos/400/300?random=4",
  },
  {
    id: 5,
    category: "Teaching",
    title: "Collaborative Learning Projects That Work",
    author: "Lisa Thompson",
    date: "18 Mar 2024",
    readTime: "7 mins read",
    excerpt:
      "Discover group project frameworks that foster genuine collaboration and ensure equal participation from all students.",
    imageSrc: "https://picsum.photos/400/300?random=5",
  },
  {
    id: 6,
    category: "Career",
    title: "Navigating College Applications Successfully",
    author: "Marcus Patel",
    date: "15 Mar 2024",
    readTime: "14 mins read",
    excerpt:
      "A comprehensive guide to the college application process, from selecting schools to writing compelling essays.",
    imageSrc: "https://picsum.photos/400/300?random=6",
  },
  {
    id: 7,
    category: "Teaching",
    title: "Inclusive Teaching Practices for Diverse Classrooms",
    author: "Dr. Aisha Washington",
    date: "12 Mar 2024",
    readTime: "9 mins read",
    excerpt:
      "Learn how to create an inclusive learning environment that addresses the needs of students from all backgrounds.",
    imageSrc: "https://picsum.photos/400/300?random=7",
  },
  {
    id: 8,
    category: "Study Tips",
    title: "Research Skills for High School Students",
    author: "Prof. Robert Kim",
    date: "10 Mar 2024",
    readTime: "11 mins read",
    excerpt:
      "Essential research methodologies and critical thinking skills that prepare students for college-level academic work.",
    imageSrc: "https://picsum.photos/400/300?random=8",
  },
  {
    id: 9,
    category: "EdTech",
    title: "Gamification in Education: Beyond Points and Badges",
    author: "Sophia Martinez",
    date: "8 Mar 2024",
    readTime: "10 mins read",
    excerpt:
      "Explore meaningful ways to incorporate game elements into your curriculum to boost student motivation and learning.",
    imageSrc: "https://picsum.photos/400/300?random=9",
  },
];



// Get unique categories from blog posts
const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts by category
  const filteredPosts =
    activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <section className="py-8 px-6 md:px-10 lg:px-12 bg-background dark:bg-[#0a0a0a] text-foreground dark:text-[#F5F5F5] transition-colors duration-200 ">
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center mb-12 mt-18 text-center">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-2">Explore by Categories</h1>
          <p className="text-foreground/80 dark:text-[#F5F5F5]/80 max-w-2xl">
            Resources, insights, and strategies for students and teachers to excel in the modern educational landscape.
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
              activeCategory === category
                ? "bg-[#b2f2bb] dark:bg-[#0A1A2F] text-black dark:text-white "
                : "bg-primary/10 dark:bg-[#0A1A2F]/20 text-primary dark:text-[#00E5FF] hover:bg-primary/20 dark:hover:bg-[#0A1A2F]/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort options and results count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-foreground/70 dark:text-[#F5F5F5]/70">
          Showing {currentPosts.length} of {filteredPosts.length} articles
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background dark:bg-[#1A1A1A] border border-primary/20 dark:border-[#00E5FF]/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#00E5FF]"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Popular">Popular</option>
          </select>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPosts.map((post) => ( // Changed from blogPosts to currentPosts
          <PostCard
            key={post.id}
            category={post.category}
            title={post.title}
            author={post.author}
            date={post.date}
            readTime={post.readTime}
            excerpt={post.excerpt}
            imageSrc={post.imageSrc}
          />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors disabled:opacity-50 text-primary dark:text-[#00E5FF]"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                currentPage === index + 1
                  ? "bg-[#b2f2bb] dark:bg-[#0A1A2F] text-black dark:text-white "
                  : "hover:bg-primary/10 dark:hover:bg-[#0A1A2F]/30 text-foreground dark:text-[#F5F5F5]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors disabled:opacity-50 text-primary dark:text-[#00E5FF]"
            aria-label="Next page"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  )
}

