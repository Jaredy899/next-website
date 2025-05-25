import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '~/components/Layout';
import JCLogo from '~/components/JCLogo';
import SocialLinks from '~/components/SocialLinks';
import { getAllPosts } from '~/utils/blog';
import type { BlogPost } from '~/utils/blog';

interface HomeProps {
  posts: BlogPost[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout posts={posts}>
      <Head>
        <title>Jared Cervantes</title>
        <meta name="description" content="Personal website of Jared Cervantes" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="content">
        <Link href="/" className="logo-link">
          <div className="logo-container">
            <JCLogo />
          </div>
        </Link>
        <a
          href="https://home.jaredcervantes.com"
          className="home-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Personal Applications"
        >
          <div className="icon-container">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="24"
              height="24"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </div>
        </a>
        <SocialLinks />
      </div>

      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          height: calc(100vh - 4rem);
          margin-top: -2rem;
        }

        .logo-link {
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
        }

        .logo-container {
          width: 400px;
          height: 400px;
          view-transition-name: jc-logo;
          color: var(--text);
        }

        .home-link {
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          margin-top: -1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home-link:hover {
          color: var(--text);
          opacity: 0.8;
          transform: scale(1.1);
        }

        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-icon {
          fill: currentColor;
          width: 32px;
          height: 32px;
        }

        @media (max-width: 768px) {
          .logo-container {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
