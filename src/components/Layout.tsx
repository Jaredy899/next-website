import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '~/context/ThemeContext';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import type { BlogPost } from '~/utils/blog';
import { enableViewTransitions } from '~/app/view-transitions';
import Link from 'next/link';
import JCLogo from './JCLogo';

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
      {router.pathname.startsWith('/blog') && (
        <header>
          <Link href="/" onClick={(e) => handleNavigation(e, '/')}>
            <div className="logo-container">
              <JCLogo />
            </div>
          </Link>
        </header>
      )}
      <Navigation onBlogClick={toggleSidebar} />
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
          margin-top: 4rem;
        }

        header {
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Blog page header */
        .layout.blog header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1002;
          background: var(--background);
        }

        .logo-container {
          color: var(--text);
          view-transition-name: jc-logo;
          width: 40px;
          height: 40px;
          display: block;
        }

        .logo-container svg {
          width: 100%;
          height: 100%;
          color: inherit;
        }

        @media (max-width: 768px) {
          .layout.sidebar-open {
            padding-left: 0;
          }
          
          .logo-container {
            width: 32px;
            height: 32px;
          }

          .layout.blog .main-content {
            margin-top: 3rem;
          }
        }

        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4rem;
          background: var(--background);
          border-bottom: 1px solid var(--border);
          z-index: 1100;
        }
      `}</style>
    </div>
  );
};

export default Layout; 