import DefaultLayout from "@/layout/DefaultLayout";

export default function TermsOfService() {
    return (
        <DefaultLayout>
            <main className="max-w-7xl mx-auto py-16 px-4 text-white">
                <h1 className="text-4xl font-bold text-green-400 mb-6">Terms of Service</h1>
                <p className="text-gray-300 mb-4">
                    By using MigelPay, you agree to the following terms and conditions.
                </p>
                <ol className="list-decimal list-inside text-gray-400 space-y-2">
                    <li>You are responsible for maintaining the confidentiality of your account.</li>
                    <li>Do not use MigelPay for unlawful purposes.</li>
                    <li>We reserve the right to modify these terms at any time.</li>
                </ol>
            </main>
        </DefaultLayout>
    );
}
