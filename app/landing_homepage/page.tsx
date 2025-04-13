"use client"

import { useRouter } from "next/navigation";
import BlogSection from "../components/sections/blog-section";
import HorizonLandingPage from "../components/sections/FeaturedCrausel";
import MiddleSection from "../components/sections/midSection";
import StorySection from "../components/sections/storySection";
import FloatingActionButton from "../components/FloatingActionButton";

export default function LandingHomePage() {
  const router = useRouter();
  
  const handleWriteClick = () => {
    // Navigate to blog writing page or open a modal
    router.push('/write-blog');
  };
  
  return (
    <div className="relative min-h-screen">
      <main>
        <HorizonLandingPage />
        <MiddleSection />
        <BlogSection />
        <StorySection />
      </main>
      <FloatingActionButton
        label="Write Blog"
        onClick={handleWriteClick}
      />
    </div>
  );
}