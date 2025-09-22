import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaMoneyBillWave, FaSatelliteDish, FaQuestionCircle, FaExchangeAlt } from "react-icons/fa";
import DefaultLayout from "@/layout/DefaultLayout";
import { homePageContent } from "@/shared/constants/translations/views/home";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
    const [amount, setAmount] = useState(1);
    const [currency, setCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(3800); // Default conversion for EUR
    const [isClient, setIsClient] = useState(false);
    const { language } = useLanguage();
    const t = homePageContent[language];

    const rates = useMemo(() => ({
        EUR: 3800,
        USD: 3700,
        GBP: 4600,
    }), []);

    const updateConvertedAmount = useCallback((amt: number, curr: keyof typeof rates) => {
        setConvertedAmount(amt * (rates[curr] || 3780));
    }, [rates]);

    useEffect(() => {
        setIsClient(true);
        updateConvertedAmount(amount, currency as keyof typeof rates);
    }, [amount, currency, updateConvertedAmount]);

    return (
        <DefaultLayout>
            <div className="bg-gray-50">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-3xl font-bold text-gray-900 mb-4">
                            {t.title.split(/(\s+)/).map((word, i) =>
                                word === "Money" || word === "Transfers" || word === "Connectivity" ? (
                                    <span key={i} className={`text-${word === "Money" || word === "Transfers" ? "blue" : "green"}-600`}>
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )
                            )}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
                        <div className="flex justify-center gap-4">
                            <Link href="/auth/signup">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300">
                                    {t.getStarted}
                                </button>
                            </Link>
                            <Link href="/services/features">
                                <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg transition duration-300">
                                    {t.learnMore}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.servicesTitle}</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[FaMoneyBillWave, FaSatelliteDish, FaQuestionCircle].map((Icon, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className={`text-${["blue", "green", "purple"][index]}-500 text-4xl mb-4`}>
                                    <Icon />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.features[index].title}</h3>
                                <p className="text-gray-600">{t.features[index].text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Currency Converter */}
                {/* Currency Converter */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.converterTitle}</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {/* Exchange Rates Display */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {Object.entries(rates).map(([curr, rate]) => (
                                <motion.div
                                    key={curr}
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-gray-800">
                                                1 {curr} = {rate} SDG
                                            </div>
                                            <div className="text-gray-600 mt-1">
                                                {curr === "EUR" && "Euro (€)"}
                                                {curr === "USD" && "US Dollar ($)"}
                                                {curr === "GBP" && "British Pound (£)"}
                                            </div>
                                        </div>
                                        <div className="text-blue-500 text-3xl">
                                            <FaMoneyBillWave />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Converter Tool */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => {
                                            const value = Math.max(1, Number(e.target.value));
                                            setAmount(value);
                                            updateConvertedAmount(value, currency as "EUR" | "USD" | "GBP");
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
                                        min="1"
                                    />
                                    <select
                                        value={currency}
                                        onChange={(e) => {
                                            setCurrency(e.target.value);
                                            updateConvertedAmount(amount, e.target.value as "EUR" | "USD" | "GBP");
                                        }}
                                        className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                    >
                                        <option value="EUR">Euro (€)</option>
                                        <option value="USD">US Dollar ($)</option>
                                        <option value="GBP">British Pound (£)</option>
                                    </select>
                                </div>

                                <div className="text-blue-500 transform rotate-90 md:rotate-0">
                                    <FaExchangeAlt className="text-2xl" />
                                </div>

                                <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <div className="text-blue-600 text-sm font-medium">{t.youReceive}</div>
                                    <div className="text-3xl font-bold text-blue-800">
                                        {isClient ? convertedAmount.toLocaleString() : convertedAmount} SDG
                                    </div>
                                    <div className="text-blue-600 font-medium">Sudanese Pounds</div>
                                </div>
                            </div>

                            {/* Rate Info */}
                            <div className="mt-4 text-center text-gray-500 text-sm">
                                Current rate: 1 {currency} = {rates[currency as keyof typeof rates]} SDG
                            </div>
                        </div>
                    </div>
                </section>


                {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.converterTitle}</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(Number(e.target.value));
                                        updateConvertedAmount(Number(e.target.value), currency as "EUR" | "USD" | "GBP");
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                    min="1"
                                />
                                <select
                                    value={currency}
                                    onChange={(e) => {
                                        setCurrency(e.target.value);
                                        updateConvertedAmount(amount, e.target.value as "EUR" | "USD" | "GBP");
                                    }}
                                    className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                >
                                    <option value="EUR">EUR(€)</option>
                                    <option value="USD">USD($)</option>
                                    <option value="GBP">GBP(£)</option>
                                </select>
                            </div>

                            <div className="text-blue-500">
                                <FaExchangeAlt className="text-2xl" />
                            </div>

                            <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                                <div className="text-gray-500 text-sm">{t.youReceive}</div>
                                <div className="text-2xl font-bold text-gray-800">
                                    {isClient ? convertedAmount.toLocaleString() : convertedAmount}
                                </div>
                                <div className="text-gray-600">Sudanese Pounds</div>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">{t.ctaText}</p>
                        <Link href="/auth/signup">
                            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg text-lg transition duration-300">
                                {t.ctaButton}
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
}
