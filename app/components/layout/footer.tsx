import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#00E5FF] rounded-full w-10 h-10 flex items-center justify-center text-[#0A1A2F] font-bold">
                B
              </div>
              <span className="text-black dark:text-[#F5F5F5] text-xl font-bold">BlogHub</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              A platform for sharing knowledge, insights, and stories from our community.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black dark:text-[#F5F5F5] text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-black dark:text-[#F5F5F5] text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Writing Guidelines
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-black dark:text-[#F5F5F5] text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-[#8A2BE2] mt-1 flex-shrink-0" size={18} />
                <a href="mailto:contact@bloghub.com" className="text-[#00E5FF] hover:underline">
                  contact@bloghub.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-[#8A2BE2] mt-1 flex-shrink-0" size={18} />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-[#00FFFF] transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-[#8A2BE2] mt-1 flex-shrink-0" size={18} />
                <address className="text-gray-400 not-italic">
                  123 Blog Street
                  <br />
                  Knowledge City, KN 12345
                  <br />
                  United States
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; 2025 BlogHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#00FFFF] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-[#00FFFF] transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-gray-500 hover:text-[#00FFFF] transition-colors">
              Cookies
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-500 hover:text-[#00FFFF] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
