import React from 'react';
import Link from 'next/link';
import type { BlogPostSummary } from '~/utils/blog';
import { formatDate } from '~/utils/date';
import { useViewTransitionRouter } from '~/utils/viewTransition';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPostSummary[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, posts }) => {
  const { push: navigateWithTransition } = useViewTransitionRouter();

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Close sidebar when a link is clicked
    onClose();
    
    // Use view transitions for navigation
    void navigateWithTransition(href);
  };

  return (
    <div 
      id="sidebar-overlay"
      className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
      onClick={onClose}
      aria-hidden="true"
    >
      <aside 
        id="sidebar" 
        className={`blog-sidebar ${isOpen ? 'open' : ''}`} 
        aria-label="Blog navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <h2>Blog Posts</h2>
          <button
            className="close-btn"
            id="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
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
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="sidebar-content">
          {sortedPosts.length === 0 ? (
            <div className="no-posts">No blog posts yet</div>
          ) : (
            <ul className="posts-list">
              {sortedPosts.map((post) => {
                const formattedDate = formatDate(post.pubDate);
                return (
                  <li key={post.slug}>
                    <Link 
                      href={`/blog/${post.slug}`}
                      onClick={(e) => handleLinkClick(e, `/blog/${post.slug}`)}
                      className="post-link"
                      aria-label={`${post.title} - Published on ${formattedDate}`}
                    >
                      <div className="post-title">{post.title}</div>
                      <div className="post-date">{formattedDate}</div>
                      {post.excerpt && (
                        <div className="post-description">{post.excerpt}</div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
      <style jsx>{`
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .blog-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 400px;
          height: 100vh;
          background-color: var(--background);
          border-right: 1px solid var(--text);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          z-index: 1001;
        }

        .blog-sidebar.open {
          transform: translateX(0);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          padding-left: 4rem;
          border-bottom: 1px solid var(--text);
        }

        .sidebar-header h2 {
          margin: 0;
          color: var(--text);
          font-size: 1.5rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 0.5rem;
          transition: opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          opacity: 0.7;
        }

        .sidebar-content {
          padding: 1.5rem;
        }

        .no-posts {
          text-align: center;
          color: var(--text);
          padding: 2rem;
          opacity: 0.7;
        }

        .posts-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .posts-list li {
          margin-bottom: 1.5rem;
        }

        .post-title {
          font-weight: bold;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .post-date {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }

        .post-description {
          font-size: 0.95rem;
          opacity: 0.8;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .blog-sidebar {
            width: 100%;
          }
          
          .sidebar-header {
            padding-left: 3.5rem;
          }
        }
      `}</style>
      <style jsx global>{`
        .post-link {
          display: block;
          text-decoration: none;
          color: var(--text);
          padding: 1rem;
          border: 1px solid transparent;
          border-radius: 8px;
          transition: all 0.2s ease;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          box-sizing: border-box;
        }

        .post-link:hover {
          border-color: var(--text);
          background-color: rgba(128, 128, 128, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
