import type { ReactNode } from 'react';
import { formatDate } from '../utils/date';
import '../styles/mdx.css';
import '../styles/blog.css';

interface MDXLayoutProps {
  children: ReactNode;
  metadata: {
    title: string;
    pubDate: string;
  };
}

export function MDXLayout({ children, metadata }: MDXLayoutProps) {
  return (
    <article className="blog-post">
      <h1>{metadata.title}</h1>
      <div className="date">{formatDate(metadata.pubDate)}</div>
      <div className="mdx-content">
        {children}
      </div>
    </article>
  );
} 