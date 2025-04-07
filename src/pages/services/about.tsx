import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8 text-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About MigelPay</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg">
              MigelPay is a financial service provider specializing in digital payment solutions 
              for international services like Starlink.
            </p>

            <h2 className="text-xl font-semibold mt-6">Our Mission</h2>
            <p>
              To simplify cross-border payments and make global digital services accessible 
              to everyone, regardless of location or banking limitations.
            </p>

            <h2 className="text-xl font-semibold mt-6">What We Do</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process Starlink subscription payments</li>
              <li>Convert currencies at competitive rates</li>
              <li>Provide reliable payment solutions</li>
              <li>Offer 24/7 customer support</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">Our Team</h2>
            <p>
              Founded in 2022, our team consists of payment processing experts, 
              financial technology specialists, and customer service professionals 
              dedicated to making your experience seamless.
            </p>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800">Have Questions?</h3>
              <p className="text-blue-600 mt-1">
                Contact us at support@migelpay.com or through our WhatsApp/Telegram channels.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}