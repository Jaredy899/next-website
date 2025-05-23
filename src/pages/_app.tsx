import { type AppType } from "next/app";
import Head from "next/head";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/context/ThemeContext";
import Layout from "~/components/Layout";
import type { BlogPost } from "~/utils/blog";

import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

interface PageProps {
  posts?: BlogPost[];
}

const MyApp: AppType<PageProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className={geist.className}>
        <Layout posts={pageProps.posts ?? []}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
