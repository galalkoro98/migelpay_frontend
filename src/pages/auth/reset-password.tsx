import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseURL } from "@/shared/utils/baseURL";

export default function ResetPasswordPage() {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post(`${baseURL}/api/web/auth/resetPassword/reset-password`, {
                token,
                newPassword,
            });

            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => router.push("/auth/login"), 2000);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to reset password.");
            }
        }
    };

    if (!token) return <p className="text-center mt-10">Invalid or missing token</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-2">Password reset successful! Redirecting...</p>}
                <button className="w-full bg-green-600 text-white py-2 rounded">Reset Password</button>
            </form>
        </div>
    );
}
