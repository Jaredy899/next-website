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

// Lighter version without content for sidebar/listings
export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  pubDate: string;
}

interface FrontMatter {
  title: string;
  description?: string;
  pubDate: string | Date;
  draft?: boolean;
}

/**
 * Recursively find all markdown files in a directory
 */
function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export function getAllPosts(): BlogPost[] {
  const allFiles = getAllMarkdownFiles(postsDirectory);
  
  const allPostsData = allFiles.map((filePath) => {
    // Get relative path from postsDirectory to use as slug
    const relativePath = path.relative(postsDirectory, filePath);
    // Remove extension and normalize path separators to forward slashes
    const slug = relativePath
      .replace(/\.(md|mdx)$/, '')
      .replace(/\\/g, '/');

    // Read markdown file as string
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);
    const frontMatter = data as FrontMatter;

    // Ensure pubDate is a string in ISO format
    const pubDate = new Date(frontMatter.pubDate).toISOString();

    return {
      slug,
      title: frontMatter.title,
      excerpt: frontMatter.description ?? '',
      pubDate,
      content,
      draft: frontMatter.draft ?? false,
    };
  });

  // Sort posts by date
  return allPostsData
    .filter((post) => !post.draft)
    .sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}

/**
 * Get all posts without content (for sidebar/listings)
 * This reduces page data size significantly
 */
export function getAllPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map(({ slug, title, excerpt, pubDate }) => ({
    slug,
    title,
    excerpt,
    pubDate,
  }));
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Try .mdx first
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    try {
      const fileContents = fs.readFileSync(mdxPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontMatter = data as FrontMatter;

      // Ensure pubDate is a string in ISO format
      const pubDate = new Date(frontMatter.pubDate).toISOString();

      return {
        slug,
        title: frontMatter.title,
        excerpt: frontMatter.description ?? '',
        pubDate,
        content,
        draft: frontMatter.draft ?? false,
      };
    } catch {
      return null;
    }
  }

  // If .mdx doesn't exist, try .md
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(mdPath)) {
    try {
      const fileContents = fs.readFileSync(mdPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontMatter = data as FrontMatter;

      // Ensure pubDate is a string in ISO format
      const pubDate = new Date(frontMatter.pubDate).toISOString();

      return {
        slug,
        title: frontMatter.title,
        excerpt: frontMatter.description ?? '',
        pubDate,
        content,
        draft: frontMatter.draft ?? false,
      };
    } catch {
      return null;
    }
  }

  return null;
} 