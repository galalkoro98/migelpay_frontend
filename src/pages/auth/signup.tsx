import { useState } from "react";
import { useRouter } from "next/router";
import { FaGoogle, FaFacebook, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { auth } from "@/lib/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import Recaptcha from "@/components/Recaptcha";

export default function SignupPage() {
    const [useEmail, setUseEmail] = useState(true);
    const [form, setForm] = useState({
        name: "",
        birthDate: "",
        email: "",
        phone: "",
        password: "",
        sex: "male",
        country: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [firebaseToken, setFirebaseToken] = useState("");
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const { triggerGoogleSignup } = useGoogleSignup();
    const router = useRouter();

    const handleCaptcha = (token: string | null) => {
        setCaptchaToken(token);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (useEmail && !captchaToken) {
            setError("Please complete the reCAPTCHA");
            setLoading(false);
            return;
        }

        // Basic validation
        if (useEmail) {
            if (!form.name || !form.email || !form.password) {
                setError("Please fill all required fields");
                setLoading(false);
                return;
            }
        } else if (!form.phone) {
            setError("Phone number is required");
            setLoading(false);
            return;
        }

        try {
            const endpoint = useEmail ? `${baseURL}/api/web/auth/email/signup` : `${baseURL}/api/web/auth/phone/signup`;
            const body = useEmail ? { ...form, phone: undefined } : { phone: form.phone, firebaseToken };

            const res = await axios.post(endpoint, body);

            if (res.data.success) {
                if (useEmail) {
                    router.push("/auth/verify-email");
                } else {
                    localStorage.setItem("token", res.data.jwt);
                    router.push("/dashboard");
                }
            } else {
                setError(res.data.message || "Signup failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "An error occurred during signup");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        if (!form.phone) {
            setError("Phone number is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                form.phone,
                // window.recaptchaVerifier
            );

            const otpCode = prompt("Enter the OTP sent to your phone:");
            if (!otpCode) {
                throw new Error("OTP was not entered");
            }

            const result = await confirmationResult.confirm(otpCode);
            const token = await result.user.getIdToken();

            setFirebaseToken(token);
            setOtpSent(true);
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("OTP Error:", error);
                setError(error.message || "Failed to verify OTP");
            } else {
                console.error("Unexpected error:", error);
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">CREATE ACCOUNT</h1>
                <div className="flex mb-4">
                    <button
                        onClick={() => setUseEmail(true)}
                        className={`flex-1 py-2 ${useEmail ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'}`}
                    >
                        Email
                    </button>
                    <button
                        onClick={() => setUseEmail(false)}
                        className={`flex-1 py-2 ${!useEmail ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'}`}
                    >
                        Phone
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {useEmail ? (
                        <>
                            <input
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black font-semibold"
                                required
                            />
                            <input
                                type="date"
                                name="birthDate"
                                value={form.birthDate}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black"
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black font-semibold"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black font-semibold"
                                required
                            />
                            <select
                                name="sex"
                                value={form.sex}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black font-semibold"
                            />
                        </>
                    ) : (
                        <>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="Phone Number (with country code)"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border rounded text-black"
                                required
                            />
                            <div className="flex gap-2 mb-4">
                                <input
                                    placeholder="Enter OTP"
                                    value={firebaseToken}
                                    onChange={(e) => setFirebaseToken(e.target.value)}
                                    className="flex-1 p-3 border rounded text-black"
                                    disabled={!otpSent}
                                    required
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
                        </>
                    )}

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded mb-4 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : null}
                        CREATE ACCOUNT
                    </button>
                    <Recaptcha onVerify={handleCaptcha} />
                    {captchaToken && <p className="text-green-500 text-sm mb-2">reCAPTCHA verified</p>}
                </form>

                <p className="text-center text-sm mb-2">Or sign up with</p>

                <div className="flex justify-between mb-4">
                    <button className="w-[48%] flex items-center justify-center gap-2 border py-2 rounded bg-blue-900 text-white hover:bg-blue-300">
                        <FaFacebook className="text-xl" />
                        Facebook
                    </button>
                    <button
                        onClick={triggerGoogleSignup}
                        className="w-[48%] flex items-center justify-center gap-2 border py-2 rounded bg-red-900 text-white hover:bg-red-300"
                    >
                        <FaGoogle className="text-xl" />
                        Google
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600">
                    By signing up, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    Already have an account? <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}