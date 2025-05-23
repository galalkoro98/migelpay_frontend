# MigelPay Frontend – Professional Structure

This project is the frontend for MigelPay, built using **Next.js**, **React**, and **TypeScript**, structured for scalability and cross-platform support (Web, iOS, Android).

---

## 📁 Folder Structure

```bash
src/
├── app/
│   ├── auth/
│   ├── dashboard/
│   │   ├── payments/
│   │   │   ├── send.tsx
│   │   │   ├── transactions.tsx
│   │   │   └── receipt.tsx
│   │   ├── profile.tsx
│   │   └── verification.tsx
│   ├── services/
│   └── _app.tsx
│
├── modules/
│   ├── auth/
│   ├── payments/
│   └── user/
│       ├── components/
│       │   ├── ProfileCard.tsx
│       │   ├── VerificationStatus.tsx
│       │   ├── VerificationUpload.tsx
│       │   └── VerificationSteps.tsx
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   └── styles/
│
├── layout/
├── context/
├── config/
│
.gitignore
.env.local
next.config.ts
tsconfig.json
package.json
tailwind.config.ts
```

---

## 🔄 Multi-Step Verification Component – `VerificationSteps.tsx`

```tsx

import React, { useState } from 'react';
import VerificationUpload from './VerificationUpload';

const steps = ['ID Upload', 'Address Upload', 'Face Scan'];

const VerificationSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-sm px-2 py-1 rounded ${
              index === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {currentStep === 0 && <VerificationUpload label="Upload your ID" />}
      {currentStep === 1 && <VerificationUpload label="Upload a utility bill or bank statement" />}
      {currentStep === 2 && (
        <div>
          <p className="text-sm text-gray-600">Facial recognition will be triggered here.</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Start Face Scan</button>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={back} disabled={currentStep === 0} className="text-sm text-gray-600">Back</button>
        <button onClick={next} disabled={currentStep === steps.length - 1} className="text-sm text-blue-600">Next</button>
      </div>
    </div>
  );
};

export default VerificationSteps;
```

You can plug this into your `verification.tsx` like this:

```tsx

import VerificationSteps from '@/modules/user/components/VerificationSteps';

export default function VerificationPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Verification Process</h2>
      <VerificationSteps />
    </div>
  );
}
```

### 🧠 Add `FaceCapture.tsx` Component

```tsx

import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const FaceCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      toast.error('Camera access denied');
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const img = canvas.toDataURL('image/png');
    setImageSrc(img);
  };

  const submitToBackend = async () => {
    if (!imageSrc) return toast.error('Capture a face photo first');

    const res = await fetch('/api/user/verify-face', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageSrc }),
    });

    if (res.ok) toast.success('Face verified ✅');
    else toast.error('Face verification failed ❌');
  };

  return (
    <div className="space-y-4">
      <video ref={videoRef} autoPlay className="rounded border w-full max-w-md" />
      <button onClick={startCamera} className="bg-blue-600 text-white px-4 py-2 rounded">Start Camera</button>
      <button onClick={captureImage} className="bg-yellow-500 text-white px-4 py-2 rounded">Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured face" className="rounded w-64 border" />}
      <button onClick={submitToBackend} className="bg-green-600 text-white px-4 py-2 rounded">Submit Face</button>
    </div>
  );
};

export default FaceCapture;
```

### 📦 Backend Endpoint `/api/user/verify-face`

Make sure your backend can handle:

- Base64 image parsing
- Sending to Face++ or your own model
- Verifying face match or liveness

---

