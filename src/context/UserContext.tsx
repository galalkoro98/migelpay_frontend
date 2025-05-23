import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback
} from "react";
import axios from "axios";
import { baseURL } from "@/shared/utils/baseURL";
import { jwtDecode } from "jwt-decode";

type UserType = {
    _id: string;
    id: string;
    name?: string;
    email?: string;
    birthDate?: string;
    phone?: string;
    verified: boolean;
    profilePicture?: string;
    countryCode?: string;
    provider: string;
    role?: 'user' | 'admin';
    notifications?: { message: string; read: boolean }[];
};

type VerificationStatus = {
    idVerified: boolean;
    addressVerified: boolean;
    faceMatched: boolean;
};

type UserContextType = {
    user: UserType | null;
    token: string | null;
    isVerified: boolean;
    setIsVerified: (verified: boolean) => void;
    loading: boolean;
    setUser: (user: UserType | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    refreshVerificationStatus: () => Promise<void>;
    initializeUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
    user: null,
    token: null,
    isVerified: false,
    setIsVerified: () => { },
    loading: false,
    setUser: () => { },
    setToken: () => { },
    logout: () => { },
    refreshVerificationStatus: async () => { },
    initializeUser: async () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);



    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setIsVerified(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, []);


    const refreshVerificationStatus = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        try {
            const res = await axios.get<VerificationStatus>(
                `${baseURL}/api/web/user/verification-status`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status !== 200) {
                throw new Error("Failed to fetch verification status");
            }

            const { idVerified, addressVerified, faceMatched } = res.data;
            const verified = idVerified && addressVerified && faceMatched;
            setIsVerified(verified);
        } catch (error) {
            console.error("Verification error:", error);
            setIsVerified(false);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Initialize user from token
    const initializeUser = useCallback(async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;

        try {
            setLoading(true);
            // Verify token structure
            if (!storedToken.startsWith("eyJ")) {
                throw new Error("Invalid token format");
            }

            // Decode token to get basic user info
            const decoded = jwtDecode<JwtPayload>(storedToken);
            if (!decoded?.id) {
                throw new Error("Invalid token payload");
            }
            // Fetch full user data
            const res = await axios.get(`${baseURL}/api/web/user/profile`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (res.status === 200) {
                setUser(res.data);
                setToken(storedToken);
                await refreshVerificationStatus();
            } else {
                throw new Error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Initialization error:", error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout, refreshVerificationStatus]);


    // Set up token and user persistence
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            initializeUser();
        }
    }, [initializeUser]);

    // Update local storage when user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    // Handle token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            initializeUser();
        }
    }, [token, initializeUser]);

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                isVerified,
                setIsVerified,
                loading,
                setUser,
                setToken,
                logout,
                refreshVerificationStatus,
                initializeUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};