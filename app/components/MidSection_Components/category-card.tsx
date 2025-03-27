import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  icon: LucideIcon
  title: string
  postCount: number
}

export default function CategoryCard({ icon: Icon, title, postCount }: CategoryCardProps) {
  return (
    <div className="group flex flex-col items-center justify-center p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1A1A1A] shadow-sm hover:shadow-lg transition-all hover:bg-[#B2F2BB] dark:hover:bg-[#00FFFF]">
      <div className="w-12 h-12 flex items-center justify-center text-[#0077B6] dark:text-[#00E5FF] mb-2 group-hover:text-[#333333] dark:group-hover:text-black">
        <Icon size={28} />
      </div>
      <h3 className="font-medium text-[#333333] dark:text-[#F5F5F5] hover:text-black group-hover:text-[#333333] dark:group-hover:text-black text-sm">
        {title}
      </h3>
      <p className="text-sm text-[#666666] dark:text-[#A0A0A0]">{postCount} posts</p>
    </div>
  )
}
