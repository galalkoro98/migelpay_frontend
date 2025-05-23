import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { baseURL } from '@/shared/utils/baseURL';
import { useUser } from '@/context/UserContext';
import DashboardLayout from '@/layout/DashboardLayout';
import Webcam from 'react-webcam';
import { Loader } from 'lucide-react';

export default function VerificationPage() {
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [addressProof, setAddressProof] = useState<File | null>(null);
    const [faceImage, setFaceImage] = useState<File | null>(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const webcamRef = useRef<Webcam>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const router = useRouter();

    // ✅ Destructure all needed values from useUser
    const { token, refreshVerificationStatus } = useUser();

    useEffect(() => {
        if (!token) {
            // router.push('/auth/login');
        }
    }, [token, router]);

    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setter(file);
        } else {
            setter(null);
        }
    };

    const capture = () => {
        const screenshot = webcamRef.current?.getScreenshot();
        if (screenshot) {
            fetch(screenshot)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
                    setFaceImage(file);
                    setShowWebcam(false);
                });
        }
    };

    const handleSubmit = async () => {
        const toBase64 = (file: File) =>
            new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
            });

        if (!idDocument || !addressProof || !faceImage) {
            setError('All files are required');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            if (!token) throw new Error('User not authenticated');

            // 1️⃣ ID Verification
            const idFormData = new FormData();
            idFormData.append('id', idDocument);
            const idRes = await fetch(`${baseURL}/api/web/verification/id-verification`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: idFormData
            });
            if (!idRes.ok) throw new Error('ID Verification failed');

            // 2️⃣ Address Verification
            const addressFormData = new FormData();
            addressFormData.append('address', addressProof);
            const addressRes = await fetch(`${baseURL}/api/web/verification/address-verification`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: addressFormData
            });
            if (!addressRes.ok) throw new Error('Address Verification failed');

            // 3️⃣ Face Recognition
            const base64Selfie = await toBase64(faceImage);
            const base64Id = await toBase64(idDocument);
            const faceRes = await fetch(`${baseURL}/api/web/verification/face-recognition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    selfie: base64Selfie,
                    idPhoto: base64Id
                })
            });
            if (!faceRes.ok) throw new Error('Face Recognition failed');

            // ✅ Refresh verification status from server
            setTransitioning(true);
            refreshVerificationStatus();
            setTimeout(() => {
                router.push('/dashboard/transactions');
            }, 600);


            // Wait until `isVerified === true`
            const waitForVerification = async () => {
                for (let i = 0; i < 10; i++) {
                    await new Promise(res => setTimeout(res, 500));
                    const verified = localStorage.getItem("verified");
                    if (verified === "true") break;
                }
            };



            await waitForVerification();
            setSuccess(true);
            setTimeout(() => {
                alert('Verification successful!');
                router.push('/dashboard/transactions');
            }, 600);


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

    if (transitioning) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <Loader className="animate-spin text-green-600" size={32} />
                    <span className="ml-4 text-green-700 text-lg font-medium">Redirecting to transactions...</span>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-green-600">Identity Verification</h1>
                    <p className="text-gray-700 mt-2">Please upload the required documents:</p>

                    <div className="space-y-4 mt-4 text-gray-600">
                        <div>
                            <label className="block font-bold">ID Document</label>
                            <input type="file" onChange={handleFileChange(setIdDocument)} className="w-full border p-2" />
                        </div>
                        <div>
                            <label className="block font-bold">Proof of Address</label>
                            <input type="file" onChange={handleFileChange(setAddressProof)} className="w-full border p-2" />
                        </div>
                        <div>
                            <label className="block font-bold">Selfie (Upload or Take a Photo)</label>
                            <input
                                type="file"
                                accept="image/*"
                                capture="user"
                                onChange={handleFileChange(setFaceImage)}
                                className="w-full border p-2"
                            />
                            <button
                                onClick={() => setShowWebcam(true)}
                                type="button"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Take a Selfie
                            </button>
                            {faceImage && (
                                <div className="mt-2">
                                    <Image
                                        width={128}
                                        height={128}
                                        src={URL.createObjectURL(faceImage)}
                                        alt="Face Preview"
                                        className="w-32 h-32 object-cover rounded-full border"
                                    />
                                </div>
                            )}
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

                {showWebcam && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-64 object-cover"
                                videoConstraints={{ facingMode: "user" }}
                            />
                            <div className="mt-4 space-x-2">
                                <button onClick={capture} className="px-4 py-2 bg-green-600 text-white rounded">Capture</button>
                                <button onClick={() => setShowWebcam(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
