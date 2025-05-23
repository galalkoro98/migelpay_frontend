import { useState } from "react";
import axios from "axios";
import { Home, User, CreditCard, Settings, Menu, LogOut, ShieldAlert, Bell, Moon, Sun } from 'lucide-react';
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/shared/lib/firebase";
import { baseURL } from "@/shared/utils/baseURL";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isVerified, logout } = useUser();
    const { dark, toggle } = useTheme();
    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false);

    const unread = user?.notifications?.filter(n => !n.read).length || 0;

    const navItems = [
        { label: "Overview", icon: Home, path: "/dashboard" },
        { label: "Profile", icon: User, path: "/dashboard/profile" },
        { label: "Services", icon: Settings, path: "/services" },
        { label: "Transactions", icon: CreditCard, path: "/dashboard/transactions", protected: true },
    ];

    const isActive = (path: string) => router.pathname === path;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await axios.post(`${baseURL}/api/web/auth/logout/logout-user`, {}, { withCredentials: true });
            logout();
            router.push("auth/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    return (
        <div className="flex min-h-screen">
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-full shadow"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-50 shadow-md transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    { }
                    <div className="text-lg font-bold text-green-700">MigelPay</div>

                    <div className="flex items-center space-x-4">
                        {/* Notification Bell */}
                        <button
                            className="relative text-gray-700 hover:text-green-700"
                            onClick={() => router.push("/dashboard/notifications")}
                        >
                            <Bell size={20} />
                            {unread > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {unread}
                                </span>
                            )}
                        </button>

                        {/* Theme toggle */}
                        <button onClick={toggle} className="text-gray-700 hover:text-green-700">
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>

                {/* <div className="p-5 text-2xl font-bold text-green-700 border-b border-gray-300">MigelPay</div> */}
                <nav className="flex flex-col p-4 space-y-3">

                    {user?.role === "admin" && (
                        <a
                            href="https://admin.migelpay.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-700 hover:text-green-700 font-bold"
                        >
                            <Settings size={20} />
                            <span>Admin Panel</span>
                        </a>
                    )}

                    {navItems.map(({ label, icon: Icon, path, protected: protectedRoute }) => {
                        const disabled = protectedRoute && isVerified === false;
                        return (
                            <button
                                key={path}
                                onClick={() => {
                                    if (disabled) {
                                        router.push("/dashboard/verification");
                                    } else {
                                        router.push(path);
                                    }
                                }}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition font-medium
                  ${isActive(path)
                                        ? "bg-green-100 text-green-700"
                                        : disabled
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{label}</span>
                            </button>


                        );
                    })}

                    {isVerified === false && (
                        <div className="flex items-center space-x-2 mt-4 p-3 rounded bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500">
                            <ShieldAlert size={20} />
                            <span className="text-sm font-semibold">Verify identity</span>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:text-red-700 font-bold transition"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 bg-gray-100">
                {children}
            </main>
        </div>
    );
}
