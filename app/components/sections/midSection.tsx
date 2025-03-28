import { ChevronRight, TrendingUp, BookOpen, Calendar, Microscope, Briefcase, HomeIcon, BarChart2, Globe, Users, Megaphone } from "lucide-react";
import PostCard from "../MidSection_Components/post-card";
import TrendingItem from "../MidSection_Components/trending-item";
import CategoryCard from "../MidSection_Components/category-card";
import NewsletterForm from "../MidSection_Components/newsletterform";

// Sample data
const recentPosts = [
  {
    id: 1,
    category: "Campus Life",
    title: "Campus Sustainability Initiatives: Making a Difference",
    author: "Environmental Committee",
    date: "June 12, 2023",
    readTime: "5 min",
    excerpt: "How our campus is working towards a greener future with innovative sustainability programs",
    imageSrc: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    category: "Technology",
    title: "The Impact of Virtual Reality on Learning Outcomes",
    author: "Tech Research Team",
    date: "June 10, 2023",
    readTime: "7 min",
    excerpt: "New study reveals significant improvements in student engagement with VR technology",
    imageSrc: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    category: "Alumni",
    title: "Alumni Spotlight: Leading Innovation in Healthcare",
    author: "Alumni Association",
    date: "June 08, 2023",
    readTime: "9 min",
    excerpt: "Meet the graduate who's revolutionizing patient care with AI-powered diagnostics",
    imageSrc: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    category: "Health",
    title: "Student Mental Health: Resources and Support",
    author: "Wellness Center",
    date: "July 12, 2023",
    readTime: "5 min",
    excerpt: "Comprehensive guide to mental health services available to all students",
    imageSrc: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    category: "Research",
    title: "Faculty Research Receives Major Grant Funding",
    author: "Research Office",
    date: "June 12, 2023",
    readTime: "5 min",
    excerpt: "Groundbreaking research project secures $2.5 million in federal funding",
    imageSrc: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    category: "Global",
    title: "International Exchange Programs Expanding in 2023",
    author: "International Office",
    date: "June 12, 2023",
    readTime: "5 min",
    excerpt: "New partnerships offer students more opportunities to study abroad",
    imageSrc: "/placeholder.svg?height=300&width=500",
  },
];

const trendingPosts = [
  {
    id: 1,
    title: "10 Study Tips for Final Exam",
    views: "15.2K",
    date: "May 20, 2025",
  },
  {
    id: 2,
    title: "Career Paths for Computer Science Graduates",
    views: "10.2K",
    date: "April 13, 2025",
  },
  {
    id: 3,
    title: "How to Balance Work and Study",
    views: "10.0K",
    date: "July 10, 2025",
  },
  {
    id: 4,
    title: "Scholarship Opportunities for 2023-2024",
    views: "9.2K",
    date: "Aug 20, 2025",
  },
];

const categories = [
  { icon: BookOpen, title: "Academics", postCount: 45 },
  { icon: Calendar, title: "Events", postCount: 38 },
  { icon: Microscope, title: "Research", postCount: 12 },
  { icon: Briefcase, title: "Career", postCount: 67 },
  { icon: HomeIcon, title: "Campus Life", postCount: 14 },
  { icon: BarChart2, title: "Trending", postCount: 102 },
  { icon: Users, title: "Student Life", postCount: 25 },
  { icon: Globe, title: "International", postCount: 19 },
  { icon: Megaphone, title: "Announcements", postCount: 30 },
];

export default function MiddleSection() {
  return (
    <div className=" px-4 py-4 sm:px-12 mt-18">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts Section - Takes 2/3 of the screen on desktop */}
        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <a href="#" className="flex items-center text-primary font-medium">
              View All <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                category={post.category}
                title={post.title}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                excerpt={post.excerpt}
                imageSrc={post.imageSrc}
              />
            ))}
          </div>
        </section>

        {/* Trending, Categories, and Newsletter - Takes 1/3 of the screen on desktop */}
        <section className="space-y-8">
          {/* Trending Now */}
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 border-[0.5px] border-[#E0E0E0] dark:border-[#333333]">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-primary" />
              <h2 className="text-xl font-bold">Trending Now</h2>
            </div>
            <div className="space-y-1">
              {trendingPosts.map((post) => (
                <TrendingItem key={post.id} number={post.id} title={post.title} views={post.views} date={post.date} />
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 border border-[#E0E0E0] dark:border-[#333333]">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <CategoryCard key={index} icon={category.icon} title={category.title} postCount={category.postCount} />
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 border border-[#E0E0E0] dark:border-[#333333]">
            <h2 className="text-xl font-bold mb-2">Subscribe to Newsletter</h2>
            <p className="text-muted-foreground mb-4">Get the latest posts delivered right to your inbox</p>
            <NewsletterForm />
          </div>
        </section>
      </div>
    </div>
  );
}
