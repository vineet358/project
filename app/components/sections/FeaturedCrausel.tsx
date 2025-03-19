'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MessageCircle, Heart, ArrowRight } from 'lucide-react';

export const featuredPosts = [
  {
    id: 1,
    title: "The Future of AI in Education",
    excerpt: "Exploring how artificial intelligence is transforming the educational landscape",
    image: "https://picsum.photos/seed/1/1200/600",
    author: "Dr. Sarah Johnson",
    authorAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent("Sarah Johnson")}&size=40`,
    date: "May 15, 2025",
    category: "Technology",
    readTime: "8 min read",
    likes: 245,
    comments: 32,
  },
  {
    id: 2,
    title: "Student Success Stories: From Campus to Career",
    excerpt: "Inspiring journeys of recent graduates who found success in their chosen fields",
    image: "https://picsum.photos/seed/2/1200/600",
    author: "Prof. Michael Chen",
    authorAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent("Michael Chen")}&size=40`,
    date: "June 2, 2025",
    category: "Career",
    readTime: "6 min read",
    likes: 189,
    comments: 24,
  },
  {
    id: 3,
    title: "Research Breakthroughs: What's New in 2025",
    excerpt: "A roundup of the most significant research developments from our institution",
    image: "https://picsum.photos/seed/3/1200/600",
    author: "Dr. Emily Rodriguez",
    authorAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent("Emily Rodriguez")}&size=40`,
    date: "June 10, 2025",
    category: "Research",
    readTime: "10 min read",
    likes: 312,
    comments: 45,
  },
];

export default function WallpaperCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? featuredPosts.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - endX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const dispersionVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 1, // Keep it visible immediately
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0.8, // Reduce opacity slightly instead of making it disappear completely
      scale: 0.9, // Keep it slightly visible
    }),
  };
  

  const dispersionTransition = {
    type: 'spring',
    damping:70,
    stiffness: 300,
    velocity: 0.5,
  };

  return (
    <div 
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden shadow-xl group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode='wait' custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={dispersionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={dispersionTransition}
          className="absolute w-full h-full"
        >
          <img 
            src={featuredPosts[currentIndex].image} 
            alt="" 
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out" 
          />
          <div 
            className="fixed inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/90 h-[460px] md:h-[660px] "
            aria-hidden="true"
          />
        
          <div className="absolute bottom-7 left-0 right-0 p-4 md:p-8 text-white max-w-4xl md:ml-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 bg-[#FF6F61] rounded-full text-xs md:text-sm font-medium">
                {featuredPosts[currentIndex].category}
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight tracking-tight">
                {featuredPosts[currentIndex].title}
              </h2>
              <p className="sm:block text-sm md:text-lg text-gray-200 max-w-2xl line-clamp-2 md:line-clamp-3">
                {featuredPosts[currentIndex].excerpt}
              </p>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src={featuredPosts[currentIndex].authorAvatar} 
                    alt="Author" 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-[0.5px] border-white/50" 
                  />
                  <div>
                    <p className="font-medium text-sm md:text-base">{featuredPosts[currentIndex].author}</p>
                    <p className="text-xs md:text-sm text-gray-300">{featuredPosts[currentIndex].date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs md:text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{featuredPosts[currentIndex].readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{featuredPosts[currentIndex].likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{featuredPosts[currentIndex].comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Read More Button */}
          <div className="absolute bottom-15 right-4 md:bottom-12 md:right-12 z-10">
            <button className="flex items-center bg-[#0077B6] hover:bg-[#3a7897] sm:px-4 sm:py-2 p-3 md:px-6 md:py-3 sm:rounded-xl rounded-2xl transition-all duration-300">
              <span className="text-sm md:text-base font-bold hidden sm:block">Read More</span>
              <ArrowRight className=" sm:ml-2 w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-6">
        <button
          onClick={handlePrev}
          className="p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all transform hover:scale-110 shadow-lg hidden sm:block"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all transform hover:scale-110 shadow-lg hidden sm:block"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      </div>

      {/* Centered Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredPosts.map((_, index) => (
          <div
            key={index}
            className="h-1.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm"
            style={{ width: 20 }}
          >
            <div 
              className={`h-full bg-white transition-all duration-500 ease-out ${index === currentIndex ? 'w-full' : 'w-0'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}