export interface NavbarProps {
    currentLanguage: 'en' | 'ar';
    onLanguageChange: (lang: 'en' | 'ar') => void;
}