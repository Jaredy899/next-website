import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Layout from '~/components/Layout';
import { getAllPosts, getPostBySlug } from '~/utils/blog';
import type { BlogPost } from '~/utils/blog';
import { MDXLayout } from '~/components/MDXLayout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

interface BlogPostPageProps {
  post: BlogPost & {
    mdxSource: MDXRemoteSerializeResult;
  };
  posts: BlogPost[];
}

export default function BlogPostPage({ post, posts }: BlogPostPageProps) {
  return (
    <Layout posts={posts}>
      <Head>
        <title>{`${post.title} | Jared Cervantes`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <MDXLayout metadata={{ title: post.title, pubDate: post.pubDate }}>
        <MDXRemote {...post.mdxSource} />
      </MDXLayout>
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

  // Serialize the MDX content
  const mdxSource = await serialize(post.content);

  return {
    props: {
      post: {
        ...post,
        mdxSource,
      },
      posts,
    },
  };
};