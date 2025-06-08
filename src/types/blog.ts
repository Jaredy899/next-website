export interface BlogPost {
  slug: string;
  title: string;
  pubDate: Date;
}

export interface BlogPostProps {
  posts: BlogPost[];
} 