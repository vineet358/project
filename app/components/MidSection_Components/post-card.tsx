import Image from "next/image";
import { Heart, MessageSquare, Share2 } from "lucide-react";

interface PostCardProps {
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageSrc?: string;
}

export default function PostCard({
  category,
  title,
  author,
  date,
  readTime,
  excerpt,
  imageSrc,
}: PostCardProps) {
  return (
    <div className="bg-[#F4F4F4] dark:bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-[#E0E0E0] dark:border-[#333333]">
      {imageSrc && (
        <div className="relative w-full h-52">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-[#0077B6] dark:bg-[#0A1A2F] text-white shadow-md">
            {category}
          </span>
        </div>
      )}
      {!imageSrc && (
        <div className="p-4">
          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[#0077B6] dark:bg-[#0A1A2F] text-white">
            {category}
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-[#333333] dark:text-[#F5F5F5]">
          {title}
        </h3>
        <div className="text-sm text-[#666666] dark:text-[#A0A0A0] mb-3">
          By <span className="font-medium text-[#0077B6] dark:text-[#00E5FF]">{author}</span> • {date} • {readTime} read
        </div>
        <p className="text-[#666666] dark:text-[#A0A0A0] mb-5 flex-grow leading-relaxed">
          {excerpt}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <button className="text-[#0077ff] dark:text-[#8A2BE2] hover:underline transition-all font-bold">
            Read More
          </button>
          <div className="flex gap-2">
            {[
              { icon: Heart, label: "Like" },
              { icon: MessageSquare, label: "Comment" },
              { icon: Share2, label: "Share" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="p-2 rounded-full hover:bg-[#B2F2BB] dark:hover:bg-[#00FFFF] transition-all duration-200 flex items-center justify-center"
                aria-label={label}
              >
                <Icon size={18} className="text-[#555555] dark:text-[#CCCCCC] transition-transform duration-200 hover:scale-110" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
