import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaSpinner, FaGlobe, FaUserShield, FaMoneyBillWave } from "react-icons/fa";
import AuthPageWrapper from "@/shared/components/AuthPageWrapper";
import { emailSignup } from "@/modules/auth/services/emailSign";
import { validateSignupForm } from "@/shared/utils/validation";
import FacebookAuthButton from "@/modules/auth/components/FacebookAuthButton";
import GoogleAuthButton from "@/modules/auth/components/GoogleAuthButton";
import { InputFieldProps, SelectFieldProps } from "@/shared/types/types/fieldTypes";
import { SignupFormData } from "@/modules/auth/types/authTypes";

export default function SignupPage() {
    const [form, setForm] = useState<SignupFormData>({
        name: "",
        birthDate: "",
        email: "",
        password: "",
        sex: "male",
        country: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const validationError = validateSignupForm(form);
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            const res = await emailSignup(form);

            if (res.data?.success) {
                alert(res.data.message);
                router.push(`/auth/verify-email?token=${encodeURIComponent(res.data.token)}&email=${encodeURIComponent(form.email)}`);
            }
            else {
                setError(res.data?.message || res.data?.error || "Signup failed");
            }
        } catch (err) {
            console.error('Detailed error:', err);
            let errorMessage = "An error occurred during signup";

            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-green-600">
            <div className="flex w-full max-w-8x1 bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-blue-600 to-purple-700 text-white p-8 w-1/2 ">
                    <div className="space-y-6 w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">

                                <Image src="/assets/logo.jpeg"
                                    alt="MigelPay Logo" width={100} height={100}
                                    className="mb-4 rounded-full"
                                />
                                <FaMoneyBillWave className="mr-2" />
                                MigelPay
                            </h1>
                            <p className="text-xl opacity-90">Migration Electronic Pay</p>
                        </div>


                        <Feature icon={<FaGlobe />} title="Global Transactions" subtitle="Send and receive money across borders with ease" />
                        <Feature icon={<FaUserShield />} title="Secure Platform" subtitle="Bank-level security for all your transactions" />
                        <Feature icon={<FaMoneyBillWave />} title="Low Fees" subtitle="Competitive rates for migrants and their families" />
                    </div>

                    <div className="mt-8 text-center text-sm opacity-80">
                        <p>Trusted by migrants and families worldwide</p>
                        <p className="mt-2">Join our growing community today</p>
                    </div>
                </div>

                <div className="w-full md:w-2/4 p-8 md:p-10 flex flex-col justify-center items-center bg-white rounded-2xl shadow-2xl">
                    <AuthPageWrapper title="Create Your MigelPay Account">
                        <form onSubmit={handleSubmit} className="w-full">
                            <InputField label="Full Name *" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                            <InputField label="Birth Date (YYYY-MM-DD) *" name="birthDate" value={form.birthDate} onChange={handleChange} required placeholder="1998-10-09" pattern="\d{4}-\d{2}-\d{2}" title="Please enter date in YYYY-MM-DD format" helper="Format: YYYY-MM-DD. Example: 1998-10-09" />
                            <InputField label="Email *" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="example@gmail.com" />
                            <InputField label="Password *" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" minLength={8} helper="Password must be at least 8 characters and include: 1 uppercase, 1 lowercase, 1 number, 1 special character." />
                            <SelectField label="Gender" name="sex" value={form.sex} onChange={handleChange} options={["male", "female"]} />
                            <InputField label="Country" name="country" value={form.country} onChange={handleChange} placeholder="Belgium" />

                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-5 flex items-center justify-center gap-2 disabled:opacity-70">
                                {loading && <FaSpinner className="animate-spin" />}
                                CREATE ACCOUNT
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mb-3">Or sign up with</p>
                        <div className="flex flex-row gap-3 w-full mb-5">
                            <GoogleAuthButton />
                            <FacebookAuthButton />
                        </div>

                        <p className="text-sm text-center text-gray-600">
                            By signing up, you agree to our {" "}
                            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and {" "}
                            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.<br />
                            Already have an account? {" "}
                            <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
                        </p>
                    </AuthPageWrapper>
                </div>
            </div>
        </div>
    );
}



const Feature = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
    <div className="flex items-start space-x-4">
        <div className="bg-white bg-opacity-20 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm opacity-80">{subtitle}</p>
        </div>
    </div>
);

const InputField = ({ label, helper, ...props }: InputFieldProps) => (
    <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <input {...props} className="w-full p-3 border border-gray-300 rounded-lg text-black" />
        {helper && <p className="text-xs text-gray-600 mt-1">{helper}</p>}
    </div>
);

const SelectField = ({ label, name, value, onChange, options }: SelectFieldProps) => (
    <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
            ))}
        </select>
    </div>
);
