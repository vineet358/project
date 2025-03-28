"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StorySection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[300px] sm:h-[350px] md:h-[400px] w-full overflow-hidden px-4">
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
          Ready to Share Your Story?
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg">
          Join our community of writers and share your knowledge, experiences, and insights with readers around the world.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-3 text-sm sm:text-base bg-white text-black rounded-lg shadow-md hover:scale-105 transition-transform">
            Start Writing
          </button>
          <button className="px-6 py-3 text-sm sm:text-base bg-black text-white rounded-lg shadow-md hover:scale-105 transition-transform">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
