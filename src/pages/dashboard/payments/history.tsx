import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Transaction {
    id: string;
    amount: number;
    method: string;
    status: string;
    date: string;
}

export default function TransactionHistoryPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/web/user/transactions', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then(data => {
            setTransactions(data.transactions);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-green-600">Transaction History</h1>

                    {loading ? (
                        <p className="mt-4">Loading...</p>
                    ) : transactions.length === 0 ? (
                        <p className="mt-4 text-gray-500">No transactions yet.</p>
                    ) : (
                        <table className="w-full mt-4 border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Method</th>
                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">${tx.amount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tx.method}</td>
                                        <td className={`border border-gray-300 px-4 py-2 ${tx.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                            {tx.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
