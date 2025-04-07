import { useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { baseURL } from '@/utils/baseURL';
import { Loader } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Dashboard = () => {
    const { token, isVerified, setIsVerified, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const checkVerification = async () => {
            try {
                const res = await axios.get(`${baseURL}/api/user/verification-status`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsVerified(res.data.verified);
            } catch {
                setIsVerified(false);
            }
        };

        checkVerification();
    }, [token, setIsVerified, router]);

    if (loading || isVerified === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader className="animate-spin text-green-600" size={32} />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex min-h-screen bg-gray-100">
                <main className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-green-600">Welcome to MigelPay Dashboard</h1>

                        {!isVerified && (
                            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                                <p className="font-bold">Identity Verification Required</p>
                                <p>Before initiating any transaction, you must verify your identity.</p>
                                <button
                                    onClick={() => router.push('/dashboard/verification')}
                                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Start Verification
                                </button>
                            </div>
                        )}

                        <p className="mt-2 text-gray-700">Manage your profile, view services, and explore features freely. Transaction features require verification.</p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <button onClick={() => router.push('/dashboard/profile')} className="p-4 bg-green-100 text-green-700 rounded-lg shadow hover:bg-green-200">Profile</button>

                            {/* Conditional Transaction Button */}
                            <button
                                onClick={() => {
                                    if (isVerified) {
                                        router.push('/dashboard/transactions');
                                    } else {
                                        router.push('/dashboard/verification');
                                    }
                                }}
                                className={`p-4 rounded-lg shadow ${isVerified
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Transactions
                            </button>

                            <button onClick={() => router.push('/dashboard/services')} className="p-4 bg-green-100 text-green-700 rounded-lg shadow hover:bg-green-200">Services</button>
                            <button onClick={() => router.push('/')} className="p-4 bg-green-100 text-green-700 rounded-lg shadow hover:bg-green-200">Back to Home</button>
                        </div>
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
