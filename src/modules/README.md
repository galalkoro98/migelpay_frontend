# MigelPay Frontend – Professional Structure

This project is the frontend for MigelPay, built using **Next.js**, **React**, and **TypeScript**, structured for scalability and cross-platform support (Web, iOS, Android).

---

## 📁 Folder Structure

```bash
src/
├── app/                  # Next.js pages (routes for web)
│   ├── auth/             # Auth-related pages
│   ├── dashboard/        # Dashboard and user transactions
│   ├── services/         # Informational service pages
│   └── _app.tsx          # App bootstrap
│
├── modules/              # Feature-based modules
│   ├── auth/             # Auth logic, components, types
│   │   ├── components/
│   │   │   ├── GoogleLogin.tsx
│   │   │   ├── PhoneSignup.tsx
│   │   │   └── FacebookLogin.tsx
│   │   ├── hooks/
│   │   │   ├── useGoogleAuth.ts
│   │   │   ├── useFacebookAuth.ts
│   │   │   └── usePhoneAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── types/
│   │   │   └── authTypes.ts
│   │   └── index.ts
│   ├── payments/
│   │   ├── components/
│   │   │   └── PaymentForm.tsx
│   │   ├── services/
│   │   │   └── paymentService.ts
│   │   ├── hooks/
│   │   │   └── usePayments.ts
│   │   ├── types/
│   │   │   └── paymentTypes.ts
│   │   └── index.ts
│   └── user/
│       ├── components/
│       │   ├── ProfileCard.tsx
│       │   └── VerificationStatus.tsx
│       ├── hooks/
│       │   ├── useUserProfile.ts
│       │   └── useVerification.ts
│       ├── services/
│       │   ├── userService.ts
│       │   └── verificationService.ts
│       ├── types/
│       │   └── userTypes.ts
│       └── index.ts
│
├── shared/
│   ├── components/       # UI components (Navbar, Footer...)
│   ├── hooks/            # Reusable React hooks
│   ├── lib/              # Firebase, other SDKs
│   ├── utils/            # Helpers, currency formatting, etc.
│   ├── constants/        # App-wide constants
│   ├── types/            # Global types
│   └── styles/           # Tailwind CSS + global styles
│
├── layout/               # Layout components
│   ├── AuthLayout.tsx
│   ├── DashboardLayout.tsx
│   └── DefaultLayout.tsx
│
├── context/              # React context providers
├── config/               # App configurations (env parser, etc.)
│
.gitignore
.env.local
next.config.ts
tsconfig.json
package.json
tailwind.config.ts
```

---

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the app:**

   ```bash
   npm run dev
   ```

3. **Env Setup:**
   Create `.env.local` and add Firebase, API base URLs, etc.

---

## 🧩 Tech Stack

- **React + TypeScript**
- **Next.js 13+ App Router**
- **TailwindCSS** for styling
- **Firebase** for auth, Firestore
- **MongoDB Atlas** (served from backend)
- **Cloudinary** for image storage
- **Face++** for verification

---

## 🔮 Future Ready

- Easy integration with React Native in a monorepo
- Supports modular auth strategies (Google, Facebook, Phone, Email)
- Separation of concerns: UI, business logic, and data fetching
- Ready for unit & integration testing

---

## 🧪 Boilerplate Code Samples

### `authService.ts`

```ts
import axios from 'axios';

export const loginWithEmail = async (email: string, password: string) => {
  return axios.post('/api/auth/login', { email, password });
};

export const signupWithEmail = async (data: any) => {
  return axios.post('/api/auth/signup', data);
};

export const verifyToken = async (token: string) => {
  return axios.post('/api/auth/verify', { token });
};
```

### `useGoogleAuth.ts`

```ts
import { useEffect } from 'react';

export const useGoogleAuth = () => {
  useEffect(() => {
    // Google One Tap init logic
  }, []);

  return {
    handleGoogleLogin: () => {
      // trigger google login
    }
  };
};
```

### `GoogleLogin.tsx`

```tsx
import React from 'react';

const GoogleLogin = () => {
  return (
    <button onClick={() => console.log('Google Login')}>Login with Google</button>
  );
};

export default GoogleLogin;
```

### `paymentService.ts`

```ts
import axios from 'axios';

export const createPayment = async (data: any) => {
  return axios.post('/api/payments/create', data);
};

export const getTransactions = async () => {
  return axios.get('/api/payments/transactions');
};
```

### `userService.ts`

```ts
import axios from 'axios';

export const getUserProfile = async () => {
  return axios.get('/api/user/profile');
};

export const updateUserProfile = async (data: any) => {
  return axios.put('/api/user/profile', data);
};
```

### `verificationService.ts`

```ts
import axios from 'axios';

export const checkVerificationStatus = async () => {
  return axios.get('/api/user/verification-status');
};

export const submitVerificationDocs = async (data: FormData) => {
  return axios.post('/api/user/verify', data);
};
```

