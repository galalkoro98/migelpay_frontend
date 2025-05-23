import Link from "next/link";

export default function AuthPageWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="min-h-screen from-white via-purple-500 to-blue-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full">
                <div className="mb-12 flex flex-col items-center justify-between sm:flex-row">
                    <h1 className="text-1xl font-bold text-center text-green-500 sm:text-left mb-4 sm:mb-0">{title}</h1>
                    <Link
                        href="/"
                        className="text-sm bg-gray-100 border font-bold hover:bg-white text-gray-700 px-6 py-2 rounded shadow-sm transition-all"
                    >
                        ← Back to Home
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
