import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CURRENCY_RATES } from '@/utils/currencyRates';
import { baseURL } from '@/utils/baseURL';
import Link from 'next/link';
import Recaptcha from "@/components/Recaptcha";

export default function StarlinkPayment() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        subscriptionAmount: '',
        currency: 'USD',
        invoiceNumber: '',
        paymentProof: null as File | null,
        termsAgreed: false
    });
    // const [recaptchaToken, setRecaptchaToken] = useState('');
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const PROCESSING_FEE = 26000; // 26,000 SDG
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const handleCaptcha = (token: string | null) => {
        setCaptchaToken(token);
    };

    // Calculate amount whenever amount or currency changes
    useEffect(() => {
        if (formData.subscriptionAmount && formData.currency) {
            const amount = parseFloat(formData.subscriptionAmount) || 0;
            const rate = CURRENCY_RATES[formData.currency as keyof typeof CURRENCY_RATES];
            const convertedAmount = Math.ceil(amount * rate);
            setCalculatedAmount(convertedAmount + PROCESSING_FEE); // Add fee to converted amount
        } else {
            setCalculatedAmount(0);
        }
    }, [formData.subscriptionAmount, formData.currency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({
                ...prev,
                paymentProof: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('submitting');

        try {
            const formPayload = new FormData();
            formPayload.append('email', formData.email);
            formPayload.append('password', formData.password);
            formPayload.append('subscriptionAmount', formData.subscriptionAmount);
            formPayload.append('currency', formData.currency);
            formPayload.append('invoiceNumber', formData.invoiceNumber);
            formPayload.append('calculatedAmount', calculatedAmount.toString());
            formPayload.append('termsAgreed', formData.termsAgreed ? 'true' : 'false');

            if (formData.paymentProof) {
                formPayload.append('paymentProof', formData.paymentProof);
            }

            // Append reCAPTCHA token if available
            const recaptchaToken = captchaToken || '';
            if (!recaptchaToken) {
                setSubmissionStatus('error');
                return;
            }
            formPayload.append('recaptchaToken', recaptchaToken);

            // Simulate API call
            const response = await fetch(`${baseURL}/api/web/starlink/submit`, {
                method: 'POST',
                body: formPayload
            });

            if (!response.ok) throw new Error('Submission failed');

            setSubmissionStatus('success');

            setFormData({
                email: '',
                password: '',
                subscriptionAmount: '',
                currency: 'USD',
                invoiceNumber: '',
                paymentProof: null,
                termsAgreed: false
            });
            setCalculatedAmount(0);
            setCaptchaToken(null); // Reset reCAPTCHA token after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
        }
    };

    const contactInfo = {
        bankAccount: '4393322',
        bankName: 'Bank of Khartoum - بنكك',
        accountName: 'اسحق ادم الحاج',
        whatsapp: '+32499891600',
        telegram: '@MigelPaySupport',
        telegramChannelInvitationCode: 't.me/+D4g4YNEh-ClzNDU0',
        responseTime: 'a minutes',
        contactPerson: {
            name: 'Galal Ali',
            position: 'Starlink Payment Manager',
            photo: '/assets/galal.jpg'
        }
    };
    return (
        <>
            <Navbar />
            {/* space between navbar and man*/}
            <div className="h-5"></div>
            <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 rounded-full  border-white-600">
                            {/* text in the same line of log */}

                            <Image
                                src="/assets/starlink.png"
                                alt="MigelPay Logo"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Starlink Bill Payment Service</h1>
                        <p className="text-lg text-gray-600">
                            Enter your Starlink subscription amount and we&apos;ll calculate the equivalent in Sudanese Pounds
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-md">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Subscription Amount Input */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Currency
                                        </label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            value={formData.currency}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                        >
                                            <option value="USD">US Dollar (USD)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="NGN">Nigerian Naira (NGN)</option>
                                            <option value="KES">Kenyan Shilling (KES)</option>
                                            <option value="PHP">Philippine Peso (PHP)</option>
                                            <option value="SDG">Sudanese Pound (SDG)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="subscriptionAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                            Monthly Amount
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id="subscriptionAmount"
                                                name="subscriptionAmount"
                                                value={formData.subscriptionAmount}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-12 text-gray-900"
                                                placeholder="0.00"
                                                min="1"
                                                step="0.01"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500">
                                                    {formData.currency === 'USD' ? '$' :
                                                        formData.currency === 'EUR' ? '€' :
                                                            formData.currency === 'NGN' ? '₦' :
                                                                formData.currency === 'KES' ? 'KSh' :
                                                                    formData.currency === 'PHP' ? '₱' :
                                                                        'SDG'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Calculated Amount */}
                                {calculatedAmount > 0 && (
                                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                                        <div className="text-center">
                                            <p className="text-sm text-blue-600 mb-1">Payment Breakdown</p>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm">Converted Amount:</span>
                                                <span className="text-sm font-medium">
                                                    {Math.ceil((parseFloat(formData.subscriptionAmount) || 0) *
                                                        CURRENCY_RATES[formData.currency as keyof typeof CURRENCY_RATES]).toLocaleString()} SDG
                                                </span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm">Processing Fee:</span>
                                                <span className="text-sm font-medium">{PROCESSING_FEE.toLocaleString('en-US')} SDG</span>
                                            </div>
                                            <div className="border-t border-blue-200 pt-2">
                                                <p className="text-sm text-blue-600">Total Amount to Send:</p>
                                                <p className="text-2xl font-bold text-blue-700">
                                                    {calculatedAmount.toLocaleString('en-US')} SDG
                                                </p>
                                            </div>
                                            <p className="text-xs text-blue-500 mt-1">
                                                Send this exact total amount to avoid processing delays
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Account Information */}
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Starlink Account Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                                            Starlink Account Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                            placeholder="••••••••"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            We only use this to process your payment. Consider changing your password after.
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Proof */}
                                <div>
                                    <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700 mb-1">
                                        Payment Proof (Screenshot/Receipt)
                                    </label>
                                    <input
                                        type="file"
                                        id="paymentProof"
                                        name="paymentProof"
                                        onChange={handleFileChange}
                                        required
                                        accept="image/*,.pdf"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Terms Agreement */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="termsAgreed"
                                            name="termsAgreed"
                                            type="checkbox"
                                            checked={formData.termsAgreed}
                                            onChange={handleChange}
                                            required
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="termsAgreed" className="font-medium text-gray-700">
                                            I confirm that I&apos;ve sent {calculatedAmount > 0 ? calculatedAmount.toLocaleString('en-US') : '______'} SDG
                                            (including {PROCESSING_FEE.toLocaleString('en-US')} SDG fee) to MigelPay
                                        </label>
                                        <p className="text-gray-500">
                                            By checking this box, you agree to our <Link href="/services/terms" className="text-blue-600 hover:underline">terms of service</Link>.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <Recaptcha onVerify={handleCaptcha} />
                                    <p className="text-xs text-gray-500 mb-2">We use reCAPTCHA to prevent spam.</p>
                                    <button
                                        type="submit"
                                        disabled={
                                            !formData.termsAgreed ||
                                            submissionStatus === 'submitting' ||
                                            !formData.email ||
                                            !formData.password ||
                                            !formData.subscriptionAmount ||
                                            !formData.invoiceNumber ||
                                            !formData.paymentProof ||
                                            !captchaToken
                                        }
                                        className={`w-full py-2 px-4 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${submissionStatus === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        Submit Payment Request
                                    </button>
                                </div>

                                {/* Submission Status */}
                                {submissionStatus === 'success' && (
                                    <div className="p-4 bg-green-50 text-green-800 rounded-md">
                                        <div className="flex">
                                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Your payment request has been submitted successfully! We&apos;ll contact you within {contactInfo.responseTime}.
                                        </div>
                                    </div>
                                )}

                                {submissionStatus === 'error' && (
                                    <div className="p-4 bg-red-50 text-red-800 rounded-md">
                                        <div className="flex">
                                            <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            There was an error submitting your request. Please try again or contact support.
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Payment Information Sidebar */}
                        <div className="bg-white p-6 rounded-xl shadow-md text-gray-900">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Instructions</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Bank Transfer Details</h3>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <p className="text-sm"><span className="font-medium">Bank Name:</span> {contactInfo.bankName}</p>
                                        <p className="text-sm"><span className="font-medium">Account Name:</span> {contactInfo.accountName}</p>
                                        <p className="text-sm"><span className="font-medium">Account Number:</span> {contactInfo.bankAccount}</p>
                                        <p className="text-sm mt-2 text-red-600 font-medium">Important: Include your email in the payment reference</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900 mb-4">Contact After Payment</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center space-y-4">
                                        <div className="relative">

                                            <Image
                                                src={contactInfo.contactPerson.photo}
                                                alt={contactInfo.contactPerson.name}
                                                width={96}
                                                height={96}
                                                className="rounded-full border-4 border-blue-500 shadow-md object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold">{contactInfo.contactPerson.name}</p>
                                            <p className="text-sm text-gray-600 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm ">{contactInfo.contactPerson.position}</p>
                                            <p className="text-sm text-gray-500">Reach out to us after sending your payment</p>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <a
                                                href={`https://wa.me/${contactInfo.whatsapp.replace('+', '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-block bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                                            >
                                                📱 Contact via WhatsApp
                                            </a>
                                            <a
                                                href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                                            >
                                                💬 Chat on Telegram
                                            </a>
                                            <a
                                                href={`https://${contactInfo.telegramChannelInvitationCode}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-block bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                                            >
                                                📢 Join Telegram Channel
                                            </a>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-blue-50 p-4 rounded-md">
                                    <h3 className="font-medium text-blue-800 mb-1">Processing Time</h3>
                                    <p className="text-sm text-blue-700">
                                        Your Starlink service will be renewed within {contactInfo.responseTime} after payment verification.
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="font-medium text-gray-900 mb-2">Important Notes</h3>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                                        <li>Send the exact calculated amount in SDG</li>
                                        <li>Include your email in the payment reference</li>
                                        <li>Contact us immediately if you encounter any issues</li>
                                        <li>Keep your payment proof until service is renewed</li>
                                        <li>We don&apos;t charge any extra fees - you pay only the converted amount</li>
                                        <li>Total payment includes a {PROCESSING_FEE.toLocaleString('en-US')} SDG processing fee</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </main >
            <Footer />
        </>
    );
}