"use client"

import { useEffect, useState } from "react"
import { Calendar, Bell, LogOut, Mail, Image, Clock, Home, Folder, BarChart2 } from "lucide-react"

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const animationClass = (delay: number) => (isLoaded ? `animate-fade-in delay-${delay}` : "opacity-0")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`w-16 bg-white shadow-sm flex flex-col items-center py-6 space-y-8 ${animationClass(100)}`}>
        <div className="mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-md hover-icon"></div>
        </div>
        <div className="flex flex-col space-y-8 items-center">
          <button className="w-8 h-8 text-gray-500 hover:text-blue-500 transition-colors">
            <Home className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 text-gray-500 hover:text-blue-500 transition-colors">
            <Mail className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 text-gray-500 hover:text-blue-500 transition-colors">
            <Image className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 text-gray-500 hover:text-blue-500 transition-colors">
            <Clock className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 text-gray-500 hover:text-blue-500 transition-colors">
            <Folder className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 text-gray-500 hover:text-blue-500 transition-colors">
            <BarChart2 className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-auto">
          <button className="w-8 h-8 text-gray-500 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <header className={`flex justify-between items-center mb-8 ${animationClass(200)}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Today: October 29</span>
            </div>

            <div className="relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-medium">
                HQ
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div className={`bg-white rounded-xl shadow-sm p-8 mb-6 ${animationClass(300)}`}>
          <div className="flex">
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-gray-700">
                Welcome Back! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-gray-500 mt-1">Good evening!</p>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-700">Henry Qells</h2>
                <p className="text-gray-500 text-sm">Writer/Author</p>
              </div>

              <div className="mt-6 flex space-x-6">
                <div>
                  <div className="font-bold text-xl">32</div>
                  <div className="text-xs text-gray-400">Total Post</div>
                </div>
                <div>
                  <div className="font-bold text-xl">23K</div>
                  <div className="text-xs text-gray-400">Subscriber</div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <img src="/placeholder.svg?height=200&width=200" alt="Person reading" className="h-48 animate-float" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-4 gap-6 mb-6 ${animationClass(400)}`}>
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover-card">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Post</div>
              <div className="text-xl font-bold text-blue-500">154</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover-card">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Pages</div>
              <div className="text-xl font-bold text-purple-500">56</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover-card">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Comments</div>
              <div className="text-xl font-bold text-green-500">34,267</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover-card">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Likes</div>
              <div className="text-xl font-bold text-red-500">65.26K</div>
            </div>
          </div>
        </div>

        {/* Visitors and Recent Blogs */}
        <div className="grid grid-cols-3 gap-6">
          {/* Visitors */}
          <div className={`bg-white rounded-xl shadow-sm p-6 ${animationClass(500)}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-700">Visitors</h3>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">D</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">M</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Y</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-bold">250K</div>
                <div className="text-sm text-gray-500">New Visitors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500 flex items-center">
                  2.5%
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                <div className="text-sm text-gray-500">Visitors Increase</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Old vs New Visitors</div>
              <div className="h-64 relative">
                {/* Simple chart using Tailwind CSS */}
                <div className="absolute inset-0 flex items-end">
                  {/* Chart background grid */}
                  <div className="w-full h-full absolute">
                    <div className="border-b border-gray-200 h-1/4 w-full"></div>
                    <div className="border-b border-gray-200 h-1/4 w-full"></div>
                    <div className="border-b border-gray-200 h-1/4 w-full"></div>
                    <div className="border-b border-gray-200 h-1/4 w-full"></div>
                  </div>

                  {/* Blue line chart */}
                  <div className="w-full h-full absolute">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Blue area */}
                      <path
                        d="M0,80 C10,70 20,60 30,50 C40,40 50,60 60,50 C70,40 80,30 90,40 L100,50 L100,100 L0,100 Z"
                        fill="rgba(59, 130, 246, 0.1)"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  {/* Green line chart */}
                  <div className="w-full h-full absolute">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Green area */}
                      <path
                        d="M0,90 C10,80 20,70 30,80 C40,90 50,70 60,60 C70,50 80,60 90,70 L100,60 L100,100 L0,100 Z"
                        fill="rgba(16, 185, 129, 0.1)"
                        stroke="rgb(16, 185, 129)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400 pt-2">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Nov</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-500">This year</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-500">Previous year</span>
              </div>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className={`col-span-2 bg-white rounded-xl shadow-sm p-6 ${animationClass(600)}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-700">Recent Blogs</h3>
              <button className="flex items-center space-x-1 bg-blue-50 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-100 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New</span>
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Clever Ways to Celebrate Christmas...",
                  comments: 232,
                  views: 3566,
                  image: "/placeholder.svg?height=60&width=80",
                },
                {
                  id: 2,
                  title: "Setting Intentions Instead of Resolutions...",
                  comments: 25,
                  views: 565,
                  image: "/placeholder.svg?height=60&width=80",
                },
                {
                  id: 3,
                  title: "Physical Development Activities for...",
                  comments: 36,
                  views: 165,
                  image: "/placeholder.svg?height=60&width=80",
                },
                {
                  id: 4,
                  title: "Liki Trike - A Compact Trike with the Big...",
                  comments: 545,
                  views: 9158,
                  image: "/placeholder.svg?height=60&width=80",
                },
                {
                  id: 5,
                  title: "How Doona and Liki Make For The Perfe...",
                  comments: 99,
                  views: 4582,
                  image: "/placeholder.svg?height=60&width=80",
                },
                {
                  id: 6,
                  title: "How Doona and Liki Make For The Perfe...",
                  comments: 99,
                  views: 4580,
                  image: "/placeholder.svg?height=60&width=80",
                },
              ].map((blog, index) => (
                <div
                  key={blog.id}
                  className={`flex space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${animationClass(600 + index * 50)}`}
                >
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-20 h-14 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700 mb-2">{blog.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        {blog.comments} Comments
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {blog.views} Views
                      </div>
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for animations and effects */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-650 { animation-delay: 650ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-750 { animation-delay: 750ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-850 { animation-delay: 850ms; }
        .delay-900 { animation-delay: 900ms; }
        
        .hover-card {
          transition: all 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  )
}