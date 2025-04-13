"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Code, Coffee, Cpu, Github, Lightbulb, Mail, MapPin, MessageSquare, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet marker icon issue
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Team members data - 4 undergraduate engineering students
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Frontend Developer",
      image: "/placeholder.svg?height=200&width=200&text=AC",
      bio: "Computer Engineering student passionate about UI/UX design and React development. Loves hackathons and cold brew coffee.",
    },
    {
      name: "Priya Sharma",
      role: "Backend Developer",
      image: "/placeholder.svg?height=200&width=200&text=PS",
      bio: "Electrical Engineering major with a minor in Computer Science. Specializes in database design and API development.",
    },
    {
      name: "Marcus Johnson",
      role: "DevOps & Infrastructure",
      image: "/placeholder.svg?height=200&width=200&text=MJ",
      bio: "Software Engineering student focused on cloud infrastructure and deployment automation. Always tinkering with new tech.",
    },
    {
      name: "Zoe Williams",
      role: "Content & Design",
      image: "/placeholder.svg?height=200&width=200&text=ZW",
      bio: "Mechanical Engineering student with a creative side. Handles content strategy, writing, and visual design for the blog.",
    },
  ]

  // Blog purpose cards
  const purposeCards = [
    {
      title: "Share Knowledge",
      description: "Document our learning journey and share engineering insights with fellow students and enthusiasts.",
      icon: BookOpen,
    },
    {
      title: "Build Community",
      description: "Connect with other engineering students and create a space for discussion and collaboration.",
      icon: MessageSquare,
    },
    {
      title: "Showcase Projects",
      description: "Highlight our coursework, side projects, and hackathon wins to inspire others.",
      icon: Code,
    },
    {
      title: "Learn in Public",
      description: "Improve our communication skills and deepen our understanding by explaining technical concepts.",
      icon: Share2,
    },
  ]

  // University location (generic campus location)
  const campusLocation = {
    lat: 40.7128,
    lng: -74.006,
    name: "Engineering Building",
    address: "123 University Ave, Campus, NY 10001",
  }

  useEffect(() => {
    setMounted(true)
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Listen for changes in color scheme preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setDarkMode(event.matches)
      if (event.matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    })
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                About Us
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Hey there! We're a team of 4 undergraduate engineering students who built this blog to share our
                journey, projects, and insights. What started as a class project has turned into our passion project
                where we document everything we're learning along the way.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Team+Photo"
                  alt="Team of engineering students"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Blog Purpose */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Why We Built This Blog
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our blog serves multiple purposes as we navigate our engineering education
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {purposeCards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                  <card.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Meet The Team
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              The four engineering students behind this blog
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-full hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-teal-600 dark:text-teal-400 mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Tech Stack
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              The technologies we used to build this blog
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image src="/placeholder.svg?height=64&width=64&text=Next.js" alt="Next.js" width={64} height={64} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Next.js</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">React Framework</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=64&width=64&text=Tailwind"
                  alt="Tailwind CSS"
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Tailwind CSS</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Styling</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image src="/placeholder.svg?height=64&width=64&text=MongoDB" alt="MongoDB" width={64} height={64} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">MongoDB</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Database</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image src="/placeholder.svg?height=64&width=64&text=Vercel" alt="Vercel" width={64} height={64} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Vercel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deployment</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location and Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Find Us On Campus
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We usually hang out at the Engineering Building when we're not in class
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <motion.div
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Engineering Building</h3>
                    <p className="text-gray-600 dark:text-gray-400">{campusLocation.address}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">team@engineeringblog.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Computer Lab #204</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">
                      github.com/eng-blog-team
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-2/3 h-[400px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {mounted && (
                <MapContainer
                  center={[campusLocation.lat, campusLocation.lng]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                  className={darkMode ? "map-dark" : "map-light"}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={
                      darkMode
                        ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        : "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                  />
                  <Marker position={[campusLocation.lat, campusLocation.lng]} icon={markerIcon}>
                    <Popup>
                      <div>
                        <h3 className="font-semibold">{campusLocation.name}</h3>
                        <p>{campusLocation.address}</p>
                        <p className="text-sm mt-1">Where the magic happens!</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-teal-600 dark:bg-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-teal-100 max-w-2xl mx-auto mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have questions about our projects or want to collaborate? We'd love to hear from you!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </Link>
            <a
              href="https://github.com/eng-blog-team"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Custom styles for dark mode map */}
      <style jsx global>{`
        .map-dark .leaflet-tile {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
        }
        
        .dark .leaflet-container {
          background: #1f2937;
        }
        
        .dark .leaflet-control-attribution {
          background: rgba(31, 41, 55, 0.8);
          color: #9ca3af;
        }
        
        .dark .leaflet-control-attribution a {
          color: #d1d5db;
        }
        
        .dark .leaflet-popup-content-wrapper, 
        .dark .leaflet-popup-tip {
          background: #374151;
          color: #f3f4f6;
        }
      `}</style>
    </div>
  )
}
