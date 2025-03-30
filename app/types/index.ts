export interface BlogPost {
    title: string
    category: string
    tags: string[]
    content: string
    featuredImage: string | null
    selectedFont: string
  }
  
  export interface DraftPost {
    id: string
    title: string
    excerpt: string
    category: string
    timestamp: string
    image: string
  }
  
  