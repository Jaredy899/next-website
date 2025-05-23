import React from 'react';
import { useTheme } from '~/context/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  onBlogClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onBlogClick }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="navigation">
      <div className="nav-content">
        <button 
          onClick={onBlogClick}
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
        {mounted && <ThemeToggle />}
      </div>
      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4rem;
          background: var(--background);
          border-bottom: 1px solid var(--border);
          z-index: 100;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
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
          .nav-content {
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation; 