import Header from "../components/layout/header";
import WallpaperCarousel from "../components/sections/FeaturedCrausel";
import HeroSection from "../components/sections/Hero_Section";

export default function HomePage(){
    return (
        <div>
            <Header/>
            <HeroSection/>
            <WallpaperCarousel/>
        </div>
    );
}