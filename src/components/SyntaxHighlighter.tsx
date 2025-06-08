import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CustomSyntaxHighlighterProps {
  children: string;
  language?: string;
  className?: string;
}

const CustomSyntaxHighlighter: React.FC<CustomSyntaxHighlighterProps> = ({
  children,
  language = 'text',
  className = '',
}) => {
  // Extract language from className if provided (e.g., "language-javascript")
  const detectedLanguage = className.includes('language-') 
    ? className.replace('language-', '') 
    : language;

  // Always use dark theme for consistent appearance
  const syntaxTheme = oneDark;

  return (
    <SyntaxHighlighter
      language={detectedLanguage}
      style={syntaxTheme}
      customStyle={{
        margin: 0,
        padding: '1rem',
        paddingRight: '6rem',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: '#282c34',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
      }}
      codeTagProps={{
        style: {
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
        }
      }}
      showLineNumbers={false}
      wrapLines={true}
      wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CustomSyntaxHighlighter; 