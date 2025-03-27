"use client"

import type React from "react"
import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-lg ">
      {isSuccess ? (
        <div className="p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-lg mb-4">
          Thank you for subscribing!
        </div>
      ) : null}
      <div className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email Address"
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#00E5FF]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 bg-[#0077B6] dark:bg-[#0A1A2F] text-white dark:text-[#00E5FF] font-medium rounded-lg transition-colors disabled:opacity-70 hover:bg-[#B2F2BB] dark:hover:bg-[#00FFFF] hover:text-[#333333] dark:hover:text-[#333333]"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
    </form>
  )
}
