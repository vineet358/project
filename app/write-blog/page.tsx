import BlogEditor from "@/app/components/editor/blog-editor"
import FormattingHelper from "@/app/components/editor/formatting-helper"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <BlogEditor />
      <FormattingHelper />
    </main>
  )
}

