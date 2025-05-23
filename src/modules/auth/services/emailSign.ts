import axios from "axios";
import { baseURL } from "@/shared/utils/baseURL";
import { SignupFormData } from "@/modules/auth/types/authTypes";

export const emailSignup = async (formData: SignupFormData) => {
    try {
        const response = await axios.post(`${baseURL}/api/web/auth/email/email-signup`, formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
        throw new Error('An unexpected error occurred during signup');
    }
};