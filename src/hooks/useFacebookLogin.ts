import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { baseURL } from "@/utils/baseURL";
import { useUser } from "@/context/UserContext";
import { FacebookLoginResponse } from "@/types/facebookType";

export const useFacebookLogin = () => {
    const router = useRouter();
    const { setUser, setToken } = useUser();

    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
                cookie: true,
                xfbml: true,
                version: "v18.0",
            });
        };

        (function (d, s, id) {
            if (d.getElementById(id)) return;
            const js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            const fjs = d.getElementsByTagName(s)[0];
            fjs.parentNode?.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    const triggerFacebookLogin = () => {
        window.FB.login(
            async (response: FacebookLoginResponse) => {
                if (response.authResponse) {
                    const accessToken = response.authResponse.accessToken;

                    const res = await axios.post(`${baseURL}/api/web/auth/facebook/facebook-login`, {
                        accessToken,
                    });

                    if (res.data.success) {
                        setToken(res.data.accessToken);
                        setUser(res.data.user);
                        router.push("/dashboard");
                    }
                } else {
                    alert("Facebook login failed");
                }
            },
            { scope: "email" }
        );
    };

    return { triggerFacebookLogin };
};
