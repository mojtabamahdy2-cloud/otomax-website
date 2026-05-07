import { useTranslations } from 'next-intl';
import React from 'react';

const TermsAndConditions = () => {
  const t = useTranslations("Terms");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800 font-sans">
      <div className="border-b border-violet-500 pb-6 mb-8 text-start">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t("title")}</h1>
        <p className="text-sm text-slate-500 mt-2">{t("updated")}</p>
      </div>

      <section className="space-y-8 text-start">
        <p className="leading-relaxed">
          {t("intro")}
        </p>

        {t.raw("sections").map((section: any, idx: number) => (
          <div key={idx}>
            <h2 className="text-xl font-bold text-violet-600 mb-3 border-l-4 border-violet-600 pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
              {section.title}
            </h2>
            <p className="leading-relaxed text-slate-700 mb-4">
              {section.content}
            </p>
            {section.items && (
              <ul className="list-disc ml-6 rtl:ml-0 rtl:mr-6 space-y-2 text-slate-700">
                {section.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mt-10 shadow-sm text-start">
          <h3 className="font-bold text-slate-900 mb-2">{t("contact.title")}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t("contact.desc")}
          </p>
          <p className="text-violet-600 font-bold mt-2">info@otomax.tech</p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;

