import React from 'react';
import { useTheme } from '~/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="icon-container">
        <svg
          className="sun"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
        </svg>
        <svg
          className="moon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      </div>
      <style jsx>{`
        .theme-toggle {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 0.25rem;
          position: fixed;
          top: 0.75rem;
          right: 0.75rem;
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        .theme-toggle:hover {
          transform: scale(1.1);
          opacity: 1;
        }
        .icon-container {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .sun, .moon {
          position: absolute;
          width: 20px;
          height: 20px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .light .sun {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        .light .moon {
          transform: scale(0) rotate(-90deg);
          opacity: 0;
        }
        .dark .sun {
          transform: scale(0) rotate(90deg);
          opacity: 0;
        }
        .dark .moon {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        .theme-toggle:hover .sun {
          transform: rotate(15deg);
        }
        .theme-toggle:hover .moon {
          transform: rotate(-15deg);
        }
      `}</style>
    </button>
  );
};

export default ThemeToggle; 