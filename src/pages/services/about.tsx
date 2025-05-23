import { useEffect, useState } from 'react';
import { contactInfo } from '@/shared/utils/info';
import DefaultLayout from '@/layout/DefaultLayout';
import { aboutContent } from '@/shared/constants/translations/about';

export default function About() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const lang = localStorage.getItem('migelpay-lang') as 'en' | 'ar' || 'en';
    setLanguage(lang);
  }, []);

  const t = aboutContent[language];

  return (
    <DefaultLayout>
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6 sm:p-8 text-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.title}</h1>

            <div className="prose prose-blue max-w-none">
              <p className="text-lg">{t.intro}</p>

              <h2 className="text-xl font-semibold mt-6">{t.missionTitle}</h2>
              <p>{t.mission}</p>

              <h2 className="text-xl font-semibold mt-6">{t.whatWeDoTitle}</h2>
              <ul className="list-disc pl-5 space-y-1">
                {t.whatWeDo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold mt-6">{t.teamTitle}</h2>
              <p>{t.teamDesc}</p>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800">{t.contactHeader}</h3>
                <p className="text-blue-600 mt-1">{t.contactText}</p>
                <div className="flex flex-col space-y-2 w-full">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                  >
                    {t.whatsapp}
                  </a>
                  <a
                    href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                  >
                    {t.telegram}
                  </a>
                  <a
                    href={`https://${contactInfo.telegramChannelInvitationCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                  >
                    {t.channel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
}
