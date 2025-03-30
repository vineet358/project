import BlogEditor from "@/app/components/editor/blog-editor"
import FormattingHelper from "@/app/components/editor/formatting-helper"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header/>
      <BlogEditor />
      <FormattingHelper />
      <Footer/>
    </main>
  )
}

