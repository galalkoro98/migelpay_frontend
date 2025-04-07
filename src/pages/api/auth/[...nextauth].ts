import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });
          return response.data.user;
        } catch {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await axios.get(`${process.env.BACKEND_URL}/api/auth/user`, {
            params: { email: user.email },
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            await axios.post(`${process.env.BACKEND_URL}/api/auth/google/signup`, {
              email: user.email,
              name: user.name,
              provider: "google",
              image: user.image,
            });
          } else {
            console.error("Error fetching user:", error);
            return false;
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || (user as { id?: string; sub?: string }).sub;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? '';
        session.user.name = token.name ?? '';
        session.user.image = token.picture ?? undefined;
      }
      return session;
    },
    async redirect() {
      return '/dashboard';
    },
  },
});
