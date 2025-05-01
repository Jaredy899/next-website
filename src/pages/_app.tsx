import { type AppType } from "next/app";
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
      <div className={geist.className}>
        <ThemeToggle />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
