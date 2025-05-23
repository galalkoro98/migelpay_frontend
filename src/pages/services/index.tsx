import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layout/DashboardLayout';
import { useUser } from '@/context/UserContext';

export default function ServicesPage() {
    const router = useRouter();
    const { token } = useUser();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            // router.push('/auth/login');
        }
    }, [token, router]);

    const services = [
        { name: 'International Transfers', description: 'Send money abroad easily', link: '#' },
        { name: 'Bill Payments', description: 'Pay utility bills directly', link: '#' },
        { name: 'Mobile Top-up', description: 'Recharge mobile phones', link: '#' },
        { name: 'Starlink Services', description: 'Order Starlink devices', link: '#' },
    ];

    return (
        <DashboardLayout>
            <div className="min-h-screen p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-green-600">Services</h1>
                    <p className="text-gray-700 mt-2">Explore our available services below:</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => (
                            <div key={index} className="bg-green-50 p-4 rounded-lg shadow">
                                <h2 className="text-lg font-bold text-green-700">{service.name}</h2>
                                <p className="text-gray-600 mt-1">{service.description}</p>
                                <button
                                    onClick={() => router.push(service.link)}
                                    className="mt-3 text-white bg-green-600 px-4 py-2 rounded"
                                >
                                    Explore
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};