import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export const useGoogleLogin = () => {
    const router = useRouter();

    const triggerGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken(); // Firebase ID token

            // Send token to your backend login route
            const res = await axios.post(`${baseURL}/api/web/auth/google/google-login`, {
                firebaseToken: idToken,
                platform: "web",
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.accessToken);
                router.push("/dashboard");
            } else {
                alert("Google login failed: " + res.data.message);
            }
        } catch (error) {
            console.error("Google login error", error);
            alert("Google login failed");
        }
    };

    return { triggerGoogleLogin };
};
