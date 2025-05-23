import React, { useState, useEffect } from 'react';
import { useTheme } from '~/context/ThemeContext';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import type { BlogPost } from '~/utils/blog';

interface LayoutProps {
  children: React.ReactNode;
  posts: BlogPost[];
}

const Layout: React.FC<LayoutProps> = ({ children, posts }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const layoutClasses = [
    'layout',
    mounted ? theme : '',
    isSidebarOpen ? 'sidebar-open' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={layoutClasses}>
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

        @media (max-width: 768px) {
          .layout.sidebar-open {
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout; 