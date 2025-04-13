"use client"

import BlogSection from "../components/sections/blog-section";
import HorizonLandingPage from "../components/sections/FeaturedCrausel";
import MiddleSection from "../components/sections/midSection";
import StorySection from "../components/sections/storySection";

export default function LandingHomePage() {

  
  return (
    <div className="relative min-h-screen">
      <main>
        <HorizonLandingPage />
        <MiddleSection />
        <BlogSection />
        <StorySection /> 
      </main>
    </div>
  );
}