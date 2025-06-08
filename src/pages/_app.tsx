import { type AppType } from "next/app";
import Head from "next/head";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/context/ThemeContext";
import type { BlogPost } from "~/utils/blog";

import "~/styles/globals.css";
import "~/styles/view-transitions.css";
import "~/styles/blog.css";
import "~/styles/mdx.css";

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
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
