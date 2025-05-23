export interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    birthDate: string;
    sex: string;
    country: string;
    profileImage?: string;
    isVerified: boolean; // ✅ Add verification status
}