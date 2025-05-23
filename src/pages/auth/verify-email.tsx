import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/shared/utils/baseURL';

export default function VerifyEmail() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const { token, email } = router.query;

        // Validate parameters before making the request
        if (!token || !email) {
            setError('Invalid verification link. Please check your email for the correct link.');
            setLoading(false);
            return;
        }

        const verifyEmailToken = async () => {
            try {
                const response = await axios.post(`${baseURL}/api/web/auth/email/verify`, {
                    token,
                    email: decodeURIComponent(email as string)
                });

                if (response.data.success) {
                    // Store tokens
                    localStorage.setItem('token', response.data.tokens.accessToken);
                    localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
                    setSuccess(true);

                    // Redirect to dashboard after 2 seconds
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 2000);
                } else {
                    throw new Error(response.data.error || 'Verification failed');
                }
            } catch (err) {
                const er = err as {
                    message: string | undefined; response?: { data?: { error: string } }
                };
                console.error('Verification error:', er);
                setError(er.response?.data?.error || er.message || 'Verification failed');
            } finally {
                setLoading(false);
            }
        };

        verifyEmailToken();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                {loading ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Verifying Your Email</h1>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    </>
                ) : error ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
                        <p className="mb-6 text-gray-700">{error}</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/auth/signup')}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Back to Sign Up
                            </button>
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Go to Login
                            </button>
                        </div>
                    </>
                ) : success ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h1>
                        <p className="mb-6 text-gray-700">Redirecting to your dashboard...</p>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}