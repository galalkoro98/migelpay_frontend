import { SignupFormData } from "../../modules/auth/types/authTypes";

export const validateSignupForm = (form: SignupFormData): string | null => {
    if (!form.name) return "Full name is required";
    if (!form.birthDate) return "Birth date is required";
    if (!form.email) return "Email is required";
    if (!form.password) return "Password is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
    if (form.password.length < 8) return "Password must be at least 8 characters";
    return null;
}