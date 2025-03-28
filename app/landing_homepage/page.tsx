import BlogSection from "../components/sections/blog-section";
import WallpaperCarousel from "../components/sections/FeaturedCrausel";
import MiddleSection from "../components/sections/midSection";

export default function LandingHomePage() {
    return (
        <div>
            <WallpaperCarousel/>
            <MiddleSection/>
            <BlogSection/>
        </div>
    );
}