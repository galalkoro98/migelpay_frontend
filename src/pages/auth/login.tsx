import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaGoogle, FaFacebook, FaSpinner } from "react-icons/fa";
import { baseURL } from '@/utils/baseURL';
import { ReCAPTCHA } from "@/utils/reCAPTCHA";
import { reCAPTCHA_SITE_KEY } from "@/utils/reCAPTCHA";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { useFacebookLogin } from "@/hooks/useFacebookLogin";
// import { useUser } from "@/context/UserContext";

export default function LoginPage() {
    const [useEmail, setUseEmail] = useState(true);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [firebaseToken, setFirebaseToken] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const router = useRouter();
    const { triggerGoogleLogin } = useGoogleLogin();
    const { triggerFacebookLogin } = useFacebookLogin();
    // const { setUser, setToken } = useUser();

    const handleRecaptchaChange = (token: string | null) => setRecaptchaToken(token);

    const validateInputs = () => {
        if (!identifier) {
            return useEmail ? "Email is required" : "Phone number is required";
        }
        if (useEmail && !password) {
            return "Password is required";
        }
        if (!useEmail && !firebaseToken && otpSent) {
            return "OTP is required";
        }
        if (!recaptchaToken) {
            return "Please complete the reCAPTCHA";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            const payload = useEmail
                ? { identifier, password }
                : { identifier, firebaseToken };

            const res = await axios.post(`${baseURL}/api/web/auth/login/user-login`, payload);
            if (res.data.jwt) {
                localStorage.setItem("token", res.data.jwt);
                router.push("/dashboard");
            }
        } catch (err) {
            const msg = axios.isAxiosError(err) && err.response?.data?.message
                ? err.response.data.message[0]?.messages[0]?.message
                : "An unexpected error occurred.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        setError(null);
        if (!identifier) return setError("Phone number is required");

        try {
            setLoading(true);
            await axios.post(`${baseURL}/api/web/auth/phone/signup`, { phone: identifier });
            setOtpSent(true);
        } catch {
            setError("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 via-green-500 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">LOGIN</h1>

                {/* Toggle Between Email & Phone */}
                <div className="flex mb-4">
                    <button
                        onClick={() => setUseEmail(true)}
                        className={`flex-1 py-2 rounded-l ${useEmail ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Email
                    </button>
                    <button
                        onClick={() => setUseEmail(false)}
                        className={`flex-1 py-2 rounded-r ${!useEmail ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Phone
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type={useEmail ? "email" : "tel"}
                        placeholder={useEmail ? "Email" : "Phone Number (e.g. +249...)"}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full p-3 mb-4 border rounded"
                    />

                    {useEmail ? (
                        <>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mb-4 border rounded"
                            />
                            <div className="text-right mb-4">
                                <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-2 mb-4">
                            <input
                                placeholder="Enter OTP"
                                value={firebaseToken}
                                onChange={(e) => setFirebaseToken(e.target.value)}
                                className="flex-1 p-3 border rounded"
                                disabled={!otpSent}
                            />
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={otpSent}
                                className="bg-blue-500 text-white px-4 rounded disabled:bg-gray-300"
                            >
                                {otpSent ? "Sent" : "Get OTP"}
                            </button>
                        </div>
                    )}

                    <div className="mb-4">
                        <ReCAPTCHA sitekey={reCAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded mb-4 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading && <FaSpinner className="animate-spin" />}
                        LOGIN
                    </button>
                </form>

                <p className="text-center text-sm mb-2 text-blue-500 font-bold">Or login with</p>

                <div className="flex justify-between mb-4">
                    <button
                        className="w-[48%] flex items-center justify-center gap-2 border py-2 rounded bg-blue-900 text-white hover:bg-blue-800"
                        onClick={triggerFacebookLogin}
                    >
                        <FaFacebook className="text-xl" /> Facebook
                    </button>
                    <button
                        onClick={triggerGoogleLogin}
                        className="w-[48%] flex items-center justify-center gap-2 border py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        <FaGoogle className="text-xl" /> Google
                    </button>
                </div>

                <p className="text-sm text-center text-black">
                    Not a member? <Link href="/signup" className="text-blue-600 hover:underline">Sign up now</Link>
                </p>
            </div>
        </div>
    );
}
