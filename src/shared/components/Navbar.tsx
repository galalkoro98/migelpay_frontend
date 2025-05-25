import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { navbarContent } from '@/shared/constants/translations/views/navbar';
import { useLanguage } from '@/context/LanguageContext';
// import { NavbarProps } from '@/shared/types/navbarType';

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { dark, toggle } = useTheme();

  const t = navbarContent[language];

  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setShowDropdown(false);

  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.language-selector')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { name: t.home, path: '/' },
    { name: t.about, path: '/services/about' },
    { name: t.features, path: '/services/features' },
    { name: t.starlink, path: '/services/starlink' },
    { name: t.faq, path: '/services/faq' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-700 shadow-md py-3 px-6 flex justify-between items-center fixed w-full top-0 z-50 font-size-bold">
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/assets/favicon.ico" alt="MigelPay Logo" width={40} height={40} className="rounded-full border-2 border-blue-600" />
          <h1 className="text-xl font-bold text-blue-600 hidden sm:block dark:text-white">MIGELPAY</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} className="text-gray-700 dark:text-gray-700 hover:text-blue-900 transition font-bold relative space-x-6 ml-10">
            {item.name}
          </Link>
        ))}

        <div className="relative language-selector">
          <div onClick={() => setShowDropdown(!showDropdown)}
            // space between the icon and text
            className="flex items-center text-gray-700 dark:text-gray-700 hover:text-blue-600 cursor-pointer transition font-bold"
            aria-label="Language Selector">
            <FaGlobe className="mr-1 pace-x-2 ml-1" />

            <span className="text-sm font-bold uppercase hidden sm:block text-gray-700 dark:text-gray-200">
              {language === 'en' ? 'English' : 'العربية'}
            </span>
          </div>
          {showDropdown && (
            <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 font-bold`}>
              {['en', 'ar'].map((lang) => (
                <button key={lang} onClick={() => { changeLanguage(lang as 'en' | 'ar'); setShowDropdown(false); }}
                  className={`block w-full text-left px-4 py-1 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 ${language === lang ? 'bg-blue-50 dark:bg-gray-700' : ''}`}>
                  {lang === 'en' ? 'English' : 'العربية'}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={toggle} className="text-gray-700 dark:text-gray-200 hover:text-blue-600" aria-label="Toggle Theme">
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link href="/auth/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium">
          {t.login}
        </Link>
        <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
          {t.signup}
        </Link>
      </div>

      <button className="md:hidden text-2xl text-gray-700 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`md:hidden fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-full bg-white dark:bg-gray-900 shadow-lg transform ${menuOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'} transition-transform duration-300 p-5`}>
        <button className="text-2xl text-gray-700 dark:text-white absolute top-5 right-6" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </button>

        <div className="mt-10 space-y-4">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 dark:text-gray-300 font-medium">{t.language}:</span>
            <div className="flex space-x-2">
              {['en', 'ar'].map((lang) => (
                <button key={lang} onClick={() => { changeLanguage(lang as 'en' | 'ar'); setMenuOpen(false); }}
                  className={`px-3 py-1 rounded text-sm ${language === lang ? 'bg-blue-600' : 'bg-blue-100 text-blue-600'}`}>
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 ">
            <Link href="/auth/login" className="block text-center border border-blue-600 text-blue-600 py-2 rounded-lg font-bold" onClick={() => setMenuOpen(false)}>
              {t.login}
            </Link>
            <Link href="/auth/signup" className="block text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer " onClick={() => setMenuOpen(false)}>
              {t.signup}
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <button onClick={toggle} className="text-gray-700 dark:text-gray-300" aria-label="Toggle Theme">
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
