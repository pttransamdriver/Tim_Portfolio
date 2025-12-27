export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentFile: string;
  author: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  image?: string;
  draft?: boolean;
}

export const blogPosts: BlogPost[];
