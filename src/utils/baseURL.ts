import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_API_URL!;
export { baseURL };