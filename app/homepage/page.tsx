"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import cn from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function DiamondShape({
  className,
  delay = 0,
  size = 150,
  rotate = 0,
  gradient = "from-indigo-500/20",
}: {
  className?: string
  delay?: number
  size?: number
  rotate?: number
  gradient?: string
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: rotate - 45 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{
        duration: 1.8,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn(
        "absolute",
        "w-[clamp(120px,20vw,180px)] h-[clamp(120px,20vw,180px)]",
        className
      )}
    >
      <motion.div
        animate={{
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "w-full h-full bg-gradient-to-br",
          gradient,
          "clip-diamond backdrop-blur-[2px] border-2 border-white/15",
          "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
        )}
      />
    </motion.div>
  )
}

function PolygonShape({
  className,
  delay = 0,
  size = 200,
  rotate = 0,
  gradient = "from-rose-500/20",
}: {
  className?: string
  delay?: number
  size?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: rotate - 30 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn(
        "absolute",
        "w-[clamp(150px,25vw,220px)] h-[clamp(150px,25vw,220px)]",
        className
      )}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "w-full h-full bg-gradient-to-br",
          gradient,
          "clip-polygon backdrop-blur-[2px] border-2 border-white/15",
          "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
        )}
      />
    </motion.div>
  )
}

function BlobShape({
  className,
  delay = 0,
  rotate = 0,
  gradient = "from-cyan-500/20",
}: {
  className?: string
  delay?: number
  rotate?: number
  gradient?: string
}) {
  const pathVariants = {
    animate: {
      d: [
        "M32.3,-36.3C42.4,-29.3,51.7,-20.7,55.5,-9.6C59.3,1.6,57.6,15.3,51.1,26.8C44.6,38.3,33.3,47.6,20.7,53.4C8.1,59.3,-5.8,61.8,-18.3,58.3C-30.8,54.8,-41.8,45.3,-49.3,33.7C-56.8,22.1,-60.7,8.4,-59.9,-5.8C-59.1,-20,-53.5,-34.7,-43.3,-41.7C-33.1,-48.7,-18.3,-48,-3.9,-44.5C10.5,-40.9,21,-34.5,32.3,-36.3Z",
        "M35.3,-39.9C45.3,-32.2,53.1,-21.3,56.2,-8.7C59.3,3.8,57.6,18.1,51,30.3C44.4,42.5,32.9,52.7,19.4,57.1C5.9,61.5,-9.6,60.1,-22.9,55.1C-36.2,50,-47.3,41.3,-53.7,29.8C-60.1,18.3,-61.8,4.1,-58.7,-8.2C-55.6,-20.5,-47.7,-31.8,-37,-39.5C-26.3,-47.1,-13.1,-51.1,0.3,-51.4C13.8,-51.8,27.6,-48.5,35.3,-39.9Z",
        "M34.2,-40.4C44.6,-32.6,53.6,-22.6,57.4,-10.3C61.2,2.1,59.8,16.7,53.2,29.3C46.6,41.9,34.8,52.5,20.8,56.4C6.8,60.3,-9.4,57.5,-23.3,51.5C-37.2,45.5,-48.8,36.3,-55.1,24.4C-61.4,12.5,-62.4,-2.1,-57.9,-14.3C-53.4,-26.4,-43.4,-36.2,-32.3,-43.8C-21.2,-51.5,-9.1,-57.1,1.7,-59.5C12.5,-61.9,25,-61.2,34.2,-40.4Z"
      ]
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
      className={cn(
        "absolute",
        "w-[clamp(200px,30vw,300px)] h-[clamp(200px,30vw,300px)]",
        className
      )}
    >
      <motion.svg
        viewBox="0 0 100 100"
        animate="animate"
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "w-full h-full drop-shadow-xl",
          gradient.replace("from", "fill")
        )}
      >
        <motion.path
          variants={pathVariants}
          transform="translate(50 50)"
          strokeWidth="2"
          stroke="currentColor"
          className="opacity-20"
        />
      </motion.svg>
    </motion.div>
  )
}

export default function HeroGeometric({
  title2 = "Share Your Knowledge",
}: {
  badge?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=24&width=24" alt="Logo" width={24} height={24} />
            <span className="text-white font-medium">SiteName</span>
          </div>
        </motion.div>
          <div className="flex items-center gap-3">
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <button className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors">
                <Link href="/signin">Sign In</Link>
              </button>
              </motion.div>
              <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
              <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300">
              <Link href="/signup">Sign Up</Link>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {/* Responsive Shapes */}
        <DiamondShape
          delay={0.3}
          rotate={45}
          gradient="from-indigo-500/25"
          className="left-[2%] top-[10%] md:left-[5%] md:top-[15%] lg:left-[10%]"
        />

        <DiamondShape
          delay={0.6}
          rotate={-30}
          gradient="from-rose-500/25"
          className="right-[2%] top-[65%] md:right-[10%] md:top-[70%] scale-75 md:scale-100"
        />

        <PolygonShape
          delay={0.4}
          rotate={15}
          gradient="from-violet-500/25"
          className="left-[10%] bottom-[5%] md:left-[15%] md:bottom-[10%] scale-90 md:scale-100"
        />

        <PolygonShape
          delay={0.7}
          rotate={-15}
          gradient="from-amber-500/25"
          className="right-[5%] top-[15%] md:right-[20%] md:top-[20%] scale-75 lg:scale-100"
        />

        <BlobShape
          delay={0.5}
          gradient="from-cyan-500/20"
          className="left-[2%] top-[25%] md:left-[5%] md:top-[30%] scale-75 lg:scale-100"
        />

        <BlobShape
          delay={0.8}
          gradient="from-emerald-500/20"
          className="right-[2%] bottom-[15%] md:right-[5%] md:bottom-[20%] scale-75 lg:scale-100"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-16">
        <div className="max-w-8xl mx-auto text-center">
          <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={5} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-sm sm:text-base md:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-3xl mx-auto px-4">
              A collaborative platform where students and teachers connect, share insights, and grow together through
              educational content.
            </p>
          </motion.div>

          <div className="flex flex-row gap-2 sm:gap-4 justify-center">
            <motion.div custom={6} variants={fadeUpVariants} initial="hidden" animate="visible">
              <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-sm sm:text-base">
                Explore Blogs
              </button>
            </motion.div>
            <motion.div custom={7} variants={fadeUpVariants} initial="hidden" animate="visible">
              <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 transition-all duration-300 text-sm sm:text-base">
                Write a Blog
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
