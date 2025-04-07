import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { baseURL } from "@/utils/baseURL";

export default function VerifyEmail() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseURL}/api/web/auth/email/verify`, {
                email,
                verificationCode: code,
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.accessToken);
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Verification failed");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-gray-700">
            <h2 className="text-xl font-bold mb-4 ">Verify Your Email</h2>
            <form onSubmit={handleVerify}>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 border rounded "
                    required
                />
                <input
                    type="text"
                    placeholder="Verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button className="w-full bg-blue-600 text-white py-2 rounded">Verify</button>
                <p className="mt-4 text-sm text-gray-600">
                    <button
                        onClick={async () => {
                            try {
                                await axios.post(`${baseURL}/api/web/auth/email/resend-verification`, { email });
                                alert("Verification code resent!");
                            } catch (err: unknown) {
                                if (axios.isAxiosError(err) && err.response?.data?.error) {
                                    alert(err.response.data.error);
                                } else {
                                    alert("Failed to resend code");
                                }
                            }
                        }}
                        className="text-blue-600 hover:underline text-sm mt-2"
                    >
                        Resend verification email
                    </button>
                </p>
            </form>
        </div>
    );
}
