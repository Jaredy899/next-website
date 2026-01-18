import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '~/context/ThemeContext';
import Sidebar from './Sidebar';
import type { BlogPostSummary } from '~/utils/blog';
import Link from 'next/link';
import JCLogo from './JCLogo';
import ThemeToggle from './ThemeToggle';
import { useViewTransitionRouter } from '~/utils/viewTransition';

interface LayoutProps {
  children: React.ReactNode;
  posts: BlogPostSummary[];
}

const Layout: React.FC<LayoutProps> = ({ children, posts }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { push: navigateWithTransition } = useViewTransitionRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    void navigateWithTransition(href);
  };

  const layoutClasses = [
    'layout',
    mounted ? theme : '',
    isSidebarOpen ? 'sidebar-open' : '',
    router.pathname.startsWith('/blog') ? 'blog' : ''
  ].filter(Boolean).join(' ');

  // Determine if we should show header logo
  const showHeaderLogo = router.pathname.startsWith('/blog');

  return (
    <div className={layoutClasses}>
      <header className="main-header">
        <div className="header-content">
          <div className="left-controls">
            <button 
              onClick={toggleSidebar}
              className="blog-button"
              aria-label="Toggle blog sidebar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="8" y1="6" x2="8" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {showHeaderLogo && (
            <div className="center-logo">
              <Link href="/" onClick={(e) => handleNavigation(e, '/')}>
                <div className="logo-container" style={{ viewTransitionName: 'jc-logo' }}>
                  <JCLogo />
                </div>
              </Link>
            </div>
          )}
          
          <div className="right-controls">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        posts={posts}
      />
      <main className="main-content" style={{ viewTransitionName: 'main-content' }}>
        {children}
      </main>
      <style jsx>{`
        .layout {
          min-height: 100vh;
          background: var(--background);
          color: var(--text);
          transition: padding-left 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .layout.sidebar-open {
          padding-left: 400px;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* Blog page content */
        .layout.blog .main-content {
          margin-top: 1rem;
        }

        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4rem;
          background: var(--background);
          z-index: 1001;
        }

        .header-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.5rem;
          position: relative;
        }

        .left-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 10;
        }

        .right-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 10;
        }

        .center-logo {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .logo-container {
          color: var(--text);
          width: 60px;
          height: 60px;
          display: block;
          transition: transform 0.2s ease;
        }

        .logo-container:hover {
          transform: scale(1.1);
        }

        .logo-container svg {
          width: 100%;
          height: 100%;
          color: inherit;
        }

        .blog-button {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s ease;
        }

        .blog-button:hover {
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .layout.sidebar-open {
            padding-left: 0;
          }
          
          .logo-container {
            width: 48px;
            height: 48px;
          }

          .layout.blog .main-content {
            margin-top: 3rem;
          }

          .header-content {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout; 