import { useState, useEffect } from "react";
import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";

export default function DefaultLayout({ children}: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<'en' | 'ar'>('en');

    useEffect(() => {
        const lang = localStorage.getItem('migelpay-lang') as 'en' | 'ar' || 'en';
        setLanguage(lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [setLanguage]);



    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar 
                currentLanguage={language}
                onLanguageChange={(lang) => {
                    localStorage.setItem('migelpay-lang', lang);
                    setLanguage(lang);
                    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                    document.documentElement.lang = lang;
                }}
            />
            <main className="flex-grow">
                {children}
            </main>
            <Footer currentLanguage={language} />
        </div>
    );
}