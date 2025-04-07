import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { baseURL } from '@/utils/baseURL';
import { useUser } from '@/context/UserContext';
import DashboardLayout from '@/components/DashboardLayout';

export default function VerificationPage() {
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [addressProof, setAddressProof] = useState<File | null>(null);
    const [faceImage, setFaceImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { token } = useUser();

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
        }
    }, [token, router]);


    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setter(file);
    };

    const handleSubmit = async () => {
        if (!idDocument || !addressProof || !faceImage) {
            setError('All files are required');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            // 1️⃣ ID Verification API Call
            const idFormData = new FormData();
            idFormData.append('id', idDocument);
            const idRes = await fetch(`${baseURL}/api/web/verification/id-verification`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: idFormData
            });
            if (!idRes.ok) throw new Error('ID Verification failed');

            // 2️⃣ Address Verification API Call
            const addressFormData = new FormData();
            addressFormData.append('address', addressProof);
            const addressRes = await fetch(`${baseURL}/api/web/verification/address-verification`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: addressFormData
            });
            if (!addressRes.ok) throw new Error('Address Verification failed');

            // 3️⃣ Face Recognition API Call
            const faceFormData = new FormData();
            faceFormData.append('face', faceImage);
            faceFormData.append('id', idDocument);  // Required for face match
            const faceRes = await fetch(`${baseURL}/api/web/verification/face-recognition`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: faceFormData
            });
            if (!faceRes.ok) throw new Error('Face Recognition failed');

            // ✅ If all verifications pass:
            setSuccess(true);
            alert('Verification successful!');
            router.push('/dashboard/transactions');

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message || 'Verification failed');
            } else {
                setError('Verification failed');
            }
        } finally {
            setUploading(false);
        }
    };


    return (
        <DashboardLayout>
            <div className="min-h-screen p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-green-600">Identity Verification</h1>
                    <p className="text-gray-700 mt-2">To complete your verification, please upload the following documents:</p>

                    <div className="space-y-4 mt-4 text-gray-600">
                        <div>
                            <label className="block font-bold">ID Document (Passport, Driver&apos;s License, or ID Card)</label>
                            <input type="file" onChange={handleFileChange(setIdDocument)} className="w-full border p-2" />
                        </div>
                        <div>
                            <label className="block font-bold">Proof of Address (Utility Bill, Bank Statement)</label>
                            <input type="file" onChange={handleFileChange(setAddressProof)} className="w-full border p-2" />
                        </div>
                        <div>
                            <label className="block font-bold">Live Face Image (for Face Match)</label>
                            <input type="file" onChange={handleFileChange(setFaceImage)} className="w-full border p-2" />
                        </div>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        disabled={uploading}
                        className={`mt-4 px-4 py-2 rounded ${uploading ? 'bg-gray-400' : 'bg-green-600 text-white'}`}
                    >
                        {uploading ? 'Uploading...' : success ? 'Verification Complete' : 'Submit for Verification'}
                    </button>

                </div>
            </div>
        </DashboardLayout>
    );
}
