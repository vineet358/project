"use client"

import { motion } from "framer-motion"
import cn from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

function CapsuleShape({
  className,
  delay = 0,
  rotate = 0,
  gradient = "from-indigo-500/20",
}: {
  className?: string
  delay?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{
        duration: 1.2,
        delay,
        ease: "easeOut",
      }}
      className={cn(
        "absolute",
        "w-[clamp(160px,25vw,260px)] h-[clamp(80px,15vw,160px)]",
        className
      )}
    >
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "w-full h-full bg-gradient-to-br rounded-full backdrop-blur-sm border border-white/10 shadow-md",
          gradient
        )}
      />
    </motion.div>
  )
}


export default function HeroGeometric() {
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
  const router = useRouter();

  const title2 = "Share Your Knowledge" // Moved inside the component

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
      <CapsuleShape
          delay={0.3}
          rotate={15}
          gradient="from-indigo-500/25"
          className="left-[2%] top-[10%] md:left-[5%] md:top-[15%]"
        />

        <CapsuleShape
          delay={0.5}
          rotate={-20}
          gradient="from-rose-500/25"
          className="right-[2%] top-[65%] md:right-[10%] md:top-[70%] scale-90"
        />

        <CapsuleShape
          delay={0.7}
          rotate={10}
          gradient="from-violet-500/25"
          className="left-[10%] bottom-[5%] md:left-[15%] md:bottom-[10%] scale-90"
        />

        <CapsuleShape
          delay={1.0}
          rotate={-15}
          gradient="from-amber-500/25"
          className="right-[5%] top-[15%] md:right-[20%] md:top-[20%] scale-100"
        />

      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-16">
        <div className="max-w-8xl mx-auto text-center">
          <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 pacifico",
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
            <button
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-sm sm:text-base"
              onClick={() => router.push("/landing_homepage")}
            >
              Explore Blogs
            </button>
          </motion.div>
          <motion.div custom={7} variants={fadeUpVariants} initial="hidden" animate="visible">
            <button
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 transition-all duration-300 text-sm sm:text-base"
              onClick={() => router.push("/write-blog")}
            >
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
