import "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      accessToken?: string; // ✅ Add accessToken here
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    accessToken?: string; // ✅ Ensure User type includes accessToken
  }
}
declare global {
  interface Window {
    recaptchaVerifier?: import("firebase/auth").RecaptchaVerifier;
    confirmationResult?: import("firebase/auth").ConfirmationResult;
  }
}