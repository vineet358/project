
import WallpaperCarousel from "./components/sections/FeaturedCrausel";
import Header from "./components/layout/header";
import HeroSection from "./components/sections/Hero_Section";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <WallpaperCarousel/>
    </div>
  );
}
