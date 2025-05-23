import React from 'react';
import type { BlogPost } from '~/utils/blog';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, posts }) => {
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
        <nav aria-labelledby="blog-posts-heading">
          <h2 id="blog-posts-heading" aria-label="Blog Posts Navigation">Blog Posts</h2>
          <div className="blog-archive" role="list" aria-labelledby="blog-posts-heading">
            <ul aria-label="Blog posts list" role="list">
              {posts.map((post, index) => {
                const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US');
                return (
                  <React.Fragment key={post.slug}>
                    {index > 0 && <hr className="post-separator" />}
                    <li role="listitem">
                      <a 
                        href={`/blog/${post.slug}`}
                        aria-label={`${post.title} - Published on ${formattedDate}`}
                      >
                        {post.title} <span className="post-date">({formattedDate})</span>
                      </a>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: calc(-1 * var(--sidebar-width, 300px));
          width: var(--sidebar-width, 300px);
          height: 100vh;
          background: var(--background);
          box-shadow: none;
          transition: left 0.3s ease, visibility 0.3s ease;
          z-index: 1001;
          padding: 2rem;
          visibility: hidden;
        }

        .sidebar.active {
          left: 0;
          visibility: visible;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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

        .sidebar nav {
          margin-top: 2rem;
        }

        .sidebar h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text);
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .sidebar li {
          margin: 0.5rem 0;
        }

        .sidebar a {
          color: var(--text);
          text-decoration: none;
          font-size: 1.1rem;
          transition: color 0.2s ease;
          display: inline;
        }

        .sidebar a:hover {
          color: rgb(var(--accent));
        }

        .post-date {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-left: 0.25rem;
        }

        .post-separator {
          margin: 1rem 0;
          border: none;
          border-top: 1px solid rgba(var(--text), 0.1);
        }

        .blog-archive {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default Sidebar; 