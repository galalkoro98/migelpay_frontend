import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const { dark, toggle } = useTheme();
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const lang = localStorage.getItem('migelpay-lang') || 'en';
        setLanguage(lang);
    }, []);

    interface SwitchLanguageFunction {
        (lang: string): void;
    }

    const switchLanguage: SwitchLanguageFunction = (lang) => {
        localStorage.setItem("migelpay-lang", lang);
        setLanguage(lang);
        router.reload();
    };

    return (
        <nav className="bg-white dark:bg-gray-700 shadow-md py-3 px-6 flex justify-between items-center fixed w-full top-0 z-50">
            {/* Logo/Brand Section */}
            <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/assets/logo.jpeg" alt="MigelPay Logo" width={40} height={40} className="rounded-full border-2 border-blue-600" />
                    <h1 className="text-xl font-bold text-blue-600 hidden sm:block dark:text-white">MIGELPAY</h1>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                {[
                    { name: "Home", path: "/" },
                    { name: "About", path: "/services/about" },
                    { name: "Services", path: "/services/features" },
                    { name: "Starlink", path: "/services/starlink" },
                    { name: "FAQ", path: "/services/faq" },
                ].map((item) => (
                    <Link key={item.path} href={item.path} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition font-medium">
                        {item.name}
                    </Link>
                ))}

                {/* Language Selector */}
                <div className="relative group">
                    <button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600">
                        <FaGlobe className="mr-1" /> <span className="text-sm font-medium uppercase">{language}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                        <button onClick={() => switchLanguage('en')} className="block w-full text-left px-4 py-1 text-sm hover:bg-blue-50 dark:hover:bg-gray-700">English</button>
                        <button onClick={() => switchLanguage('ar')} className="block w-full text-left px-4 py-1 text-sm hover:bg-blue-50 dark:hover:bg-gray-700">العربية</button>
                    </div>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggle}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                    aria-label="Toggle Theme"
                >
                    {dark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>

                <Link href="/auth/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium">Login</Link>
                <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Sign Up</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl text-gray-700 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Navigation */}
            <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 shadow-lg transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 p-5`}>
                <button className="text-2xl text-gray-700 dark:text-white absolute top-5 right-6" onClick={() => setMenuOpen(false)}>
                    <FaTimes />
                </button>
                <div className="mt-10 space-y-4">
                    {[
                        { name: "Home", path: "/" },
                        { name: "About", path: "/services/about" },
                        { name: "Services", path: "/services/features" },
                        { name: "Starlink", path: "/services/starlink" },
                        { name: "FAQ", path: "/services/faq" },
                    ].map((item) => (
                        <Link key={item.path} href={item.path} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Language:</span>
                        <div className="flex space-x-2">
                            <button onClick={() => { switchLanguage('en'); setMenuOpen(false); }} className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">EN</button>
                            <button onClick={() => { switchLanguage('ar'); setMenuOpen(false); }} className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">العربية</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/auth/login" className="block text-center border border-blue-600 text-blue-600 py-2 rounded-lg font-medium" onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link href="/auth/signup" className="block text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700" onClick={() => setMenuOpen(false)}>Sign Up</Link>
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
