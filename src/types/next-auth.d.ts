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
    grecaptcha?: {
      render: (container: HTMLElement, parameters: { sitekey: string; callback?: (token: string) => void; "error-callback"?: () => void; "expired-callback"?: () => void }) => number;
      reset: (widgetId: number) => void;
      ready: (callback: () => void) => void;
    };
  }
}

export { };




// declare global {
//   interface Window {
//     grecaptcha?: {
//       ready: (callback: () => void) => void;
//       render: (container: HTMLElement, parameters: { sitekey: string; callback: (token: string) => void; "error-callback"?: () => void; "expired-callback"?: () => void }) => void;
//     };
//   }
// }

