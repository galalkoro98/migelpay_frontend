import { useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
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
        en: {
            title: "MigelPay - Your Payment Solution",
            description: "MigelPay offers secure and efficient payment solutions for businesses and individuals. migration electronic payments with ease and confidence.",
            keywords: "payment, secure, business, individual, solution, payment gateway, online transactions, e-commerce, financial services"
        },
        ar: {
            title: "ميجل باي - حل الدفع الخاص بك",
            description: "ميجل باي يقدم حلول دفع آمنة وفعالة للأعمال والأفراد. هجرة المدفوعات الإلكترونية بسهولة وثقة.",
            keywords: "دفع, آمن, عمل, فرد, حل, بوابة دفع, معاملات عبر الإنترنت, التجارة الإلكترونية, خدمات مالية "
        }

    }

    return (
        <>

            <Head>
                <title>{t[language].title}</title>
                <meta name="description" content={t[language].description} />
                <meta name="keywords" content={t[language].keywords} />
                <link rel="canonical" href="https://www.migelpay.com" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t[language].title} />
                <meta property="og:description" content={t[language].description} />
                <meta property="og:image" content="/assets/logo.jpeg" />
                <meta property="og:url" content="https://www.migelpay.com" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t[language].title} />
                <meta name="twitter:description" content={t[language].description} />
                <meta name="twitter:image" content="/assets/logo.jpeg" />
                <meta name="twitter:domain" content="migelpay.com" />

                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "MigelPay",
                        "url": "https://www.migelpay.com",
                        "logo": "https://www.migelpay.com/assets/logo.jpeg",
                        "sameAs": [
                            "https://www.facebook.com/MigelPay",
                            "https://twitter.com/MigelPay",
                            "https://www.instagram.com/MigelPay"
                        ]
                    })
                }} />
            </Head>

            <LanguageProvider>
                <ThemeProvider>
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </ThemeProvider>
            </LanguageProvider>

        </>
    );
}

export default App;
