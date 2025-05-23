import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    {children}
                </div>
            </main>
        </div>
    );
}