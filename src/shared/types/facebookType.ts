declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: {
            init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
            login: (callback: (response: FacebookLoginResponse) => void, options: { scope: string }) => void;
        };
    }
}

export interface FacebookLoginResponse {
    authResponse?: {
        accessToken: string;
        expiresIn: number;
        signedRequest: string;
        userID: string;
    };
    status: string;
}