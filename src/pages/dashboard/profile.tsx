import { useEffect, useState } from 'react';
import axios from "axios";
import Image from 'next/image';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layout/DashboardLayout';
import { UserProfile } from '@/shared/types/types/profileType';
import { baseURL } from '@/shared/utils/baseURL';
import { jwtDecode } from 'jwt-decode';
export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);

            // 1. Get and validate token more thoroughly
            const token = localStorage.getItem('token');
            console.log('Current Token:', token); // Debugging

            if (!token || token === 'undefined' || token === 'null') {
                handleAuthError('Please login to continue');
                return;
            }

            try {
                // 2. Add timestamp check for token expiry
                const decoded = jwtDecode(token) as { exp?: number };
                if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
                    handleAuthError('Session expired. Please login again.');
                    return;
                }

                // 3. Enhanced request configuration
                const response = await axios.get(`${baseURL}/api/web/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // If using cookies
                    timeout: 10000, // 10s timeout
                });

                // 4. More detailed response handling
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    throw new Error(response.data?.message || 'Request failed');
                }
            } catch (error) {
                // 5. Enhanced error diagnostics
                if (axios.isAxiosError(error)) {
                    console.error(
                        'Axios Error:',
                        error.response?.status,
                        error.response?.data
                    );

                    if (error.response?.status === 403) {
                        handleAuthError('Access denied. Token may be invalid.');
                    } else {
                        setError('Server error. Please try again later.');
                    }
                } else {
                    setError('Network error. Check your connection.');
                }
            } finally {
                setLoading(false);
            }
        };

        const handleAuthError = (message: string) => {
            localStorage.removeItem('token');
            setError(message);
            // router.push('/auth/login');
        };

        fetchUserProfile();
    }, [router]);

    return (
        <DashboardLayout>
            <div className="min-h-screen p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-green-700 mb-6">Profile</h1>

                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    ) : user ? (
                        <div className="space-y-6">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <Image
                                        src={user.profileImage || '/default-profile.png'}
                                        alt="Profile"
                                        width={120}
                                        height={120}
                                        className="rounded-full border-4 border-white shadow-lg"
                                        priority
                                    />
                                    {user.isVerified && (
                                        <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{user.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Birth Date</p>
                                        <p className="font-medium">{user.birthDate || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{user.sex || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Country</p>
                                        <p className="font-medium">{user.country || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No profile data</h3>
                            <p className="mt-1 text-gray-500">We could&apos;t find any profile information.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}