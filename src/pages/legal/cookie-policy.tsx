import DefaultLayout from "@/layout/DefaultLayout";

export default function CookiePolicy() {
    return (
        <DefaultLayout>

            <main className="max-w-7xl mx-auto py-16 px-4 text-white">
                <h1 className="text-4xl font-bold text-green-400 mb-6">Cookie Policy</h1>
                <p className="text-gray-300 mb-4">
                    We use cookies to improve your experience on our site. Cookies help us understand how users interact with MigelPay.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Essential cookies are used for core functionality.</li>
                    <li>Analytics cookies help us track site usage.</li>
                    <li>You can disable cookies in your browser settings.</li>
                </ul>
            </main>
        </DefaultLayout>
    );
}
