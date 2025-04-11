import type { AppProps } from "next/app";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Migration Electronic Payment</title>
        <meta name="description" content="Migration Electronic Payment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <script src="https://www.google.com/recaptcha/enterprise.js" async defer></script> */}
      </Head>
      <ThemeProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
