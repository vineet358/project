"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Bell,
  Menu,
  Search,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Home,
  BookOpen,
  Grid,
  Users,
  Mail,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock user data
const MOCK_USER = {
  uid: "mock-user-id",
  email: "user@example.com",
  displayName: "John Doe",
  photoURL: "https://picsum.photos/50/50",
}

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}

type Notification = {
  id: number
  message: string
  time: string
  read: boolean
  avatar?: string
}

type SearchResult = {
  id: number
  title: string
  type: "blog" | "tag"
  image?: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "/landing_homepage", icon: <Home className="h-4 w-4 mr-2" /> },
  { label: "Blogs", href: "/blogs", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { label: "Categories", href: "/categories", icon: <Grid className="h-4 w-4 mr-2" /> },
  { label: "About Us", href: "/about", icon: <Users className="h-4 w-4 mr-2" /> },
  { label: "Contact", href: "/contact", icon: <Mail className="h-4 w-4 mr-2" /> },
]

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: 'John commented on your post "Getting Started with Next.js"',
    time: "2 min ago",
    read: false,
    avatar: "https://picsum.photos/50/50",
  },
  {
    id: 2,
    message: "Sarah liked your article about Tailwind CSS",
    time: "1 hour ago",
    read: false,
    avatar: "https://picsum.photos/50/50",
  },
  {
    id: 3,
    message: "New feature: Dark mode is now available!",
    time: "3 hours ago",
    read: true,
  },
]

const mockSearchResults: SearchResult[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    type: "blog",
    image: "https://picsum.photos/50/50",
  },
  {
    id: 2,
    title: "Tailwind CSS Tips and Tricks",
    type: "blog",
    image: "https://picsum.photos/50/50",
  },
  { id: 3, title: "JavaScript", type: "tag" },
  {
    id: 4,
    title: "React Hooks Explained",
    type: "blog",
    image: "https://picsum.photos/50/50",
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [unreadNotifications, setUnreadNotifications] = useState(2)
  const [user, setUser] = useState<typeof MOCK_USER | null>(MOCK_USER) // Start with mock user
  const [loading, setLoading] = useState(false)
  const [usingMockAuth] = useState(true)

  const pathname = usePathname()
  const searchRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSearchResults.filter((result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([])
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Mock authentication handlers
  const handleLogin = () => {
    setUser(MOCK_USER)
  }

  const handleLogout = () => {
    setUser(null)
    setIsProfileOpen(false)
  }
  // Mark all notifications as read
  const markAllAsRead = () => {
    setUnreadNotifications(0)
  }

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const iconButtonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-[#0a0a0a] shadow-sm transition-colors duration-300 border-b-[0.5px] border-gray-200 dark:border-[#333333]">
      {usingMockAuth && process.env.NODE_ENV === "development" && (
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs text-center py-1">
          Using mock authentication - Firebase keys not configured
        </div>
      )}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 p-1">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 opacity-30 bg-gradient-to-r from-white to-transparent"
                />
                <span className="relative flex items-center justify-center h-full w-full text-white font-bold text-lg">
                  S
                </span>
              </div>
              <motion.span
                className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                SiteName
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-indigo-50 text-blue-600 dark:bg-[#00e5ff] dark:text-[#0a0a0a]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-500 dark:text-gray-300 dark:hover:bg-[#1A1A1A] dark:hover:text-[#00e5ff]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <motion.div
              className="relative"
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-[#333333] bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00e5ff] transition-all duration-200"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute mt-1 w-full bg-white dark:bg-[#1A1A1A] rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-[#333333] overflow-hidden"
                  >
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#0a0a0a] cursor-pointer flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        {result.image && (
                          <div className="flex-shrink-0 mr-3">
                            <Image
                              src={result.image || "https://picsum.photos/50/50"}
                              alt={result.title}
                              width={30}
                              height={30}
                              className="rounded object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <span className="text-gray-900 dark:text-gray-100">{result.title}</span>
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-[#00e5FF] text-blue-700 dark:text-black">
                            {result.type}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {/* Notification Bell */}
                {user && (
                      <motion.div
                      className="relative"
                      ref={notificationRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#00e5FF] dark:focus:ring-offset-gray-900 transition-all duration-200"
                        aria-label="Notifications"
                        variants={iconButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Bell className="h-5 w-5" />
                        <AnimatePresence>
                          {unreadNotifications > 0 && (
                            <motion.span
                              className="absolute top-0 right-0 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-medium flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              {unreadNotifications}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
        
                      {/* Notifications Dropdown */}
                      <AnimatePresence>
                        {isNotificationsOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1A1A1A] rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-[#333333] overflow-hidden"
                          >
                            <div className="px-4 py-2 border-b border-gray-200 dark:border-[#333333] flex justify-between items-center">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                              <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-600 dark:text-[#00e5FF] hover:text-blue-800 dark:hover:text-[#00aeff] font-medium"
                              >
                                Mark all as read
                              </button>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {mockNotifications.length > 0 ? (
                                mockNotifications.map((notification) => (
                                  <motion.div
                                    key={notification.id}
                                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                                      !notification.read ? "bg-indigo-50 dark:bg-blue-950/50" : ""
                                    }`}
                                  >
                                    <div className="flex items-start">
                                      {notification.avatar && (
                                        <div className="flex-shrink-0 mr-3">
                                          <Image
                                            src={notification.avatar || "https://picsum.photos/50/50"}
                                            alt="User Avatar"
                                            width={36}
                                            height={36}
                                            className="rounded-full"
                                          />
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                                          {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                      </div>
                                      {!notification.read && (
                                        <div className="ml-3 flex-shrink-0">
                                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        </div>
                                      )}
                                    </div>
                                    
                                  </motion.div>
                                ))
                              ) : (
                                <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                                  No notifications yet
                                </div>
                              )}
                            </div>
                            <div className="p-2 border-t-[0.5px]">
                              <button className="cursor-pointer dark:hover:text-blue-500 text-sm w-full justify-center">
                                View all notifications
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                )}

            {/* User Profile / Login */}
            <motion.div
              className="relative"
              ref={profileRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {!loading && (
                <>
                  {user ? (
                    <motion.button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                      aria-label="User menu"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-1 border-blue-500/30 transition-transform duration-200">
                        <Image
                          src={user.photoURL || "https://picsum.photos/50/50"}
                          alt={user.displayName || "User Avatar"}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30"
                          animate={{
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleLogin}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
                      whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login / Sign Up
                    </motion.button>
                  )}
                </>
              )}

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && user && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A1A] rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-[#333333] overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        href="/profile"
                        className=" px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        href="/settings"
                        className=" px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 5 }}>
                      <button
                        onClick={handleLogout}
                        className=" w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            className="flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-400"
              aria-expanded="false"
              variants={iconButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-[#333333] overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      pathname === item.href
                        ? "bg-indigo-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile search */}
            <motion.div
              className="px-4 py-3 border-t border-gray-200 dark:border-[#333333]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>

              {/* Mobile search results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    className="mt-2 bg-white dark:bg-[#333333] rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-[#333333]"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                      >
                        {result.image && (
                          <div className="flex-shrink-0 mr-3">
                            <Image
                              src={result.image || "https://picsum.photos/50/50"}
                              alt={result.title}
                              width={30}
                              height={30}
                              className="rounded object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <span className="text-gray-900 dark:text-gray-100">{result.title}</span>
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                            {result.type}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile user section */}
            <motion.div
              className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-4">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden border-1 border-blue-500">
                              <Image
                                src={user.photoURL || "/placeholder.svg?height=40&width=40"}
                                alt={user.displayName || "User Avatar"}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30"
                                animate={{
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium text-gray-800 dark:text-white">
                              {user.displayName || "User"}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {
                            user && (
                              <motion.button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 relative"
                            variants={iconButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && (
                              <motion.span
                                className="absolute top-0 right-0 h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-medium flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              >
                                {unreadNotifications}
                              </motion.span>
                            )}
                          </motion.button>
                            )
                          }
                        </div>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={handleLogin}
                          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Login / Sign Up
                        </motion.button>
                      </>
                    )}
                  </>
                )}
              </div>

              {user && (
                <div className="mt-3 px-2 space-y-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <Link
                      href="/profile"
                      className=" px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <Link
                      href="/settings"
                      className=" px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Settings
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <button
                      onClick={handleLogout}
                      className=" w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

