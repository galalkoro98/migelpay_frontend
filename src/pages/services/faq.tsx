import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
    {
        question: "How does MigelPay work?",
        answer: "You enter your Starlink subscription details, we calculate the equivalent in local currency, and you send the payment to our account. We then pay your Starlink bill directly."
    },
    {
        question: "How long does payment processing take?",
        answer: "Most payments are processed within 1-3 business hours after we verify your payment."
    },
    {
        question: "Is there a service fee?",
        answer: "Our service fee is included in the converted amount you see during checkout. There are no hidden charges."
    },
    {
        question: "What currencies do you accept?",
        answer: "We accept USD, EUR, NGN, KES, PHP, and SDG. The amount will be converted to SDG for payment."
    },
    {
        question: "How can I contact support?",
        answer: "You can reach us 24/7 via WhatsApp (+249123456789) or Telegram (@MigelPaySupport)."
    },
    {
        question: "What if I send the wrong amount?",
        answer: "Contact us immediately if you send an incorrect amount. We'll either refund the difference or request the remaining balance."
    }
];

export default function FAQ() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                                <h2 className="text-xl font-semibold text-gray-900">{faq.question}</h2>
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">Still have questions?</h3>
                        <p className="text-gray-600 mt-1">
                            Contact our support team via WhatsApp or Telegram for immediate assistance.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}