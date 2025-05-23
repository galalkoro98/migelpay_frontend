import DefaultLayout from "@/layout/DefaultLayout";

export default function Pricing() {
    return (
        <DefaultLayout>
            <div className="bg-cover bg-no-repeat bg-center bg-fixed bg-gray-900">
                <main className="max-w-7xl mx-auto py-28 px-4 text-white ">
                    <h1 className="text-4xl font-bold text-green-400 mb-6">Pricing Plans</h1>
                    <p className="text-gray-300 mb-8">Choose a plan that fits your business needs.</p>
                    <div className="grid md:grid-cols-3 gap-2">
                        {["Basic", "Pro", "Enterprise"].map((tier, i) => (
                            <div key={i} className="border border-green-500 rounded-lg p-3 hover:shadow-lg transition">
                                <h2 className="text-2xl font-semibold mb-2">{tier}</h2>
                                <p className="text-green-400 text-xl font-bold mb-4">{i === 0 ? "$0" : i === 1 ? "$29" : "Custom"}</p>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li>✔ Secure transfers</li>
                                    <li>✔ 24/7 Support</li>
                                    <li>✔ Account management</li>
                                </ul>
                                <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </DefaultLayout>
    );
}
