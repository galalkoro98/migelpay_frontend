import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { jsPDF } from 'jspdf';

export default function TransactionReceiptPage() {
    const router = useRouter();
    const { amount, currency, sdgAmount, transactionId, date } = router.query;
    const receiptRef = useRef(null);

    // where Loader is a component from the lucide-react library
    const handleDownload = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Transaction Receipt', 20, 20);
        doc.setFontSize(12);
        doc.text(`Transaction ID: ${transactionId}`, 20, 30);
        doc.text(`Date: ${new Date(date as string).toLocaleString()}`, 20, 40);
        doc.text(`Amount Paid: ${amount} ${currency}`, 20, 50);
        doc.text(`Converted to SDG: ${sdgAmount} SDG`, 20, 60);
        doc.text('Thank you for using MigelPay!', 20, 80);
        doc.save(`Transaction_Receipt_${transactionId}.pdf`);
    };

    useEffect(() => {
        if (!transactionId) {
            router.push('/dashboard');
        }
    }, [transactionId, router]);

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md text-center" ref={receiptRef}>
                    <h1 className="text-3xl font-bold text-green-600">📄 Transaction Receipt</h1>

                    {transactionId && (
                        <Card className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
                            <p className="font-bold">Transaction ID:</p>
                            <p>{transactionId}</p>
                            <p className="font-bold mt-2">Date:</p>
                            <p>{new Date(date as string).toLocaleString()}</p>
                            <p className="font-bold mt-2">Amount Paid:</p>
                            <p>{amount} {currency}</p>
                            <p className="font-bold mt-2">Converted to SDG:</p>
                            <p>{sdgAmount} SDG</p>
                        </Card>
                    )}

                    <Button
                        onClick={handleDownload}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        Download PDF
                    </Button>

                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="mt-3 bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
