import type { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { formatDate } from '../utils/date';
import CodeCopyButton from './CodeCopyButton';
import { MDXComponents } from './MDXComponents';

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
        <MDXProvider components={MDXComponents}>
          {children}
        </MDXProvider>
      </div>
      <CodeCopyButton />
    </article>
  );
} 