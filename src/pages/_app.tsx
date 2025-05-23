import { useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/shared/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    useEffect(() => {
        const lang = localStorage.getItem('migelpay-lang') as 'en' | 'ar' || 'en';
        setLanguage(lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [language]);
    const t = {
        title: "MigelPay | Migration Electronic Payment",
        description: "Fast, secure, and verified money transfers and Starlink services via MigelPay.",
        keywords: "MigelPay, money transfer, Starlink Sudan, secure payment, electronic migration",
    }

    return (
        <>
            <Head>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <meta name="keywords" content={t.keywords} />
                <link rel="icon" href="/assets/favicon.ico" />
                <link rel="apple-touch-icon" href="/assets/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="robots" content="index, follow" />
                <meta name="google-site-verification" content="your-google-site-verification-code" />
                <link rel="canonical" href="https://www.migelpay.com" />
                {/* SEO Meta Tags */}
                <meta name="keywords" content="MigelPay, money transfer, Starlink Sudan, secure payment, electronic migration" />
                <meta name="author" content="MigelPay Team" />
                <meta property="og:title" content="MigelPay - Migration Electronic Payment" />
                <meta property="og:description" content="Send money or access Starlink services with verified security on MigelPay." />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:url" content="https://migelpay.com" />
                <meta name="twitter:card" content="summary" />

                <meta property="og:title" content={t.title} />
                <meta property="og:description" content={t.description} />
                <meta property="og:image" content="/assets/og-image.png" />
                <meta property="og:url" content="https://www.migelpay.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="MigelPay" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t.title} />
                <meta name="twitter:description" content={t.description} />
                <meta name="twitter:image" content="/assets/twitter-image.png" />
                <meta name="twitter:site" content="@MigelPay" />
                <meta name="twitter:creator" content="@MigelPay" />
                <meta name="twitter:domain" content="migelpay.com" />
            </Head>

            <ThemeProvider>
                <UserProvider>
                    <Component {...pageProps} />
                </UserProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
