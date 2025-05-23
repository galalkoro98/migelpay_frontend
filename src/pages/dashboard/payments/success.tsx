import { useRouter } from 'next/router';
import DashboardLayout from '@/layout/DashboardLayout';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const { amount, currency, sdgAmount, transactionId, date } = router.query;

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                <Card className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
                    <p className="text-gray-700 mt-4">Your transaction has been completed successfully.</p>

                    {transactionId && (
                        <Card className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                            <p className="font-bold">Transaction Details:</p>
                            <p>💰 Amount Paid: <strong>{amount} {currency}</strong></p>
                            <p>💱 Converted to: <strong>{sdgAmount} SDG</strong></p>
                        </Card>
                    )}

                    <Button
                        onClick={() => router.push(`/dashboard/receipt?transactionId=${transactionId}&amount=${amount}&currency=${currency}&sdgAmount=${sdgAmount}&date=${date}`)}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        View Receipt
                    </Button>

                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="mt-3 bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Return to Dashboard
                    </Button>
                </Card>
            </div>
        </DashboardLayout>
    );
}
