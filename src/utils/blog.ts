import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  pubDate: string;
  content: string;
  draft?: boolean;
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => {
      // Only include .mdx files
      return fileName.endsWith('.mdx');
    })
    .map((fileName) => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Ensure pubDate is a string in ISO format
      const pubDate = new Date(data.pubDate).toISOString();

      return {
        slug,
        title: data.title,
        excerpt: data.description || '',
        pubDate,
        content,
        draft: data.draft || false,
      };
    });

  // Sort posts by date
  return allPostsData
    .filter((post) => !post.draft)
    .sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Try .mdx first
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure pubDate is a string in ISO format
    const pubDate = new Date(data.pubDate).toISOString();

    return {
      slug,
      title: data.title,
      excerpt: data.description || '',
      pubDate,
      content,
      draft: data.draft || false,
    };
  } catch (e) {
    // If .mdx doesn't exist, try .md
    try {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Ensure pubDate is a string in ISO format
      const pubDate = new Date(data.pubDate).toISOString();

      return {
        slug,
        title: data.title,
        excerpt: data.description || '',
        pubDate,
        content,
        draft: data.draft || false,
      };
    } catch (e) {
      return null;
    }
  }
} 