"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bookmark,
  Heart,
  MessageSquare,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  ThumbsUp,
  Copy,
  ChevronLeft,
  MoreHorizontal,
  Tag,
} from "lucide-react"

// Mock blog post data
const blogPost = {
  id: 1,
  title: "The Future of AI in Education: Transforming Learning Experiences",
  excerpt:
    "Exploring how artificial intelligence is transforming the educational landscape and creating new opportunities for personalized learning experiences.",
  content: `
    <h2>Introduction</h2>
    <p>Artificial Intelligence (AI) is rapidly transforming various sectors, and education is no exception. As we navigate the digital age, AI technologies are increasingly being integrated into educational systems, promising to revolutionize how we teach and learn. This blog post explores the current state of AI in education, its potential benefits, challenges, and what the future might hold.</p>
    
    <h2>The Current State of AI in Education</h2>
    <p>AI is already making significant inroads in educational settings. From adaptive learning platforms to automated grading systems, AI tools are helping educators streamline administrative tasks and personalize learning experiences. Here are some key applications:</p>
    
    <ul>
      <li><strong>Personalized Learning:</strong> AI algorithms analyze student performance data to create customized learning paths, adapting content difficulty and pacing to individual needs.</li>
      <li><strong>Intelligent Tutoring Systems:</strong> Virtual tutors provide real-time feedback and assistance, helping students work through problems at their own pace.</li>
      <li><strong>Automated Assessment:</strong> AI can grade objective assessments instantly and is increasingly capable of evaluating subjective responses, freeing up teacher time for more meaningful interactions.</li>
      <li><strong>Administrative Efficiency:</strong> AI tools help with scheduling, attendance tracking, and other administrative tasks, reducing the bureaucratic burden on educators.</li>
    </ul>
    
    <h2>Benefits of AI in Education</h2>
    <p>The integration of AI in education offers numerous potential benefits:</p>
    
    <h3>1. Personalization at Scale</h3>
    <p>Perhaps the most significant promise of AI is its ability to deliver personalized education to large numbers of students simultaneously. By analyzing learning patterns and adapting content accordingly, AI can help address the diverse needs of students in ways that would be impossible for a single teacher managing a classroom of 30+ students.</p>
    
    <h3>2. Accessibility and Inclusion</h3>
    <p>AI tools can make education more accessible to students with disabilities or those in remote areas. Text-to-speech, speech-to-text, and translation features can break down barriers for students with different needs or language backgrounds.</p>
    
    <h3>3. Real-time Feedback</h3>
    <p>Immediate feedback is crucial for effective learning. AI can provide instant responses to student work, helping them understand mistakes and correct misconceptions before they become entrenched.</p>
    
    <h3>4. Data-Driven Insights</h3>
    <p>AI systems can analyze vast amounts of educational data to identify patterns and trends, helping educators and administrators make informed decisions about curriculum design, teaching methods, and resource allocation.</p>
    
    <h2>Challenges and Concerns</h2>
    <p>Despite its promise, the integration of AI in education faces several challenges:</p>
    
    <h3>1. Privacy and Data Security</h3>
    <p>The collection and analysis of student data raise significant privacy concerns. Educational institutions must ensure robust data protection measures and transparent policies regarding data usage.</p>
    
    <h3>2. Equity and Access</h3>
    <p>There's a risk that AI could exacerbate existing educational inequalities if access to AI-enhanced learning is limited to well-resourced schools or students from privileged backgrounds.</p>
    
    <h3>3. The Human Element</h3>
    <p>Education is inherently social, and human connections are crucial for developing soft skills, emotional intelligence, and critical thinking. AI should complement, not replace, human teachers and peer interactions.</p>
    
    <h3>4. Technical Limitations</h3>
    <p>Current AI systems still have limitations in understanding context, nuance, and creative expression, which are essential aspects of higher-order learning.</p>
    
    <h2>The Future of AI in Education</h2>
    <p>Looking ahead, we can anticipate several exciting developments in AI-enhanced education:</p>
    
    <h3>1. Immersive Learning Experiences</h3>
    <p>AI combined with virtual and augmented reality could create immersive, interactive learning environments that make abstract concepts tangible and engaging.</p>
    
    <h3>2. Lifelong Learning Companions</h3>
    <p>AI assistants could evolve into lifelong learning companions, helping individuals navigate educational and career transitions throughout their lives.</p>
    
    <h3>3. Predictive Analytics</h3>
    <p>Advanced AI systems might predict learning difficulties before they manifest, enabling early intervention and support for struggling students.</p>
    
    <h3>4. Collaborative Intelligence</h3>
    <p>The future likely lies in collaborative intelligence, where human educators and AI systems work together, leveraging their respective strengths to create optimal learning experiences.</p>
    
    <h2>Conclusion</h2>
    <p>AI has the potential to transform education in profound ways, making it more personalized, accessible, and effective. However, realizing this potential requires thoughtful implementation that addresses ethical concerns, ensures equitable access, and maintains the essential human elements of education.</p>
    
    <p>As we navigate this technological revolution, the goal should be to harness AI as a tool that empowers both educators and learners, rather than as a replacement for human connection and judgment. By striking this balance, we can work toward an educational future that combines the best of human and artificial intelligence to prepare students for a rapidly changing world.</p>
  `,
  image: "/placeholder.svg?height=600&width=1200",
  author: "Dr. Sarah Johnson",
  authorAvatar: "/placeholder.svg?height=100&width=100",
  authorBio:
    "Dr. Sarah Johnson is a Professor of Educational Technology with over 15 years of experience researching the intersection of AI and education. She has published numerous papers on adaptive learning systems and holds a Ph.D. in Computer Science from MIT.",
  date: "May 15, 2023",
  category: "Technology",
  readTime: "8 min read",
  likes: 245,
  comments: 32,
  tags: ["AI", "Education", "Technology", "Future", "Machine Learning", "EdTech"],
}

// Mock related posts
const relatedPosts = [
  {
    id: 2,
    title: "How Virtual Reality is Changing Classroom Experiences",
    image: "/placeholder.svg?height=150&width=250",
    date: "June 2, 2023",
    category: "Technology",
  },
  {
    id: 3,
    title: "The Role of Data Analytics in Improving Student Outcomes",
    image: "/placeholder.svg?height=150&width=250",
    date: "May 28, 2023",
    category: "Education",
  },
  {
    id: 4,
    title: "Ethical Considerations in Educational AI Development",
    image: "/placeholder.svg?height=150&width=250",
    date: "May 20, 2023",
    category: "Ethics",
  },
]

// Mock comments
const mockComments = [
  {
    id: 1,
    user: "Michael Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    date: "May 16, 2023",
    content:
      "This is a fascinating overview of AI in education. I particularly appreciate the balanced approach, acknowledging both the potential benefits and the challenges. As an educator, I'm excited about the possibilities for personalization but concerned about maintaining the human connection that's so vital to learning.",
    likes: 12,
    replies: [
      {
        id: 101,
        user: "Dr. Sarah Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        date: "May 16, 2023",
        content:
          "Thank you for your thoughtful comment, Michael. You raise an important point about the human connection. I believe the most successful implementations of AI in education will be those that enhance rather than replace human interaction.",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    user: "Emily Rodriguez",
    userAvatar: "/placeholder.svg?height=40&width=40",
    date: "May 17, 2023",
    content:
      "I work in EdTech and we're currently developing an adaptive learning platform. The privacy concerns you mentioned are something we grapple with daily. It's a delicate balance between gathering enough data to make the system effective and respecting student privacy. Would love to hear more about best practices in this area.",
    likes: 9,
    replies: [],
  },
  {
    id: 3,
    user: "David Kim",
    userAvatar: "/placeholder.svg?height=40&width=40",
    date: "May 18, 2023",
    content:
      "As a parent, I'm both excited and concerned about AI in my children's education. The personalization aspect sounds promising, especially for my daughter who's advanced in math but struggles with reading. However, I worry about screen time and data collection. How can parents stay informed and involved in these technological shifts?",
    likes: 15,
    replies: [
      {
        id: 102,
        user: "Lisa Thompson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        date: "May 18, 2023",
        content:
          "David, I share your concerns. I've found that staying engaged with the school's technology decisions and asking for transparency about data usage policies has been helpful. Also, some AI tools actually allow for parent dashboards where you can monitor your child's activity and progress.",
        likes: 7,
      },
    ],
  },
]

// Popular tags
const popularTags = [
  { tag: "AI", count: 42 },
  { tag: "Education", count: 38 },
  { tag: "Technology", count: 35 },
  { tag: "Machine Learning", count: 27 },
  { tag: "EdTech", count: 24 },
  { tag: "Future", count: 19 },
  { tag: "Personalization", count: 16 },
  { tag: "Data Privacy", count: 14 },
  { tag: "Virtual Reality", count: 12 },
  { tag: "Adaptive Learning", count: 10 },
]

export default function BlogPostPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(mockComments)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(blogPost.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Mock toast function
  const toast = (options: { title: string; description: string; duration: number }) => {
    console.log("Toast:", options)
    // In a real app, you would implement a toast notification system
  }

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Check system preference for theme
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark")
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Apply theme class to document
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [theme, mounted])

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Handle like button click
  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  // Handle bookmark button click
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked
        ? "This post has been removed from your bookmarks"
        : "This post has been saved to your bookmarks",
      duration: 3000,
    })
  }

  // Handle share button click
  const handleShare = (platform: string) => {
    // In a real app, this would share to the actual platform
    toast({
      title: `Shared on ${platform}`,
      description: `This post has been shared on ${platform}`,
      duration: 3000,
    })
    setShowShareOptions(false)
  }

  // Handle copy link
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "The link to this post has been copied to your clipboard",
        duration: 3000,
      })
    }
    setShowShareOptions(false)
  }

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      id: comments.length + 1,
      user: "John Doe",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: commentText,
      likes: 0,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")

    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully",
      duration: 3000,
    })
  }

  // Handle reply submission
  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      user: "John Doe",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: replyText,
      likes: 0,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyText("")
    setReplyingTo(null)

    toast({
      title: "Reply posted",
      description: "Your reply has been posted successfully",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <main className="flex-1">
        {/* Back to blogs link */}
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blogs
          </Link>
        </div>

        {/* Blog Content */}
        <article className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Social Sharing - Desktop (Left Side) */}
            <div className="hidden lg:flex flex-col items-center sticky top-24 h-fit space-y-4 pt-10">
              <button
                className={`rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${isLiked ? "text-red-500" : ""}`}
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                <span className="sr-only">Like</span>
              </button>
              <span className="text-xs font-medium">{likeCount}</span>

              <button
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </button>

              {showShareOptions && (
                <div className="flex flex-col space-y-2 items-center">
                  <button
                    className="rounded-full p-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                    onClick={() => handleShare("Facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-full p-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                    onClick={() => handleShare("Twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-full p-2 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
                    onClick={() => handleShare("LinkedIn")}
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              )}

              <button
                className={`rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${isBookmarked ? "text-gray-900 dark:text-gray-50" : ""}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                <span className="sr-only">Bookmark</span>
              </button>

              <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Comment</span>
              </button>
              <span className="text-xs font-medium">{blogPost.comments}</span>
            </div>

            {/* Main Content */}
            <div className="lg:flex-1">
              {/* Category and Date */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {blogPost.category}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {blogPost.date} · {blogPost.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blogPost.title}</h1>

              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={blogPost.authorAvatar || "/placeholder.svg"}
                    alt={blogPost.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{blogPost.author}</div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-[16/9] w-full mb-8 rounded-xl overflow-hidden">
                <Image
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Social Sharing - Mobile */}
              <div className="flex lg:hidden items-center justify-between mb-8 border-y border-gray-200 dark:border-gray-800 py-3">
                <div className="flex items-center space-x-4">
                  <button
                    className={`rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${isLiked ? "text-red-500" : ""}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    <span className="sr-only">Like</span>
                  </button>
                  <span className="text-sm">{likeCount}</span>

                  <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <MessageSquare className="h-5 w-5" />
                    <span className="sr-only">Comment</span>
                  </button>
                  <span className="text-sm">{blogPost.comments}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </button>

                    {showShareOptions && (
                      <div className="absolute right-0 z-10 mt-2 p-2 bg-white dark:bg-gray-900 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                          <button
                            className="rounded-full p-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                            onClick={() => handleShare("Facebook")}
                          >
                            <Facebook className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full p-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                            onClick={() => handleShare("Twitter")}
                          >
                            <Twitter className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full p-2 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
                            onClick={() => handleShare("LinkedIn")}
                          >
                            <Linkedin className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={handleCopyLink}
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    className={`rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${isBookmarked ? "text-gray-900 dark:text-gray-50" : ""}`}
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                    <span className="sr-only">Bookmark</span>
                  </button>
                </div>
              </div>

              {/* Blog Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2.5 py-0.5 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Bio - Mobile */}
              <div className="lg:hidden bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6 mb-10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={blogPost.authorAvatar || "/placeholder.svg"}
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">About the Author</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{blogPost.author}</p>
                  </div>
                </div>
                <p className="text-sm">{blogPost.authorBio}</p>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
                <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-10">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Your Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Add a comment..."
                        className="min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:ring-gray-300 mb-3 resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={3}
                      />
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-8">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 dark:border-gray-800 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={comment.userAvatar || "/placeholder.svg"}
                            alt={comment.user}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="font-medium">{comment.user}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{comment.date}</span>
                            </div>
                            <button className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm mb-3">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <button className="inline-flex items-center rounded-md bg-transparent px-3 py-1 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Like ({comment.likes})
                            </button>
                            <button
                              className="inline-flex items-center rounded-md bg-transparent px-3 py-1 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Reply
                            </button>
                          </div>

                          {/* Reply Form */}
                          {replyingTo === comment.id && (
                            <div className="mt-4 flex items-start space-x-4">
                              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                <Image
                                  src="/placeholder.svg?height=32&width=32"
                                  alt="Your Avatar"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <textarea
                                  placeholder="Write a reply..."
                                  className="min-h-[60px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:ring-gray-300 mb-2 resize-none text-sm"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  rows={2}
                                />
                                <div className="flex justify-end space-x-2">
                                  <button
                                    className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs font-medium hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                                    onClick={() => setReplyingTo(null)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => handleReplySubmit(comment.id)}
                                    disabled={!replyText.trim()}
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="pt-4">
                                  <div className="flex items-start space-x-3">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image
                                        src={reply.userAvatar || "/placeholder.svg"}
                                        alt={reply.user}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <div>
                                          <span className="font-medium text-sm">{reply.user}</span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                            {reply.date}
                                          </span>
                                        </div>
                                        <button className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                                          <MoreHorizontal className="h-3 w-3" />
                                        </button>
                                      </div>
                                      <p className="text-sm">{reply.content}</p>
                                      <button className="inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800 mt-1">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        Like ({reply.likes})
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Author Bio */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-bold">About the Author</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
                        <Image
                          src={blogPost.authorAvatar || "/placeholder.svg"}
                          alt={blogPost.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg">{blogPost.author}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{blogPost.authorBio}</p>
                  </div>
                  <div className="flex items-center p-6 pt-0">
                    <button className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800">
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-bold">Related Posts</h3>
                  </div>
                  <div className="p-6 pt-0 space-y-4">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="flex items-start space-x-3 group">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-bold flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-gray-900 dark:text-gray-50" />
                      Popular Tags
                    </h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map(({ tag, count }) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-2.5 py-0.5 text-xs font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {tag} ({count})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-700/50 border-none shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-bold">Subscribe to Newsletter</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get the latest posts delivered right to your inbox
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex flex-col space-y-2">
                      <input
                        placeholder="Your email address"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:ring-gray-300"
                      />
                      <button className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 w-full">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
