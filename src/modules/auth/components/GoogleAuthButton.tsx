import React from "react";
import { FaGoogle } from "react-icons/fa";
import OAuthButton from "./OAuthButton";
import { useGoogleOAuthPopup } from "../hooks/useGoogleAuth";

const GoogleAuthButton = ({ endpoint = "/google-signup", redirect = "/auth/verify-email" }) => {
    const { triggerGoogleOAuth } = useGoogleOAuthPopup({
        endpoint,
        onSuccessRedirect: redirect,
    });

    return (
        <OAuthButton
            label="Google"
            Icon={FaGoogle}
            color="bg-red-600 hover:bg-red-500"
            onClick={triggerGoogleOAuth}
        />
    );
};

export default GoogleAuthButton;


