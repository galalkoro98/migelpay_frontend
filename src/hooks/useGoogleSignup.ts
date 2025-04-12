import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export const useGoogleSignup = () => {
    const router = useRouter();

    const triggerGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken(); // Firebase ID token

            // Send token to your backend
            const res = await axios.post(`${baseURL}/api/web/auth/google/google-signup`, {
                firebaseToken: idToken,
                platform: "web",
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.accessToken);
                router.push("/dashboard");
            } else {
                alert("Google signup failed: " + res.data.message);
            }
        } catch (error) {
            console.error("Google signup error", error);
            alert("Google signup failed");
        }
    };

    return { triggerGoogleSignup };
};
