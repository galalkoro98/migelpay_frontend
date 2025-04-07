import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>

                    <div className="prose prose-blue max-w-none">
                        <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
                        <p>
                            By using MigelPay&apos;s services, you agree to be bound by these Terms of Service.
                            If you do not agree, please do not use our services.
                        </p>

                        <h2 className="text-xl font-semibold mt-6">2. Service Description</h2>
                        <p>
                            MigelPay provides payment processing services for Starlink subscriptions and
                            other digital services, converting payments to local currencies.
                        </p>

                        <h2 className="text-xl font-semibold mt-6">3. User Responsibilities</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Provide accurate and complete information</li>
                            <li>Keep your account credentials secure</li>
                            <li>Ensure you have sufficient funds for transactions</li>
                            <li>Comply with all applicable laws</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6">4. Payment Processing</h2>
                        <p>
                            All payments are processed in accordance with the amounts displayed during checkout.
                            We are not responsible for incorrect amounts entered by users.
                        </p>

                        <h2 className="text-xl font-semibold mt-6">5. Limitation of Liability</h2>
                        <p>
                            MigelPay shall not be liable for any indirect, incidental, or consequential damages
                            arising from the use of our services.
                        </p>

                        <h2 className="text-xl font-semibold mt-6">6. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Continued use of our services
                            constitutes acceptance of the modified terms.
                        </p>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p className="font-medium">Last Updated: June 2023</p>
                            <p className="text-sm text-gray-600 mt-1">
                                For questions about these terms, please contact us at support@migelpay.com
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}