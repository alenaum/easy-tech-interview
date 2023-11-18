type DocViewModel = {
  uri: string
  title: string
  content: string
  metadata?: any
  date?: string
  coverImage?: string
  excerpt?: string
  ogImage?: {
    url: string
  }
}

export default DocViewModel