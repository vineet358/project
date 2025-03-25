"use client"

import { FormEvent, useState } from "react"
import { Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ email?: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Add your password reset logic here
      console.log("Password reset requested for:", email)
      setIsSubmitted(true)
    }
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
              Forgot Password?
            </motion.h1>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <label htmlFor="email" className="mb-2 block font-medium text-[#333333] dark:text-gray-300">
                      Email Address
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
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#0077B6] dark:bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-[#006699] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Send Reset Link
                  </button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="mb-6 text-green-600 dark:text-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="mb-4 text-xl font-bold text-[#333333] dark:text-white">
                  Check Your Email
                </h2>
                <p className="text-[#333333] dark:text-gray-300">
                  We've sent a password reset link to{" "}
                  <span className="font-medium">{email}</span>
                </p>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-sm text-[#333333] dark:text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-[#0077B6] dark:text-blue-400 hover:text-[#006699] dark:hover:text-blue-300"
                >
                  Back to Login
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}