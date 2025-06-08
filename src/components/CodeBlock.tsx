import React, { useEffect } from 'react';
import { useTheme } from '~/context/ThemeContext';

const CodeBlock: React.FC = () => {
  const { theme } = useTheme();

  const setupCopyButtons = () => {
    // Try multiple selectors to find code blocks
    const codeBlocks = document.querySelectorAll("pre code, pre, .highlight code, .code-block code");

    codeBlocks.forEach((codeBlock) => {
      // Find the pre element (could be the codeBlock itself or its parent)
      const preElement = codeBlock.tagName === 'PRE' ? codeBlock : codeBlock.closest('pre');
      if (!preElement) {
        return;
      }

      // Check if we already have a wrapper
      let wrapper = preElement.parentElement;
      if (!wrapper?.classList.contains("code-block-wrapper")) {
        const newWrapper = document.createElement("div");
        newWrapper.className = "code-block-wrapper";
        preElement.parentElement?.insertBefore(newWrapper, preElement);
        newWrapper.appendChild(preElement);
        wrapper = newWrapper;
      }

      // Check if copy button already exists
      if (!wrapper.querySelector(".copy-code-button")) {
        const copySVG = `
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4
                     a2 2 0 0 1 2-2h9
                     a2 2 0 0 1 2 2v1"/>
          </svg>`.trim();

        const checkSVG = `
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>`.trim();

        const btn = document.createElement("button");
        btn.className = "copy-code-button";
        btn.setAttribute("aria-label", "Copy code");
        btn.innerHTML = copySVG;

        btn.addEventListener("click", () => {
          void (async () => {
            try {
              // Get text from the code element or pre element
              const textElement = preElement.querySelector('code') ?? preElement;
              const text = textElement.textContent ?? "";
              await navigator.clipboard.writeText(text);

              const prev = btn.innerHTML;
              btn.innerHTML = 
                checkSVG + '<span class="btn-text">Copied!</span>';
              btn.classList.add("copied");

              setTimeout(() => {
                btn.innerHTML = prev;
                btn.classList.remove("copied");
              }, 2000);
            } catch (err) {
              console.error("Failed to copy code:", err);
            }
          })();
        });

        wrapper.appendChild(btn);
      }
    });
  };

  useEffect(() => {
    // Initial setup
    setupCopyButtons();
    
    // Setup with a slight delay to ensure content is rendered
    setTimeout(() => {
      setupCopyButtons();
    }, 100);
    
    // Additional delay for MDX content
    setTimeout(() => {
      setupCopyButtons();
    }, 1000);
    
    // Also listen for any DOM mutations (content updates)
    const observer = new MutationObserver(() => {
      setupCopyButtons();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .code-block-wrapper {
          position: relative;
          margin: 1rem 0;
          border-radius: 0.5rem;
          background: transparent;
          border: none;
          overflow: visible;
          box-shadow: none;
          padding: 0;
        }

        .copy-code-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.25rem;
          cursor: pointer;
          color: #e2e8f0;
          transition: all 0.2s ease;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          backdrop-filter: blur(4px);
          pointer-events: auto;
          flex-shrink: 0;
          min-width: 1.75rem;
          min-height: 1.75rem;
          font-size: 0.875rem;
        }

        .copy-code-button svg {
          width: 1rem;
          height: 1rem;
          stroke: currentColor;
          fill: none;
        }

        .copy-code-button .btn-text {
          margin-left: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .copy-code-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .copy-code-button.copied {
          background: rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.4);
          color: #22c55e;
        }

        .copy-code-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        /* Clean code block styling */
        .code-block-wrapper pre {
          margin: 0 !important;
          padding: 1rem !important;
          padding-right: 6rem !important;
          background: ${theme === 'dark' ? '#1a1a1a' : '#f8f9fa'} !important;
          border-radius: 8px !important;
          overflow-x: auto !important;
          border: ${theme === 'dark' ? 'none' : '1px solid #e9ecef'} !important;
          box-shadow: none !important;
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          white-space: pre !important;
          word-wrap: normal !important;
          font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace !important;
          position: relative !important;
          scrollbar-width: thin !important;
        }

        .code-block-wrapper code {
          font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace !important;
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
          color: ${theme === 'dark' ? '#e2e8f0' : '#1a202c'} !important;
          background: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
          border: none !important;
          display: block !important;
          white-space: pre !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          padding-right: 0 !important;
        }

        /* Syntax highlighting colors for dark theme */
        ${theme === 'dark' ? `
          .code-block-wrapper .hljs-keyword,
          .code-block-wrapper .hljs-selector-tag,
          .code-block-wrapper .hljs-literal,
          .code-block-wrapper .hljs-section,
          .code-block-wrapper .hljs-link {
            color: #c792ea !important;
          }

          .code-block-wrapper .hljs-function .hljs-keyword {
            color: #82aaff !important;
          }

          .code-block-wrapper .hljs-subst {
            color: #e2e8f0 !important;
          }

          .code-block-wrapper .hljs-string,
          .code-block-wrapper .hljs-title,
          .code-block-wrapper .hljs-name,
          .code-block-wrapper .hljs-type,
          .code-block-wrapper .hljs-attribute,
          .code-block-wrapper .hljs-symbol,
          .code-block-wrapper .hljs-bullet,
          .code-block-wrapper .hljs-addition,
          .code-block-wrapper .hljs-variable,
          .code-block-wrapper .hljs-template-tag,
          .code-block-wrapper .hljs-template-variable {
            color: #c3e88d !important;
          }

          .code-block-wrapper .hljs-comment,
          .code-block-wrapper .hljs-quote,
          .code-block-wrapper .hljs-deletion,
          .code-block-wrapper .hljs-meta {
            color: #546e7a !important;
          }

          .code-block-wrapper .hljs-keyword,
          .code-block-wrapper .hljs-selector-tag,
          .code-block-wrapper .hljs-literal,
          .code-block-wrapper .hljs-doctag,
          .code-block-wrapper .hljs-title,
          .code-block-wrapper .hljs-section,
          .code-block-wrapper .hljs-type,
          .code-block-wrapper .hljs-name,
          .code-block-wrapper .hljs-strong {
            font-weight: bold;
          }

          .code-block-wrapper .hljs-number {
            color: #f78c6c !important;
          }

          .code-block-wrapper .hljs-built_in,
          .code-block-wrapper .hljs-builtin-name,
          .code-block-wrapper .hljs-params,
          .code-block-wrapper .hljs-attr {
            color: #ffcb6b !important;
          }

          .code-block-wrapper .hljs-class .hljs-title {
            color: #ffcb6b !important;
          }

          .code-block-wrapper .hljs-title.class_ {
            color: #ffcb6b !important;
          }

          .code-block-wrapper .hljs-title.function_ {
            color: #82aaff !important;
          }

          .code-block-wrapper .hljs-tag {
            color: #f07178 !important;
          }

          .code-block-wrapper .hljs-tag .hljs-name {
            color: #f07178 !important;
          }

          .code-block-wrapper .hljs-tag .hljs-attr {
            color: #c792ea !important;
          }
        ` : `
          /* Light theme syntax highlighting */
          .code-block-wrapper .hljs-keyword,
          .code-block-wrapper .hljs-selector-tag,
          .code-block-wrapper .hljs-literal,
          .code-block-wrapper .hljs-section,
          .code-block-wrapper .hljs-link {
            color: #d73a49 !important;
          }

          .code-block-wrapper .hljs-function .hljs-keyword {
            color: #6f42c1 !important;
          }

          .code-block-wrapper .hljs-subst {
            color: #24292e !important;
          }

          .code-block-wrapper .hljs-string,
          .code-block-wrapper .hljs-title,
          .code-block-wrapper .hljs-name,
          .code-block-wrapper .hljs-type,
          .code-block-wrapper .hljs-attribute,
          .code-block-wrapper .hljs-symbol,
          .code-block-wrapper .hljs-bullet,
          .code-block-wrapper .hljs-addition,
          .code-block-wrapper .hljs-variable,
          .code-block-wrapper .hljs-template-tag,
          .code-block-wrapper .hljs-template-variable {
            color: #032f62 !important;
          }

          .code-block-wrapper .hljs-comment,
          .code-block-wrapper .hljs-quote,
          .code-block-wrapper .hljs-deletion,
          .code-block-wrapper .hljs-meta {
            color: #6a737d !important;
          }

          .code-block-wrapper .hljs-keyword,
          .code-block-wrapper .hljs-selector-tag,
          .code-block-wrapper .hljs-literal,
          .code-block-wrapper .hljs-doctag,
          .code-block-wrapper .hljs-title,
          .code-block-wrapper .hljs-section,
          .code-block-wrapper .hljs-type,
          .code-block-wrapper .hljs-name,
          .code-block-wrapper .hljs-strong {
            font-weight: bold;
          }

          .code-block-wrapper .hljs-number {
            color: #005cc5 !important;
          }

          .code-block-wrapper .hljs-built_in,
          .code-block-wrapper .hljs-builtin-name,
          .code-block-wrapper .hljs-params,
          .code-block-wrapper .hljs-attr {
            color: #e36209 !important;
          }

          .code-block-wrapper .hljs-class .hljs-title {
            color: #6f42c1 !important;
          }

          .code-block-wrapper .hljs-title.class_ {
            color: #6f42c1 !important;
          }

          .code-block-wrapper .hljs-title.function_ {
            color: #6f42c1 !important;
          }

          .code-block-wrapper .hljs-tag {
            color: #22863a !important;
          }

          .code-block-wrapper .hljs-tag .hljs-name {
            color: #22863a !important;
          }

          .code-block-wrapper .hljs-tag .hljs-attr {
            color: #6f42c1 !important;
          }
        `}

        /* Copy button styling for all themes */
        .copy-code-button {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          color: ${theme === 'dark' ? '#e2e8f0' : '#4a5568'};
        }

        .copy-code-button:hover {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
          color: ${theme === 'dark' ? '#ffffff' : '#2d3748'};
        }

        .copy-code-button.copied {
          background: rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.4);
          color: #22c55e;
        }
      `}</style>
    </>
  );
};

export default CodeBlock; 