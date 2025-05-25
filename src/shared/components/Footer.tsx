import Image from "next/image";
import Link from "next/link";
import { Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { footerContent, BottomBarPaths } from "@/shared/constants/translations/views/footer";
import { useLanguage } from "@/context/LanguageContext";
// import { FooterProps } from "@/shared/types/footerType";

export default function Footer() {
    const { language } = useLanguage();
    const t = footerContent[language];

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-green-400">MigelPay</h3>
                        <p className="text-gray-300">{t.companyDesc}</p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-300 hover:text-green-400 transition">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">
                            {t.quickLinks.title}
                        </h4>
                        <div className="flex flex-col space-y-2">
                            {t.quickLinks.links.map((link, index) => (
                                <Link key={index} href={link.path} className="text-gray-300 hover:text-green-400 transition duration-200 font-medium  text-sm">
                                    {link.name}
                                </Link>
                            ))}

                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">{t.stayUpdated}</h4>
                        <p className="text-gray-300 mb-4">{t.subscribeDesc}</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder={t.placeholderEmail}
                                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-md transition flex items-center"
                            >
                                <Mail size={18} className="mr-1" />
                                <span>{t.subscribe}</span>
                            </button>
                        </form>
                    </div>

                    {/* Co-founder Section */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <Image
                            src="/assets/co-founder.jpg"
                            alt="Galal Koro - Co-Founder"
                            width={96}
                            height={96}
                            className="rounded-full object-cover border-2 border-green-400 w-24 h-24"
                        />
                        <h4 className="text-lg font-semibold text-white mt-4">{t.coFounderInfo.name}</h4>
                        <p className="text-green-400 text-sm">  {t.coFounderInfo.title}</p>
                        <p className="text-gray-300 text-sm mt-2">
                            {t.coFounderInfo.ceoQuote}
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} MigelPay. {t.rights}
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {BottomBarPaths.map(({ key, path }) => (
                            <Link key={path} href={path} className="text-gray-400 hover:text-green-400 text-sm space-x-6 ml-5">
                                {t.bottomLinks[key as keyof typeof t.bottomLinks]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
