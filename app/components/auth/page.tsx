"use client"

import { FormEvent, useState } from "react"
import { Eye, EyeOff, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    username?: string
    confirmPassword?: string
  }>({})

  const validateLoginForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignupForm = () => {
    const newErrors: {
      email?: string
      password?: string
      username?: string
      confirmPassword?: string
    } = {}

    if (!username) {
      newErrors.username = "Username is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateLoginForm()) {
      console.log("Login attempt with:", { email, password })
      alert("Login successful! (This is just a demo)")
    }
  }

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateSignupForm()) {
      console.log("Signup attempt with:", { username, email, password })
      alert("Signup successful! (This is just a demo)")
    }
  }

  const handleSocialAuth = (provider: string) => {
    console.log(`${mode === 'login' ? "Logging in" : "Signing up"} with ${provider}`)
    alert(`${provider} ${mode === 'login' ? "login" : "signup"} would be implemented here`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F4F4] dark:bg-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl"
      >
        <button className="absolute right-4 top-4 z-10 text-[#333333] dark:text-gray-300 hover:text-[#0077B6] dark:hover:text-blue-400">
          <Link href="/homepage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </button>

        {/* Illustration Section */}
        <div className="hidden w-1/2 bg-[#0077B6] dark:bg-blue-900 lg:block">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative h-full w-full p-6"
          >
            <motion.div variants={itemVariants} className="absolute left-6 top-6 font-bold text-white">
              SiteName.
            </motion.div>
            <motion.div variants={itemVariants} className="flex h-full items-center justify-center">
              <Image
                src="/auth-illustration.svg"
                alt="Authentication illustration"
                width={400}
                height={400}
                className="h-auto w-full max-w-md"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="w-full p-8 lg:w-1/2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-md"
          >
            <motion.h1 variants={itemVariants} className="mb-8 text-3xl font-bold text-[#333333] dark:text-white">
              {mode === 'login' ? "Welcome Back" : "Create Account"}
            </motion.h1>

            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <label htmlFor="email" className="mb-2 block font-medium text-[#333333] dark:text-gray-300">
                      Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <Mail className="h-5 w-5 text-[#333333] dark:text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-md border ${
                          errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } py-3 pl-10 pr-3 text-[#333333] dark:text-white dark:bg-gray-700 focus:border-[#0077B6] dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-[#0077B6] dark:focus:ring-blue-400`}
                        placeholder="example@gmail.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <label htmlFor="password" className="block font-medium text-[#333333] dark:text-gray-300">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full rounded-md border ${
                          errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } py-3 px-3 text-[#333333] dark:text-white dark:bg-gray-700 focus:border-[#0077B6] dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-[#0077B6] dark:focus:ring-blue-400`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#333333] dark:text-gray-400 hover:text-[#0077B6] dark:hover:text-blue-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    <div className="mt-2 text-right">
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-[#FF6F61] hover:text-[#FF5349] dark:text-orange-400 dark:hover:text-orange-300"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#0077B6] dark:bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-[#006699] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Log In
                  </button>
                </motion.div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <label htmlFor="username" className="mb-2 block font-medium text-[#333333] dark:text-gray-300">
                      Username
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <User className="h-5 w-5 text-[#333333] dark:text-gray-400" />
                      </div>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full rounded-md border ${
                          errors.username ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } py-3 pl-10 pr-3 text-[#333333] dark:text-white dark:bg-gray-700 focus:border-[#0077B6] dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-[#0077B6] dark:focus:ring-blue-400`}
                        placeholder="Name.Sir"
                      />
                    </div>
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <label htmlFor="signup-email" className="mb-2 block font-medium text-[#333333] dark:text-gray-300">
                      Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <Mail className="h-5 w-5 text-[#333333] dark:text-gray-400" />
                      </div>
                      <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-md border ${
                          errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } py-3 pl-10 pr-3 text-[#333333] dark:text-white dark:bg-gray-700 focus:border-[#0077B6] dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-[#0077B6] dark:focus:ring-blue-400`}
                        placeholder="name.sir@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <label htmlFor="signup-password" className="mb-2 block font-medium text-[#333333] dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full rounded-md border ${
                          errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } py-3 px-3 text-[#333333] dark:text-white dark:bg-gray-700 focus:border-[#0077B6] dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-[#0077B6] dark:focus:ring-blue-400`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#333333] dark:text-gray-400 hover:text-[#0077B6] dark:hover:text-blue-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <label htmlFor="confirm-password" className="mb-2 block font-medium text-[#333333] dark:text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full rounded-md border ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } py-3 px-3 text-[#333333] dark:text-white dark:bg-gray-700 focus:border-[#0077B6] dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-[#0077B6] dark:focus:ring-blue-400`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#333333] dark:text-gray-400 hover:text-[#0077B6] dark:hover:text-blue-400"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#0077B6] dark:bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-[#006699] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Sign Up
                  </button>
                </motion.div>
              </form>
            )}

            <motion.div variants={itemVariants} className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-sm text-[#333333] dark:text-gray-400">Or Continue With</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center space-x-4">
              <button
                onClick={() => handleSocialAuth("Google")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a5.94 5.94 0 1 1 0-11.88c1.6 0 3.06.599 4.165 1.553l3.094-3.094C17.895 3.138 15.4 2 12.545 2 7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.523 0 10-4.477 10-10a9.96 9.96 0 0 0-.167-1.785l-9.833-.976z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSocialAuth("Facebook")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSocialAuth("Apple")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
                  />
                </svg>
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-sm text-[#333333] dark:text-gray-400">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link
                  href={mode === 'login' ? "/signup" : "/signin"}
                  className="font-medium text-[#0077B6] dark:text-blue-400 hover:text-[#006699] dark:hover:text-blue-300"
                >
                  {mode === 'login' ? "Sign up here" : "Login here"}
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}