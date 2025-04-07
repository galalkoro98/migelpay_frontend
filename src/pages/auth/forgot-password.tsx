import { useState } from "react";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const res = await axios.post(`${baseURL}/api/web/auth/resetPassword/send-link`, { email });
            if (res.data.success) {
                setMessage("Check your email for a password reset link.");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-gray-700">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
                <button className="w-full bg-blue-600 text-white py-2 rounded">Send Reset Link</button>
            </form>
        </div>
    );
}
