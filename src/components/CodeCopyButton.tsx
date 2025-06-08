import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const CodeCopyButton: React.FC = () => {
  const router = useRouter();

  const cleanupCopyButtons = () => {
    // Remove all copy buttons and unwrap code blocks
    const wrappers = document.querySelectorAll('.code-block-wrapper');
    wrappers.forEach(wrapper => {
      const preElement = wrapper.querySelector('pre');
      const copyButton = wrapper.querySelector('.copy-code-button');
      
      if (preElement && wrapper.parentElement) {
        // Remove copy button
        if (copyButton) {
          copyButton.remove();
        }
        // Move pre element back to original parent
        wrapper.parentElement.insertBefore(preElement, wrapper);
        // Remove wrapper
        wrapper.remove();
      }
    });
  };

  const setupCopyButtons = () => {
    // Clean up existing buttons first
    cleanupCopyButtons();
    
    // Try multiple selectors to find code blocks
    const codeBlocks = document.querySelectorAll("pre:not(.code-block-wrapper pre)");

    codeBlocks.forEach((preElement) => {
      if (!preElement.parentElement) return;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      preElement.parentElement.insertBefore(wrapper, preElement);
      wrapper.appendChild(preElement);

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

      btn.addEventListener("click", async () => {
        try {
          // Get text from the code element or pre element
          const textElement = preElement.querySelector('code') || preElement;
          const text = textElement.textContent || "";
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
      });

      wrapper.appendChild(btn);
    });
  };

  useEffect(() => {
    // Initial setup
    setupCopyButtons();
    
    // Setup with a slight delay to ensure content is rendered
    const timer1 = setTimeout(() => {
      setupCopyButtons();
    }, 100);
    
    // Additional delay for MDX content
    const timer2 = setTimeout(() => {
      setupCopyButtons();
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      cleanupCopyButtons();
    };
  }, []);

  useEffect(() => {
    // Listen for route changes
    const handleRouteChangeStart = () => {
      cleanupCopyButtons();
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setupCopyButtons();
      }, 100);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
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
        background: var(--code-bg) !important;
        border-radius: 8px !important;
        overflow-x: auto !important;
        border: 1px solid var(--border) !important;
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
        color: var(--text) !important;
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
    `}</style>
  );
};

export default CodeCopyButton; 