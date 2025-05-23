import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '~/components/Layout';
import { getAllPosts, getPostBySlug } from '~/utils/blog';
import type { BlogPost } from '~/utils/blog';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import JCLogo from '~/components/JCLogo';

interface BlogPostPageProps {
  post: BlogPost;
  posts: BlogPost[];
  mdxSource: any;
}

export default function BlogPostPage({ post, posts, mdxSource }: BlogPostPageProps) {
  return (
    <Layout posts={posts}>
      <Head>
        <title>{post.title} | Jared Cervantes</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <Link href="/" className="logo-link">
        <div className="logo-container">
          <JCLogo />
        </div>
      </Link>

      <article className="blog-post">
        <header>
          <h1>{post.title}</h1>
          <time dateTime={post.pubDate}>
            {new Date(post.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        <div className="content">
          <MDXRemote {...mdxSource} />
        </div>
      </article>

      <style jsx>{`
        .logo-link {
          position: fixed;
          top: 7rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-container {
          width: 100px;
          height: 100px;
          color: var(--text);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-link:hover .logo-container {
          transform: scale(1.1);
        }

        .blog-post {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          margin-top: 200px;
        }

        header {
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          margin: 0 0 1rem;
          color: var(--text);
        }

        time {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .content {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text);
        }

        .content :global(h2) {
          font-size: 1.8rem;
          margin: 2rem 0 1rem;
        }

        .content :global(p) {
          margin: 1rem 0;
        }

        .content :global(ul), .content :global(ol) {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .content :global(li) {
          margin: 0.5rem 0;
        }

        .content :global(a) {
          color: var(--accent);
          text-decoration: none;
        }

        .content :global(a:hover) {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .logo-link {
            top: 6rem;
          }

          .blog-post {
            padding: 1rem;
            margin-top: 180px;
          }

          h1 {
            font-size: 2rem;
          }

          .logo-container {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  const posts = getAllPosts();

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content);

  return {
    props: {
      post,
      posts,
      mdxSource,
    },
  };
}; 