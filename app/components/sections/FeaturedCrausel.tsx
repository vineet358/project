"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [direction, setDirection] = useState(0) // 1 for next, -1 for prev

  // Navigation with animation direction
  const navigatePost = (nav: "next" | "prev" | number) => {
    let newIndex
    
    if (typeof nav === "number") {
      newIndex = nav
      setDirection(nav > currentPostIndex ? 1 : -1)
    } else {
      if (nav === "next") {
        newIndex = (currentPostIndex + 1) % recentPosts.length
        setDirection(1)
      } else {
        newIndex = (currentPostIndex - 1 + recentPosts.length) % recentPosts.length
        setDirection(-1)
      }
    }
    
    setCurrentPostIndex(newIndex)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      navigatePost("next")
    }, 6000)

    return () => clearInterval(timer)
  }, [currentPostIndex])

  const currentPost = recentPosts[currentPostIndex]

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <div className="bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Hero Section with Post Carousel */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden mt-4 mx-4 rounded-xl">
        {/* Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPostIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Image with overlay */}
            <div className="relative h-full w-full">
              <img 
                src={currentPost.imageSrc || "/placeholder.svg"} 
                alt={currentPost.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end pb-8">
          <div className="relative z-20 w-full px-6">
            {/* Post Content */}
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 items-start md:items-end">
              {/* Main Post Content - Left Side */}
              <div className="text-white overflow-hidden relative max-w-2xl w-full md:w-auto">
                {/* Category Badge */}
                <motion.div 
                  className="flex items-center space-x-2 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {currentPost.category}
                  </span>
                </motion.div>

                {/* Dynamic text content with Framer Motion */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPostIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.5 }
                    }}
                  >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentPost.title}</h1>
                    <p className="hidden md:block text-gray-200 mb-6 text-sm md:text-base">{currentPost.excerpt}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Author Info - Right Side */}
              <motion.div 
                className="bg-transparent p-4 text-white w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
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
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              {/* Pagination Dots */}
              <div className="flex space-x-2">
                {recentPosts.map((_, dotIndex) => (
                  <motion.button
                    key={dotIndex}
                    onClick={() => navigatePost(dotIndex)}
                    className={`h-3 rounded-full ${
                      dotIndex === currentPostIndex
                        ? "bg-blue-400"
                        : "bg-white/50 hover:bg-white/80 hover:shadow-md"
                    }`}
                    initial={false}
                    animate={{
                      width: dotIndex === currentPostIndex ? 36 : 12,
                      scale: dotIndex === currentPostIndex ? 1.1 : 1,
                    }}
                    whileHover={{
                      scale: dotIndex !== currentPostIndex ? 1.05 : 1.1,
                      width: dotIndex !== currentPostIndex ? 16 : 36,
                    }}
                    transition={{ duration: 0.3 }}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                  ></motion.button>
                ))}
              </div>

              {/* Arrow Navigation */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigatePost("prev")}
                  className="p-2 rounded-full bg-white/10 text-white"
                  aria-label="Previous post"
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigatePost("next")}
                  className="p-2 rounded-full bg-white/10 text-white"
                  aria-label="Next post"
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizonLandingPage