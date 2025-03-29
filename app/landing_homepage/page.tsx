import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import BlogSection from "../components/sections/blog-section";
import HorizonLandingPage from "../components/sections/FeaturedCrausel";
import MiddleSection from "../components/sections/midSection";
import StorySection from "../components/sections/storySection";

export default function LandingHomePage() {
    return (
        <div>
            {/* <Header/> */}
            <HorizonLandingPage/>
            <MiddleSection/>
            <BlogSection/>
            <StorySection/>
            <Footer/>
        </div>
    );
}