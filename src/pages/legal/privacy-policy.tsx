import DefaultLayout from "@/layout/DefaultLayout";

export default function Privacy() {
    return (
        <DefaultLayout>
            <main className="max-w-7xl mx-auto py-16 px-4 text-white ">
                <h1 className="text-4xl font-bold text-green-400 mb-6">Privacy Policy</h1>
                <p className="text-gray-300 mb-4">
                    We are committed to protecting your privacy. This policy explains what data we collect, why, and how it’s used.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>We collect information like your name, email, and payment details.</li>
                    <li>We do not share your data without your consent.</li>
                    <li>Your data is stored securely and encrypted.</li>
                </ul>
            </main>
        </DefaultLayout>

    );
}
