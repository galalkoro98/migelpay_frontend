import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { baseURL } from "@/utils/baseURL";

export const useGoogleSignup = () => {
    const router = useRouter();

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (response: { credential: string }) => {
                try {
                    const googleAccessToken = response.credential;

                    const res = await axios.post(`${baseURL}/api/web/auth/google/google-signup`, {
                        googleAccessToken,
                        platform: "web",
                    });

                    if (res.data.success) {
                        localStorage.setItem("token", res.data.accessToken);
                        router.push("/dashboard");
                    }
                } catch {
                    alert("Google signup failed.");
                }
            },
        });
    }, [router]);

    const triggerGoogleSignup = () => {
        window.google.accounts.id.prompt();
    };

    return { triggerGoogleSignup };

};
