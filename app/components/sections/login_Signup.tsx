"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateLoginForm()) {
      // Here you would typically call your authentication API
      console.log("Login attempt with:", { email, password })
      // For demo purposes, let's simulate a successful login
      alert("Login successful! (This is just a demo)")
    }
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateSignupForm()) {
      // Here you would typically call your registration API
      console.log("Signup attempt with:", { username, email, password })
      // For demo purposes, let's simulate a successful signup
      alert("Signup successful! (This is just a demo)")
      // Optionally switch to login view after successful signup
      setIsLogin(true)
    }
  }

  const handleSocialAuth = (provider: string) => {
    // Here you would implement social login/signup logic
    console.log(`${isLogin ? "Logging in" : "Signing up"} with ${provider}`)
    alert(`${provider} ${isLogin ? "login" : "signup"} would be implemented here`)
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setErrors({})
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50 p-4">
      <div className="relative mx-auto flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <button className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left side with illustration */}
        <div className="hidden w-1/2 bg-pink-100 lg:block">
          <div className="relative h-full w-full p-6">
            <div className="absolute left-6 top-6 font-bold text-pink-700">Mofitask.</div>
            <div className="flex h-full items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Authentication illustration"
                width={400}
                height={400}
                className="h-auto w-full max-w-md"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right side with auth form */}
        <div className="w-full p-8 lg:w-1/2">
          <div className="mx-auto max-w-md">
            <h1 className="mb-8 text-3xl font-bold">{isLogin ? "Login" : "Sign Up"}</h1>

            {isLogin ? (
              // Login Form
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="mb-2 block font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } py-3 pl-10 pr-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
                      placeholder="daniel@fisher@gmail.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="block font-medium">
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
                        errors.password ? "border-red-500" : "border-gray-300"
                      } py-3 px-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  <div className="mt-2 text-right">
                    <Link href="/forgot-password" className="text-sm font-medium text-amber-500 hover:text-amber-600">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-pink-500 py-3 font-medium text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Log In
                </button>
              </form>
            ) : (
              // Sign Up Form
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="mb-2 block font-medium">
                    Username
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full rounded-md border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } py-3 pl-10 pr-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
                      placeholder="johndoe"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="signup-email" className="mb-2 block font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } py-3 pl-10 pr-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="signup-password" className="mb-2 block font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full rounded-md border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } py-3 px-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="confirm-password" className="mb-2 block font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full rounded-md border ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      } py-3 px-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-pink-500 py-3 font-medium text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </form>
            )}

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">Or Continue With</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSocialAuth("Google")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSocialAuth("Facebook")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSocialAuth("Apple")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.82 3.28-.82 2 .82 3.3.79 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z" />
                </svg>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="font-medium text-pink-600 hover:text-pink-700"
                >
                  {isLogin ? "Sign up here" : "Login here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

