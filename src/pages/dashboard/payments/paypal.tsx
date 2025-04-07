import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function PayPalPage() {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/exchange-rate')
            .then(res => res.json())
            .then(data => setExchangeRates(data.rates))
            .catch(() => setExchangeRates({}));
    }, []);

    const handlePayment = async () => {
        const response = await fetch('/api/payment/paypal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, recipient, currency }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('✅ Payment Successful! 🎉');
        } else {
            setMessage('❌ Payment Failed. Please try again.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-white min-h-screen">
                <div className="bg-gray p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-green-600">Pay with PayPal</h1>
                    <select className="w-full p-2 border rounded my-2" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                    <input type="number" placeholder="Amount" className="w-full p-2 border rounded my-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <p className="text-gray-700">💱 Exchange Rate: 1 {currency} = {exchangeRates[currency] ? `${exchangeRates[currency]} SDG` : 'Loading...'}</p>
                    <p className="text-gray-700">📌 Recipient will receive: {exchangeRates[currency] && amount ? `${(parseFloat(amount) * exchangeRates[currency]).toFixed(2)} SDG` : 'Calculating...'}</p>
                    <input type="text" placeholder="Recipient Email" className="w-full p-2 border rounded my-2" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                    <button onClick={handlePayment} className="w-full bg-blue-500 text-white p-2 rounded">Pay Now</button>
                    {message && <p className="mt-4">{message}</p>}
                </div>
            </div>
        </DashboardLayout>
    );
}
