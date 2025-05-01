import { type AppType } from "next/app";
import Head from "next/head";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/context/ThemeContext";
import ThemeToggle from "~/components/ThemeToggle";

import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className={geist.className}>
        <ThemeToggle />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
