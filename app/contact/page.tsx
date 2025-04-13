"use client"

import { useState, useEffect } from "react"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  AlertCircle, 
  User, 
  Hash, 
  MessageSquare, 
  Check, 
  ChevronDown 
} from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [selectOpen, setSelectOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", description: "", variant: "" })

  const MAX_CHAR_COUNT = 500

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMessageChange = (e: { target: { value: any } }) => {
    const text = e.target.value
    setMessage(text)
    setCharCount(text.length)
  }

  const showToast = (title: string, description: string, variant: string) => {
    setToastMessage({ title, description, variant })
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 5000)
  }

  const validateForm = () => {
    if (!name.trim()) {
      showToast("Name is required", "Please enter your name.", "destructive")
      return false
    }

    if (!email.trim() || !emailRegex.test(email)) {
      showToast("Valid email is required", "Please enter a valid email address.", "destructive")
      return false
    }

    if (!subject) {
      showToast("Subject is required", "Please select a subject for your message.", "destructive")
      return false
    }

    if (!message.trim()) {
      showToast("Message is required", "Please enter your message.", "destructive")
      return false
    }

    if (message.length > MAX_CHAR_COUNT) {
      showToast("Message too long", `Your message exceeds the maximum character limit of ${MAX_CHAR_COUNT}.`, "destructive")
      return false
    }

    return true
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setFormError(false)

    // Simulate API call
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormSubmitted(true)
      showToast("Message sent successfully!", "We'll get back to you as soon as possible.", "success")

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setCharCount(0)
    } catch (error) {
      setFormError(true)
      showToast("Something went wrong", "Your message couldn't be sent. Please try again.", "destructive")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  const subjects = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "feedback", label: "Feedback" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "research", label: "Research Collaboration" },
    { value: "other", label: "Other" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Toast Notification */}
      {toastVisible && (
        <div 
          className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transition-all transform translate-y-0 
            ${toastMessage.variant === "destructive" ? "bg-red-50 border-red-400 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100" : 
              "bg-green-50 border-green-400 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100"}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {toastMessage.variant === "destructive" ? (
                <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              ) : (
                <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">{toastMessage.title}</h3>
              <div className="mt-1 text-sm">{toastMessage.description}</div>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setToastVisible(false)}
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
       <div className="relative flex justify-center items-center h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden px-4">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 dark:from-indigo-700 dark:via-purple-600 dark:to-pink-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative text-center text-white max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold pacifico">
          Contact Us
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg">
        Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you
        as soon as possible.
        </p>
      </div>
    </div>
      {/* Contact Form and Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md overflow-hidden border dark:border-[#333333]">
              <div className="p-6 border-b border-gray-200 dark:border-[#333333]">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Send Us a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="p-6">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Thank you for reaching out. We'll respond to your inquiry as soon as possible.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formError && (
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              There was a problem sending your message. Please try again.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <User className="h-4 w-4 mr-2" />
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1d1d1d] dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1d1d1d] dark:text-white ${
                          !email || emailRegex.test(email) 
                            ? "border-gray-300 dark:border-gray-600" 
                            : "border-red-500 dark:border-red-500"
                        }`}
                      />
                      {email && !emailRegex.test(email) && (
                        <p className="text-red-600 dark:text-red-400 text-sm">Please enter a valid email address</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Hash className="h-4 w-4 mr-2" />
                        Subject
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setSelectOpen(!selectOpen)}
                          className="w-full px-4 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white flex items-center justify-between"
                        >
                          {subject ? subjects.find(s => s.value === subject)?.label : "Select a subject"}
                          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        {selectOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-[#1A1A1A] shadow-lg rounded-md py-1 border border-gray-200 dark:border-gray-700">
                            {subjects.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                  setSubject(option.value)
                                  setSelectOpen(false)
                                }}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                        <input type="hidden" name="subject" value={subject} required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Please provide as much detail as possible..."
                        rows={6}
                        value={message}
                        onChange={handleMessageChange}
                        required
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1A1A1A] dark:text-white ${
                          charCount > MAX_CHAR_COUNT 
                            ? "border-red-500 dark:border-red-500" 
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      <div className="flex justify-end">
                        <span
                          className={`text-sm ${
                            charCount > MAX_CHAR_COUNT 
                              ? "text-red-600 dark:text-red-400" 
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {charCount}/{MAX_CHAR_COUNT} characters
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Contact Information</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Here's how you can reach us directly</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Academic Research Institute
                        <br />
                        123 University Avenue
                        <br />
                        Cambridge, MA 02138
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        <a href="tel:+16175551234" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          +1 (617) 555-1234
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        <a href="mailto:contact@academicresearch.edu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          contact@academicresearch.edu
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Find Us</h2>
                </div>
                <div className="p-2">
                  <div className="relative h-[300px] w-full rounded-md overflow-hidden bg-gray-100 dark:bg-[#0a0a0a]">
                    {/* This would be a real map in production */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Map Placeholder</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          In a real application, this would be an interactive map showing our location.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}