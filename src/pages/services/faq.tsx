import DefaultLayout from "@/layout/DefaultLayout";
import { faqPageContent } from "@/shared/constants/translations/services/faq";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
    const { language } = useLanguage();
    const t = faqPageContent[language];

    return (
        <DefaultLayout>
            <div className="bg-gray-50">

                <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{
                            t.title
                        }</h1>

                        <div className="space-y-6">
                            <p className="text-gray-600">{t.subtitle}</p>

                            {t.questions.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.question}</h2>
                                    <p className="text-gray-600 mt-2">{item.answer}</p>
                                </div>
                            ))}

                        </div>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-900">
                                {t.contactSupport}
                            </h3>
                            <p className="text-gray-600 mt-1">
                                {t.contactSupportDesc} <span>
                                    <a href="https://wa.me/0032499891600" className="text-blue-600 hover:underline">WhatsApp</a> or <a href="https://t.me/MigelPaySupport" className="text-blue-600 hover:underline">Telegram</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </main>

            </div>
        </DefaultLayout>
    );
}