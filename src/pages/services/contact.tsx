import DefaultLayout from "@/layout/DefaultLayout";

export default function Contact() {
    return (
        <DefaultLayout>
            <main className="max-w-7xl mx-auto py-16 px-4 text-white bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-green-400 mb-6">Contact Us</h1>
                <p className="text-gray-300 mb-8">Have questions? We&apos;d love to hear from you.</p>

                <form className="space-y-6">
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded-md text-black" />
                    <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md text-black" />
                    <textarea placeholder="Your message" rows={5} className="w-full px-4 py-2 rounded-md text-black"></textarea>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">Send Message</button>
                </form>
            </main>
        </DefaultLayout>
    );
}
