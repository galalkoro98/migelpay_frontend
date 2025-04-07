import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

type UserType = {
    _id: string;
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

type UserContextType = {
    // router: any;
    user: UserType | null;
    token: string | null;
    isVerified: boolean;
    loading: boolean;
    setUser: (user: UserType | null) => void;
    setToken: (token: string | null) => void;
    setIsVerified: (val: boolean | null) => void;
    setLoading: (val: boolean) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    // router: null,
    user: null,
    token: null,
    isVerified: false,
    setUser: () => { },
    setToken: () => { },
    setIsVerified: () => { },
    setLoading: () => { },
    loading: false,
    logout: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    // Load user/token from localStorage on first load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    // Save to localStorage when updated
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        setLoading(false); // ✅ Done loading
    }, []);

    // Save user to localStorage when updated
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }
        , [user]);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                isVerified: isVerified ?? false,
                loading,
                setUser,
                setToken,
                setIsVerified,
                setLoading,
                logout,
            }}

        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
