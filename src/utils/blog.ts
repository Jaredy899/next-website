import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  pubDate: string;
  content: string;
  excerpt: string;
  draft: boolean;
}

const postsDirectory = join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  // Get all files in the posts directory
  const fileNames = readdirSync(postsDirectory);
  
  // Get the data from each file
  const posts = fileNames.map((fileName) => {
    // Remove ".md" or ".mdx" from file name to get slug
    const slug = fileName.replace(/\.(md|mdx)$/, '');

    // Read markdown file as string
    const fullPath = join(postsDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Create excerpt from content
    const excerpt = content.split('\n').slice(0, 3).join(' ');

    // Combine the data with the slug
    return {
      slug,
      title: data.title,
      pubDate: new Date(data.pubDate).toISOString(),
      content,
      excerpt,
      draft: data.draft ?? false,
    };
  });

  // Sort posts by date and filter out drafts
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Try .mdx first, then fall back to .md
    let fullPath = join(postsDirectory, `${slug}.mdx`);
    try {
      readFileSync(fullPath, 'utf8');
    } catch {
      fullPath = join(postsDirectory, `${slug}.md`);
    }

    const fileContents = readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Create excerpt from content
    const excerpt = content.split('\n').slice(0, 3).join(' ');

    return {
      slug,
      title: data.title,
      pubDate: new Date(data.pubDate).toISOString(),
      content,
      excerpt,
      draft: data.draft ?? false,
    };
  } catch (error) {
    return null;
  }
} 