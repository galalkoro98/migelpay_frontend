import React from "react";
import { FaFacebook } from "react-icons/fa";
import OAuthButton from "./OAuthButton";
import { useFacebookOAuthPopup } from "../hooks/useFacebookAuth";

const FacebookAuthButton = ({ endpoint = "/facebook-signup", redirect = "/auth/verify-email" }) => {
    const { triggerFacebookOAuth } = useFacebookOAuthPopup({
        endpoint,
        onSuccessRedirect: redirect,
    });

    return (
        <OAuthButton
            label=" Facebook"
            Icon={FaFacebook}
            color="bg-blue-800 hover:bg-blue-700"
            onClick={triggerFacebookOAuth}
        />
    );
};

export default FacebookAuthButton;