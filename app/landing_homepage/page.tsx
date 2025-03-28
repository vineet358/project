import BlogSection from "../components/sections/blog-section";
import WallpaperCarousel from "../components/sections/FeaturedCrausel";
import MiddleSection from "../components/sections/midSection";
import StorySection from "../components/sections/storySection";

export default function LandingHomePage() {
    return (
        <div>
            <WallpaperCarousel/>
            <MiddleSection/>
            <BlogSection/>
            <StorySection/>
        </div>
    );
}