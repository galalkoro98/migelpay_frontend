import dynamic from 'next/dynamic';
import dotenv from 'dotenv';

dotenv.config();

export const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });
export const reCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;