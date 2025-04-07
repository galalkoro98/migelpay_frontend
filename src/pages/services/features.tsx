import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    FaMoneyBillWave,
    FaSatelliteDish,
    FaShieldAlt,
    FaBolt,
    FaHeadset,
    FaChartLine
} from "react-icons/fa";

export default function LearnMore() {
    const features = [
        {
            icon: FaMoneyBillWave,
            title: "Global Money Transfers",
            description: "Send and receive money across borders with industry-leading speed and security.",
            details: [
                "Competitive exchange rates with no hidden fees",
                "Transfers completed in minutes, not days",
                "Send to over 150 countries worldwide",
                "24/7 transaction monitoring"
            ],
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: FaSatelliteDish,
            title: "Starlink Integration",
            description: "Reliable high-speed internet anywhere through our exclusive partnership with Starlink.",
            details: [
                "Get connected in remote locations",
                "Speeds up to 200Mbps",
                "Simple plug-and-play setup",
                "Global coverage with low latency"
            ],
            color: "bg-green-100 text-green-600"
        },
        {
            icon: FaShieldAlt,
            title: "Bank-Level Security",
            description: "Your money and data are protected with enterprise-grade security measures.",
            details: [
                "256-bit end-to-end encryption",
                "Multi-factor authentication",
                "Real-time fraud detection",
                "FDIC insured balances"
            ],
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: FaBolt,
            title: "Instant Transactions",
            description: "No more waiting days for transfers to complete.",
            details: [
                "80% of transfers complete in under 5 minutes",
                "Real-time status tracking",
                "Instant notifications",
                "No batch processing delays"
            ],
            color: "bg-yellow-100 text-yellow-600"
        },
        {
            icon: FaHeadset,
            title: "24/7 Customer Support",
            description: "Help whenever you need it from our award-winning support team.",
            details: [
                "Live chat, email, and phone support",
                "Multilingual support agents",
                "Average response time < 2 minutes",
                "Dedicated account managers for businesses"
            ],
            color: "bg-red-100 text-red-600"
        },
        {
            icon: FaChartLine,
            title: "Competitive Rates",
            description: "More money in your pocket with our low fees and great rates.",
            details: [
                "Up to 5x cheaper than traditional banks",
                "No hidden charges",
                "Rate alerts for optimal transfers",
                "Volume discounts for frequent users"
            ],
            color: "bg-teal-100 text-teal-600"
        }
    ];

    return (
        <div className="bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Discover the <span className="text-blue-600">MigelPay</span> Difference
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Powerful financial tools and connectivity solutions designed for today&#39;s global citizens.
                    </p>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">How MigelPay Works</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Create Your Account",
                                description: "Sign up in minutes with just your email and basic information.",
                                icon: (
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )
                            },
                            {
                                step: "2",
                                title: "Add Funds or Recipients",
                                description: "Connect your bank account or add recipients in our secure dashboard.",
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                step: "3",
                                title: "Transfer & Connect",
                                description: "Send money instantly or activate your Starlink service with one click.",
                                icon: (
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                )
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.2 }}
                                className="bg-gray-50 p-8 rounded-lg text-center"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {item.icon}
                                </div>
                                <div className="text-blue-600 font-bold text-lg mb-2">Step {item.step}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience MigelPay?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of customers enjoying borderless finance and connectivity.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/auth/signup">
                            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg text-lg transition duration-300">
                                Sign Up Free
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium px-8 py-3 rounded-lg text-lg transition duration-300">
                                Contact Sales
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}