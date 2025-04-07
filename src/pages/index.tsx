import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaMoneyBillWave, FaSatelliteDish, FaQuestionCircle, FaExchangeAlt } from "react-icons/fa";

export default function LandingPage() {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(2400);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const rates = { USD: 2400, EUR: 2450, GBP: 2950 };

  const updateConvertedAmount = (amt: number, curr: keyof typeof rates) => {
    setConvertedAmount(amt * (rates[curr] || 2400));
  };


  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-3xl font-bold text-gray-900 mb-4">
            Seamless <span className="text-blue-600">Money Transfers</span> & <span className="text-green-600">Connectivity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fast, secure international transfers paired with reliable Starlink internet service.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/signup">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/services/features">
              <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FaMoneyBillWave,
              title: "Global Money Transfers",
              text: "Send and receive money internationally with competitive exchange rates and low fees.",
              color: "text-blue-500"
            },
            {
              icon: FaSatelliteDish,
              title: "Starlink Internet",
              text: "High-speed satellite internet available even in remote locations.",
              color: "text-green-500"
            },
            {
              icon: FaQuestionCircle,
              title: "Dedicated Support",
              text: "24/7 customer service to assist you with any questions or issues.",
              color: "text-purple-500"
            }
          ].map(({ icon: Icon, title, text, color }, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`${color} text-4xl mb-4`}>
                <Icon />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Currency Converter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Currency Converter</h2>
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
                  updateConvertedAmount(Number(e.target.value), currency as "USD" | "EUR" | "GBP");
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                min="1"
              />
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  updateConvertedAmount(amount, e.target.value as "USD" | "EUR" | "GBP");
                }}
                className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="text-blue-500">
              <FaExchangeAlt className="text-2xl" />
            </div>

            <div className="flex-1 bg-gray-100 p-4 rounded-lg">
              <div className="text-gray-500 text-sm">You receive</div>
              <div className="text-2xl font-bold text-gray-800">
                {isClient ? convertedAmount.toLocaleString() : convertedAmount}
              </div>
              <div className="text-gray-600">Sudanese Pounds</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying fast transfers and reliable connectivity.
          </p>
          <Link href="/auth/signup">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg text-lg transition duration-300">
              Create Your Free Account
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}