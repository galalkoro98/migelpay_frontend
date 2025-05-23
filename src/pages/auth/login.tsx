import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { baseURL } from '@/shared/utils/baseURL';
import AuthPageWrapper from "@/shared/components/AuthPageWrapper";
import FacebookAuthButton from "@/modules/auth/components/FacebookAuthButton";
import GoogleAuthButton from "@/modules/auth/components/GoogleAuthButton";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateInputs = () => {
        if (!email || !password) return "Email and password are required";
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
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
            const res = await axios.post(`${baseURL}/api/web/auth/login/user-login`, {
                email,
                password
            });

            // ✅ Proper token validation
            if (!res.data?.token) {
                throw new Error("No token received from server");
            }

            // ✅ Verify token structure before storing
            const token = res.data.token;
            if (typeof token !== "string" || !token.startsWith("eyJ")) {
                throw new Error("Invalid token format");
            }

            localStorage.setItem("token", token);
            router.push("/dashboard");

        } catch (err) {
            localStorage.removeItem("token"); // Clear invalid tokens

            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
            } else {
                setError(err instanceof Error ? err.message : "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center  from-gray-500 via-green-500 to-blue-600  bg-gradient-to-b">
                <AuthPageWrapper title="Login" >

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mb-4 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mb-2 border rounded"
                            required
                        />

                        <div className="text-right mb-4">
                            <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
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
                        <GoogleAuthButton />
                        <FacebookAuthButton />
                    </div>

                    <p className="text-sm text-center text-black">
                        Not a member? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up now</Link>
                    </p>
                </AuthPageWrapper >
            </div>
   
    );
}