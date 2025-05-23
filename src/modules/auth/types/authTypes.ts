export interface SignupFormData {
    name: string;
    birthDate: string;
    email: string;
    password: string;
    sex: 'male' | 'female';
    country: string;
}