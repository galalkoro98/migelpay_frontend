import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export default function StripePage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD'); // Default currency
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [convertedAmount, setConvertedAmount] = useState<string>('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch exchange rate when currency changes
    useEffect(() => {
        fetch(`/api/exchange-rate?currency=${currency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rate))
            .catch(() => setExchangeRate(null));
    }, [currency]);

    // Update converted amount dynamically
    useEffect(() => {
        if (exchangeRate && amount) {
            setConvertedAmount((parseFloat(amount) * exchangeRate).toFixed(2));
        } else {
            setConvertedAmount('');
        }
    }, [amount, exchangeRate]);

    const handlePayment = async () => {
        setLoading(true);
        const response = await fetch('/api/payment/stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, amount, currency, convertedAmount, cardNumber, expiry, cvv }),
        });

        const data = await response.json();
        setLoading(false);
        if (data.success) {
            setMessage(`✅ Payment Successful! 🎉 \n\nDear ${fullName},\nYou have successfully paid ${amount} ${currency}. \nRecipient will receive ${convertedAmount} SDG.`);
        } else {
            setMessage('❌ Payment Failed. Please try again.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-white min-h-screen rounded-lg shadow-md">
                <Card className="w-full shadow-lg rounded-xl bg-gray-300 p-6">
                    <h3 className="text-2xl  text-green-400">💳 Pay with your Debit or Credit Card</h3>
                    <p className="text-gray-600 mt-2">🔒 Secure and fast payment processing.</p>
                    <div className="mt-4 space-y-4">
                        <label className="block text-gray-700 font-medium">Full Name:</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full p-3 border rounded-lg"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label className="block text-gray-700 font-medium">Email Address:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="block text-gray-700 font-medium">Select Currency:</label>
                        <select
                            className="w-full p-3 border rounded-lg"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        <label className="block text-gray-700 font-medium">Enter Amount ({currency}):</label>
                        <input
                            type="number"
                            placeholder={`Amount (${currency})`}
                            className="w-full p-3 border rounded-lg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <p className="text-gray-700">💱 Exchange Rate: 1 {currency} = {exchangeRate ? `${exchangeRate} SDG` : 'Loading...'}</p>
                        <p className="text-gray-700">📌 Recipient will receive: {convertedAmount ? `${convertedAmount} SDG` : 'Calculating...'}</p>
                        <label className="block text-gray-700 font-medium">Card Details:</label>
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full p-3 border rounded-lg"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-1/2 p-3 border rounded-lg"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="CVV"
                                className="w-1/2 p-3 border rounded-lg"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handlePayment}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : 'Pay Now'}
                        </Button>
                    </div>
                    {message && <p className="mt-4 font-medium text-gray-800 whitespace-pre-line">{message}</p>}
                </Card>
            </div>
        </DashboardLayout>
    );
}
