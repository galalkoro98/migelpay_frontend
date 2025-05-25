// context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
    language: 'en',
    setLanguage: () => { },
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLang] = useState<Language>('en');

    useEffect(() => {
        const stored = localStorage.getItem('migelpay-lang') as Language | null;
        const lang = stored || 'en';
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        setLang(lang);
    }, []);

    const setLanguage = (lang: Language) => {
        localStorage.setItem('migelpay-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        setLang(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
