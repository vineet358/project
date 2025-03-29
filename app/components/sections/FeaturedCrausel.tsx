"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const recentPosts = [
  {
    id: 1,
    category: "Campus Life",
    title: "Campus Sustainability Initiatives: Making a Difference",
    author: "Environmental Committee",
    date: "June 12, 2023",
    readTime: "5 min",
    excerpt: "How our campus is working towards a greener future with innovative sustainability programs",
    imageSrc: "https://picsum.photos/1200/600?random=10",
  },
  {
    id: 2,
    category: "Technology",
    title: "The Impact of Virtual Reality on Learning Outcomes",
    author: "Tech Research Team",
    date: "June 10, 2023",
    readTime: "7 min",
    excerpt: "New study reveals significant improvements in student engagement with VR technology",
    imageSrc: "https://picsum.photos/seed/1/1200/600",
  },
  {
    id: 3,
    category: "Alumni",
    title: "Alumni Spotlight: Leading Innovation in Healthcare",
    author: "Alumni Association",
    date: "June 08, 2023",
    readTime: "9 min",
    excerpt: "Meet the graduate who's revolutionizing patient care with AI-powered diagnostics",
    imageSrc: "https://picsum.photos/seed/2/1200/600",
  },
  {
    id: 4,
    category: "Health",
    title: "Student Mental Health: Resources and Support",
    author: "Wellness Center",
    date: "July 12, 2023",
    readTime: "5 min",
    excerpt: "Comprehensive guide to mental health services available to all students",
    imageSrc: "https://picsum.photos/seed/3/1200/600",
  }
]

const HorizonLandingPage = () => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [textTransition, setTextTransition] = useState<"enter" | "exit" | "">("")

  // Navigation with text transition
  const navigatePost = (direction: "next" | "prev" | number) => {
    // First exit the current text
    setTextTransition("exit")

    // After text exits, change the content and enter new text
    setTimeout(() => {
      let newIndex
      if (typeof direction === "number") {
        newIndex = direction
      } else if (direction === "next") {
        newIndex = (currentPostIndex + 1) % recentPosts.length
      } else {
        newIndex = (currentPostIndex - 1 + recentPosts.length) % recentPosts.length
      }

      setCurrentPostIndex(newIndex)
      setTextTransition("enter")
    }, 300) // Match this with the CSS transition duration
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      navigatePost("next")
    }, 6000)

    return () => clearInterval(timer)
  }, [currentPostIndex])

  // Reset the text transition class after animation completes
  useEffect(() => {
    if (textTransition === "enter") {
      const timer = setTimeout(() => {
        setTextTransition("")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [textTransition])

  const currentPost = recentPosts[currentPostIndex]

  return (
    <div className="bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Hero Section with Post Carousel */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden mt-4 mx-4 rounded-xl">
        {/* Background Images */}
        {recentPosts.map((post, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 
              ${index === currentPostIndex ? "opacity-100" : "opacity-0"}`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Image with overlay */}
            <div className="relative h-full w-full">
              <img src={post.imageSrc || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
            </div>
          </div>
        ))}

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end pb-8">
          <div className="relative z-20 w-full px-6">
            {/* Post Content */}
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 items-start md:items-end">
              {/* Main Post Content - Left Side */}
              <div className="text-white overflow-hidden relative max-w-2xl w-full md:w-auto">
                {/* Category Badge */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {currentPost.category}
                  </span>
                </div>

                {/* Dynamic text content with transitions */}
                <div
                  key={currentPostIndex}
                  className={`transition-all duration-500 transform
                    ${textTransition === "exit" ? "opacity-0 scale-95 translate-y-4" : ""}
                    ${textTransition === "enter" ? "opacity-100 scale-100 translate-y-0" : ""}
                    ${textTransition === "" ? "opacity-100 scale-100 translate-y-0" : ""}`}
                >
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentPost.title}</h1>
                  <p className="hidden md:block text-gray-200 mb-6 text-sm md:text-base">{currentPost.excerpt}</p>
                </div>
              </div>

              {/* Author Info - Right Side */}
              <div className="bg-transparent p-4 text-white w-full md:w-auto">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full w-12 h-12 overflow-hidden relative bg-gray-300">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-md font-semibold">{currentPost.author}</span>
                    <span className="block text-xs text-gray-300">
                      {currentPost.date} • {currentPost.readTime} read
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              {/* Pagination Dots */}
              <div className="flex space-x-2">
                {recentPosts.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => navigatePost(dotIndex)}
                    className={`h-3 rounded-full transition-all duration-500 ease-in-out transform
                      ${
                        dotIndex === currentPostIndex
                          ? "bg-blue-400 w-9 shadow-lg scale-110"
                          : "bg-white/50 w-3 hover:bg-white/80 hover:w-4 hover:scale-105 hover:shadow-md"
                      }`}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                  ></button>
                ))}
              </div>

              {/* Arrow Navigation */}
              <div className="flex space-x-2">
                <button
                  onClick={() => navigatePost("prev")}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                  aria-label="Previous post"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigatePost("next")}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                  aria-label="Next post"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizonLandingPage

