import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DefaultLayout from "@/layout/DefaultLayout";
import { featuresPageContent } from "@/shared/constants/translations/features";

import {
    FaMoneyBillWave,
    FaSatelliteDish,
    FaShieldAlt,
    FaBolt,
    FaHeadset,
    FaChartLine,
    FaUserPlus,
    FaWallet,
    FaExchangeAlt,
    FaGlobe,
    FaMobileAlt,
    FaUserCheck
} from "react-icons/fa";

export default function LearnMore() {
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    useEffect(() => {
        const lang = localStorage.getItem('migelpay-lang') as 'en' | 'ar' || 'en';
        setLanguage(lang);
    }, []);

    const t = featuresPageContent[language];

    const features = [
        {
            icon: FaMoneyBillWave,
            title: t.features[0].title,
            description: t.features[0].description,
            details: t.features[0].details,
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: FaSatelliteDish,
            title: t.features[1].title,
            description: t.features[1].description,
            details: t.features[1].details,
            color: "bg-green-100 text-green-600"
        },
        {
            icon: FaShieldAlt,
            title: t.features[2].title,
            description: t.features[2].description,
            details: t.features[2].details,
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: FaBolt,
            title: t.features[3].title,
            description: t.features[3].description,
            details: t.features[3].details,
            color: "bg-yellow-100 text-yellow-600"
        },
        {
            icon: FaHeadset,
            title: t.features[4].title,
            description: t.features[4].description,
            details: t.features[4].details,
            color: "bg-red-100 text-red-600"
        },
        {
            icon: FaChartLine,
            title: t.features[5].title,
            description: t.features[5].description,
            details: t.features[5].details,
            color: "bg-teal-100 text-teal-600"
        }
    ];

    // Icons for each step
    const stepIcons = [FaUserPlus, FaWallet, FaExchangeAlt, FaGlobe, FaMobileAlt, FaUserCheck];

    return (
        <DefaultLayout>
            <div className="bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>

                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t.heroTitle.split("MigelPay").map((part, i) =>
                                i === 1 ? <span key={i} className="text-blue-600">MigelPay</span> : part
                            )}
                        </h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        >
                        </motion.h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.heroSubtitle}</p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                                        <feature.icon className="text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 mb-4">{feature.description}</p>
                                    <ul className="space-y-2">
                                        {feature.details.map((detail, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                {t.howItWorksTitle}
                            </h2>
                            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {t.steps.map((step, index) => {
                                const IconComponent = stepIcons[index] || FaBolt;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                        className="bg-gray-50 p-8 rounded-lg text-center"
                                    >
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <IconComponent className="text-blue-600 text-xl" />
                                        </div>
                                        <div className="text-blue-600 font-bold text-lg mb-2">
                                            {language === 'ar' ? `الخطوة ${index + 1}` : `Step ${index + 1}`}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            {t.ctaTitle}
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">{t.ctaText}</p>
                        <div className="flex justify-center gap-4">
                            <Link href="/auth/signup">
                                <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg text-lg transition duration-300">
                                    {t.ctaSignup}
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium px-8 py-3 rounded-lg text-lg transition duration-300">
                                    {t.ctaContact}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
}