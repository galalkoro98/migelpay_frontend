import { useRouter } from "next/router";

export function useFacebookOAuthPopup({ endpoint, onSuccessRedirect }: {
    endpoint: string;
    onSuccessRedirect: string;
}) {
    const router = useRouter();

    const triggerFacebookOAuth = async () => {
        try {
            const newWindow = window.open(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
                "_blank",
                "width=500,height=600"
            );

            const handleMessage = (event: MessageEvent) => {
                if (event.origin !== process.env.NEXT_PUBLIC_BACKEND_URL) return;
                if (event.data === "success") {
                    newWindow?.close();
                    router.push(onSuccessRedirect);
                }
            };
            window.addEventListener("message", handleMessage, false);

        } catch (err) {
            console.error("Google OAuth error", err);
        }
    };

    return { triggerFacebookOAuth };
}
