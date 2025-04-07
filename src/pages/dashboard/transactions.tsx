import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import DashboardLayout from '@/components/DashboardLayout';

export default function TransactionsPage() {
    const { isVerified, loading, token } = useUser();
    const [transactionStarted, setTransactionStarted] = useState(false);
    const [error] = useState<string | null>(null);
    const router = useRouter();


       useEffect(() => {
           if (!token) {
               router.push('/auth/login');
           }
       }, [token, router]);
    // Check if the user is verified
    if (isVerified === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader className="animate-spin text-green-600" size={32} />
            </div>
        );
    }

    const startVerification = () => router.push('/dashboard/verification');
    const startTransaction = () => setTransactionStarted(prev => !prev);


    return (
        <div>
            <DashboardLayout>
                <Card className="w-full max-w-3xl p-6 shadow-lg rounded-xl bg-white">
                    <h1 className="text-3xl font-bold text-green-700">Transactions</h1>
                    <p className="text-gray-600 mt-2">Manage your transactions and send money internationally.</p>

                    {loading ? (
                        <div className="flex justify-center mt-6">
                            <Loader className="animate-spin text-green-600" size={32} />
                        </div>
                    ) : (
                        <>
                            {/* {error && <p className="text-red-600 text-center mt-4">{error}</p>} */}
                            {error && (
                                <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                                    <p className="font-bold">Error</p>
                                    <p>{error}</p>
                                </div>
                            )}

                            <p className="mt-4 text-gray-700">To initiate a transaction, please verify your identity.</p>
                            <p className="mt-2 text-gray-700">Once verified, you can choose your preferred payment method.</p>

                            {/* Identity Verification Check */}

                            {isVerified !== null && (
                                <>
                                    {!isVerified && (
                                        <Card className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                                            <p className="font-bold">Identity Verification Required</p>
                                            <p className="mt-2">You must verify your identity before initiating a transaction.</p>
                                            <Button className="mt-4 bg-green-600 hover:bg-green-700 w-full" onClick={startVerification}>
                                                Verify Now
                                            </Button>
                                        </Card>
                                    )}

                                    {isVerified && !transactionStarted && (
                                        <Card className="mt-6 p-6 text-center bg-green-50 border border-green-300 shadow-md">
                                            <p className="text-green-600 font-semibold text-lg">✅ Your identity is verified.</p>
                                            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 w-full text-lg py-3" onClick={startTransaction}>
                                                {transactionStarted ? "Cancel Transaction" : "Start Transaction"}
                                            </Button>
                                        </Card>
                                    )}

                                    {isVerified && transactionStarted && (
                                        <Card className="mt-6 p-6 space-y-4 bg-gray-50 border border-gray-300 shadow-md">
                                            <p className="text-green-700 font-bold text-lg">✅ Select a payment method:</p>
                                            <Button className="w-full bg-blue-500 hover:bg-blue-600 py-3" onClick={() => router.push('/dashboard/payments/paypal')}>
                                                Pay with PayPal
                                            </Button>
                                            <Button className="w-full bg-gray-800 hover:bg-gray-900 py-3 text-white" onClick={() => router.push('/dashboard/payments/stripe')}>
                                                Pay with Card (VISA / MasterCard)
                                            </Button>
                                            <Button className="w-full bg-green-700 hover:bg-green-800 py-3" onClick={() => router.push('/dashboard/payments/wise')}>
                                                Pay with Bank Transfer
                                            </Button>
                                        </Card>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Card>
            </DashboardLayout>
        </div>
    );
}
