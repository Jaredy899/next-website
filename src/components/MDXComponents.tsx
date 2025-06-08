import React from 'react';
import CustomSyntaxHighlighter from './SyntaxHighlighter';

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
}

const Code: React.FC<CodeProps> = ({ children, className, ...props }) => {
  // If it's inline code (no className), render as normal
  if (!className) {
    return (
      <code 
        {...props}
        style={{
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
          fontSize: '0.9rem',
          background: 'rgba(var(--text-rgb), 0.1)',
          padding: '0.2rem 0.4rem',
          borderRadius: '0.25rem',
        }}
      >
        {children}
      </code>
    );
  }

  // For code blocks, use our custom syntax highlighter
  return (
    <CustomSyntaxHighlighter className={className}>
      {String(children).replace(/\n$/, '')}
    </CustomSyntaxHighlighter>
  );
};

const Pre: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Extract the code element from pre
  if (React.isValidElement(children) && children.type === 'code') {
    return <>{children}</>;
  }
  
  // Fallback for other pre content
  return <pre>{children}</pre>;
};

export const MDXComponents = {
  code: Code,
  pre: Pre,
};

export default MDXComponents; 