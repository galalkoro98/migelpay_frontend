import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { UserProfile } from '@/types/profileType';
import { baseURL } from '@/utils/baseURL';


export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetch(`${baseURL}/api/web/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => router.push('/auth/login'));
    }, [router]);

    return (
        <DashboardLayout>
            <div className="min-h-screen p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-green-700">Profile</h1>

                    {user ? (
                        <div className="mt-4 space-y-4 text-center">
                            {/* Profile Picture with Verification Badge */}
                            <div className="relative w-24 mx-auto">
                                <Image
                                    src={user.profileImage || '/default-profile.png'}
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="rounded-full border-4 border-gray-300"
                                />
                                {/* ✅ Show Verification Badge */}
                                {user.isVerified ? (
                                    <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Verified
                                    </span>
                                ) : (
                                    <span className="absolute bottom-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Not Verified
                                    </span>
                                )}
                            </div>

                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                            <p><strong>Birth Date:</strong> {user.birthDate}</p>
                            <p><strong>Sex:</strong> {user.sex}</p>
                            <p><strong>Country:</strong> {user.country}</p>

                            {/* Show Verification Status */}
                            {user.isVerified ? (
                                <p className="text-green-600 font-bold">✅ Your identity is verified.</p>
                            ) : (
                                <p className="text-red-600 font-bold">⚠️ Your identity is not verified.</p>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
