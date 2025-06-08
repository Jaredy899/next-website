import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { startTransition } from 'react';
import type { BlogPost } from '~/utils/blog';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, posts }) => {
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Close sidebar when a link is clicked
    onClose();
    
    // Use React's startTransition for navigation
    startTransition(() => {
      void router.push(href);
    });
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose} 
        aria-hidden="true"
      />
      <aside 
        id="sidebar" 
        className={`sidebar ${isOpen ? 'active' : ''}`} 
        aria-label="Blog navigation"
      >
        <button className="close-button" onClick={onClose} aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <div className="sidebar-header">
          <h2>Blog Posts</h2>
        </div>
        
        <div className="sidebar-content">
          <ul className="posts-list">
            {posts.map((post, index) => {
              const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              return (
                <React.Fragment key={post.slug}>
                  {index > 0 && <hr className="post-separator" />}
                  <li>
                    <Link 
                      href={`/blog/${post.slug}`}
                      onClick={(e) => handleLinkClick(e, `/blog/${post.slug}`)}
                      className="post-link"
                    >
                      <div className="post-title">{post.title}</div>
                      <div className="post-date">{formattedDate}</div>
                      <div className="post-description">{post.excerpt}</div>
                    </Link>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </aside>
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: calc(-1 * var(--sidebar-width, 400px));
          width: var(--sidebar-width, 400px);
          height: 100vh;
          background: var(--background);
          border-right: 1px solid var(--text);
          box-shadow: none;
          transition: left 0.3s ease, visibility 0.3s ease;
          z-index: 1001;
          visibility: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .sidebar.active {
          left: 0;
          visibility: visible;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 1000;
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }

        .close-button:hover {
          opacity: 0.7;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--text);
        }

        .sidebar-header h2 {
          margin: 0;
          color: var(--text);
          font-size: 1.5rem;
        }

        .sidebar-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .posts-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .posts-list li {
          margin-bottom: 1.5rem;
        }

        .post-separator {
          margin: 1.5rem 0;
          border: none;
          border-top: 1px solid rgba(var(--text-rgb), 0.2);
        }

        .post-link {
          display: block;
          text-decoration: none;
          color: var(--text);
          padding: 1rem;
          border: 1px solid transparent;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .post-link:hover {
          border-color: var(--text);
          background-color: rgba(var(--text-rgb), 0.1);
        }

        .post-title {
          font-weight: bold;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .post-date {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .post-description {
          font-size: 0.95rem;
          opacity: 0.8;
          line-height: 1.4;
          color: var(--text);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            left: -100%;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar; 