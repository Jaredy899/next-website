import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '~/context/ThemeContext';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import type { BlogPost } from '~/utils/blog';
import { enableViewTransitions } from '~/app/view-transitions';
import Link from 'next/link';
import JCLogo from './JCLogo';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  posts: BlogPost[];
}

const Layout: React.FC<LayoutProps> = ({ children, posts }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    enableViewTransitions();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  const layoutClasses = [
    'layout',
    mounted ? theme : '',
    isSidebarOpen ? 'sidebar-open' : '',
    router.pathname.startsWith('/blog') ? 'blog' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={layoutClasses}>
      <header className="main-header">
        <div className="header-content">
          <div className="nav-controls">
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
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </button>
          </div>
          {router.pathname.startsWith('/blog') && (
            <Link href="/" onClick={(e) => handleNavigation(e, '/')}>
              <div className="logo-container">
                <JCLogo />
              </div>
            </Link>
          )}
          <div className="nav-controls">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        posts={posts}
      />
      <main className="main-content">
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
          padding-left: 300px;
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
          border-bottom: 1px solid var(--border);
          z-index: 1001;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 2rem;
        }

        .logo-container {
          color: var(--text);
          view-transition-name: jc-logo-blog;
          width: 60px;
          height: 60px;
          display: block;
        }

        .logo-container svg {
          width: 100%;
          height: 100%;
          color: inherit;
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 60px; /* Match logo width to maintain center alignment */
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

          .nav-controls {
            width: 48px; /* Match mobile logo width */
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