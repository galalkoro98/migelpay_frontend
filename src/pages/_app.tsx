import type { AppProps } from "next/app";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MigelPay | Migration Electronic Payment</title>
        <meta name="description" content="Fast, secure, and verified money transfers and Starlink services via MigelPay." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="../../assets/favicon.ico" />
        <link rel="apple-touch-icon" href="./favicon.ico" />

        {/* SEO Meta Tags */}
        <meta name="keywords" content="MigelPay, money transfer, Starlink Sudan, secure payment, electronic migration" />
        <meta name="author" content="MigelPay Team" />
        <meta property="og:title" content="MigelPay - Migration Electronic Payment" />
        <meta property="og:description" content="Send money or access Starlink services with verified security on MigelPay." />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://migelpay.com" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <ThemeProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
