import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';

export default function WisePage() {
    const [amount, setAmount] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        const response = await fetch('/api/payment/wise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, bankAccount, email }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('✅ Payment Successful! 🎉 Invoice sent to your email.');
        } else {
            setMessage('❌ Payment Failed. Please try again.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-10 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-green-600 text-center mb-4">Pay with your bank account transfer </h1>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full p-2 border rounded mb-4" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />

                        <label className="block text-gray-700 font-medium mb-1">Amount</label>
                        <input 
                            type="number" 
                            placeholder="Enter amount" 
                            className="w-full p-2 border rounded mb-4" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                        />
                        
                        <label className="block text-gray-700 font-medium mb-1">Bank Account Number</label>
                        <input 
                            type="text" 
                            placeholder="Enter bank account number" 
                            className="w-full p-2 border rounded mb-4" 
                            value={bankAccount} 
                            onChange={(e) => setBankAccount(e.target.value)} 
                        />
                        
                        <button 
                            onClick={handlePayment} 
                            className="w-full bg-green-700 text-white p-2 rounded-lg font-semibold mt-2 hover:bg-green-800 transition"
                        >
                            Pay Now
                        </button>
                    </div>
                    {message && <p className="mt-4 text-center font-medium text-gray-800">{message}</p>}
                </div>
            </div>
        </DashboardLayout>
    );
}
