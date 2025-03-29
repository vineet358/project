import { Search, Globe } from "lucide-react";

export default function Header(){
    const navItems = ["Hotel", "Flight", "Train", "Travel", "Car Rental"]
    
    return(
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm bg-opacity-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 group">
            <span className="inline-block transition-transform duration-500 group-hover:rotate-3">H</span>
            <span className="inline-block transition-transform duration-500 delay-75 group-hover:-rotate-3">o</span>
            <span className="inline-block transition-transform duration-500 delay-100 group-hover:rotate-3">r</span>
            <span className="inline-block transition-transform duration-500 delay-150 group-hover:-rotate-3">i</span>
            <span className="inline-block transition-transform duration-500 delay-200 group-hover:rotate-3">z</span>
            <span className="inline-block transition-transform duration-500 delay-300 group-hover:-rotate-3">o</span>
            <span className="inline-block transition-transform duration-500 delay-300 group-hover:rotate-3">n</span>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-white relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative mr-4 w-64 group">
              <input
                type="text"
                placeholder="Search destination..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 transition-all duration-300 focus:ring-2 focus:ring-blue-500 group-hover:bg-white/30"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white transition-all duration-300 group-hover:text-blue-300"
                size={20}
              />
            </div>

            <div className="flex items-center space-x-2 group">
              <Globe
                className="text-white transition-all duration-300 group-hover:text-blue-300 group-hover:rotate-45"
                size={20}
              />
              <span className="text-sm text-white">EN</span>
            </div>

            <div className="flex space-x-2">
              <button className="text-white px-3 py-2 relative overflow-hidden group">
                <span className="relative z-10">Log In</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100"></span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full relative overflow-hidden group">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-blue-700 transition-all duration-500 transform origin-bottom scale-y-0 group-hover:scale-y-100"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
}