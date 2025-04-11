// import { useEffect } from "react";

// const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

// const Recaptcha = ({ onVerify }: { onVerify: (token: string | null) => void }) => {
//     useEffect(() => {
//         // Check if the script already exists
//         if (!document.querySelector("#recaptcha-script")) {
//             const script = document.createElement("script");
//             script.src = "https://www.google.com/recaptcha/api.js";
//             script.async = true;
//             script.defer = true;
//             script.id = "recaptcha-script";
//             document.body.appendChild(script);
//         }
//     }, []);

//     return (
//         <div className="text-center mb-4">
//             <p className="text-sm text-gray-500 mb-2">Loading reCAPTCHA...</p>
//             <div
//                 className="g-recaptcha"
//                 data-sitekey={SITE_KEY}
//                 data-callback={(token: string) => onVerify(token)}
//                 data-error-callback={() => onVerify(null)}
//                 data-expired-callback={() => onVerify(null)}
//             />
//         </div>
//     );
// };

// export default Recaptcha;