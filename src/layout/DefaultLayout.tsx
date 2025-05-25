import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}