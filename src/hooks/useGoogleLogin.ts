import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export const useGoogleLogin = () => {
    const router = useRouter();

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (response: { credential: string }) => {
                try {
                    const googleAccessToken = response.credential;

                    const res = await axios.post(`${baseURL}/api/web/auth/google/google-login`, {
                        googleAccessToken,
                    });

                    if (res.data.success) {
                        localStorage.setItem("token", res.data.accessToken);
                        router.push("/dashboard");
                    }
                } catch {
                    alert("Google login failed.");
                }
            },
        });
    }, [router]);

    const triggerGoogleLogin = () => {
        if (!window.google) return;
        window.google.accounts.id.prompt();
    };

    return { triggerGoogleLogin };
};
