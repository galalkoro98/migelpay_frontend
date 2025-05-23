# MigelPay Frontend – Professional Structure

This project is the frontend for MigelPay, built using **Next.js**, **React**, and **TypeScript**, structured for scalability and cross-platform support (Web, iOS, Android).

---

## 📁 Folder Structure

```bash
src/
├── app/                  # Next.js pages (routes for web)
│   ├── auth/             # Auth-related pages
│   ├── dashboard/        # Dashboard and user transactions
│   │   ├── index.tsx
│   │   ├── payments/
│   │   │   ├── send.tsx           # Send money page
│   │   │   ├── transactions.tsx   # History page
│   │   │   └── receipt.tsx        # Payment receipt page
│   │   ├── profile.tsx            # User profile page
│   │   └── verification.tsx       # ID and address verification
│   ├── services/         # Informational service pages
│   └── _app.tsx          # App bootstrap
│
├── modules/              # Feature-based modules
│   ├── auth/
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

### `send.tsx` (Send Money Page)

```tsx
import PaymentForm from '@/modules/payments/components/PaymentForm';

export default function SendPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Send Money</h2>
      <PaymentForm />
    </div>
  );
}
```

### `profile.tsx` (Profile Page)

```tsx
import ProfileCard from '@/modules/user/components/ProfileCard';

export default function ProfilePage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <ProfileCard />
    </div>
  );
}
```

### `verification.tsx` (Verification Upload Page)

```tsx
import VerificationStatus from '@/modules/user/components/VerificationStatus';

export default function VerificationPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Verify Your Identity</h2>
      <VerificationStatus />
    </div>
  );
}
```

### ✅ File Upload + Preview: `VerificationUpload.tsx`

```tsx

import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const VerificationUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!['image/jpeg', 'image/png'].includes(selected.type)) {
      toast.error('Only JPEG/PNG allowed');
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = () => {
    if (!file) return toast.error('Upload a document');

    const formData = new FormData();
    formData.append('file', file);

    toast.promise(
      fetch('/api/user/verify', {
        method: 'POST',
        body: formData,
      }),
      {
        loading: 'Uploading...',
        success: 'Document submitted! ✅',
        error: 'Failed to upload ❌',
      }
    );
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && <Image src={preview} alt="Preview" width={250} height={150} className="rounded border" />}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default VerificationUpload;
```

### 🔔 Toast Notification Setup

Make sure you wrap your app with the provider (like in `_app.tsx`):

```tsx
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
```
