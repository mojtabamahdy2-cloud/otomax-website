import React from 'react';

interface SectionProps {
  number: string;
  title: string;
  id: string;
  children: React.ReactNode;
}

export default function PrivacyPolicy() {
  const toc_items = [
    { num: '01', text: 'Information We Collect', id: 's1' },
    { num: '02', text: 'How We Use Your Information', id: 's2' },
    { num: '03', text: 'Legal Basis for Processing', id: 's3' },
    { num: '04', text: 'Data Sharing with Third Parties', id: 's4' },
    { num: '05', text: 'How We Share Your Data', id: 's5' },
    { num: '06', text: 'Third-Party Sub-Processors', id: 's6' },
    { num: '07', text: 'Analytics & Tracking', id: 's7' },
    { num: '08', text: 'Email Communications', id: 's8' },
    { num: '09', text: 'Data Storage & Security', id: 's9' },
    { num: '10', text: 'Data Retention', id: 's10' },
    { num: '11', text: 'Your Rights', id: 's11' },
    { num: '12', text: "Children's Privacy", id: 's12' },
    { num: '13', text: 'Changes to This Policy', id: 's13' },
    { num: '14', text: 'Contact Us', id: 's14' },
  ];

  const dataCategories = [
    { category: 'Contact Information', data: 'Name, email address, phone number, company, job title' },
    { category: 'Inquiry Data', data: 'Details about your project request, scope, timeline, and budget' },
    { category: 'Chat Conversation Data', data: 'Messages, attachments, and conversation history with our AI chat agent' },
    { category: 'Technical Data', data: 'IP address, browser type, device type, operating system, pages visited, timestamps' },
    { category: 'Usage Data', data: 'How you interact with our website and services, session duration, page views' },
    { category: 'Payment Information', data: 'Billing address and transaction history (payment card details are NOT stored by us)' },
  ];

  const legalBasis = [
    { processing: 'Service Delivery', basis: 'Contractual Obligation' },
    { processing: 'Marketing & Lead Nurturing', basis: 'Legitimate Interest' },
    { processing: 'Website Analytics', basis: 'Legitimate Interest' },
    { processing: 'Security & Fraud Prevention', basis: 'Legitimate Interest' },
    { processing: 'Compliance with Laws', basis: 'Legal Obligation' },
  ];

  const subProcessors = [
    { name: 'OpenAI (ChatGPT)', purpose: 'Powers AI chat agent responses', data: 'Chat conversation content', policy: 'openai.com/privacy' },
    { name: 'Google (Gemini)', purpose: 'Powers AI chat agent responses', data: 'Chat conversation content', policy: 'policies.google.com/privacy' },
    { name: 'n8n', purpose: 'Workflow automation', data: 'Contact data, chat data', policy: 'n8n.io/privacy' },
    { name: 'Chatwoot', purpose: 'Customer communication platform', data: 'Chat history, name', policy: 'chatwoot.com/privacy-policy' },
    { name: 'Hostinger VPS', purpose: 'Cloud infrastructure hosting', data: 'All stored client data', policy: 'hostinger.com/privacy-policy' },
    { name: 'Google Analytics', purpose: 'Website usage analytics', data: 'Technical and Usage Data', policy: 'policies.google.com/privacy' },
  ];

  const retentionPeriods = [
    { dataType: 'Contact form submissions', period: '12 months from last interaction' },
    { dataType: 'AI chat conversation logs', period: '12 months from date of conversation' },
    { dataType: 'Client data (active)', period: 'Duration of relationship + 3 years' },
    { dataType: 'Email communications', period: '3 years from last interaction' },
  ];

  return (
    <div className="bg-white text-slate-700 font-sans max-w-4xl mx-auto px-6 py-12">
      <div className="border-b border-violet-500 pb-8 mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Last Updated: May 2026</p>
      </div>

      <div className="bg-violet-50 border border-violet-100 border-l-4 border-l-violet-600 rounded-2xl p-8 mb-16 shadow-sm">
        <h2 className="text-xs font-bold tracking-widest uppercase text-violet-600 mb-6">Contents</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {toc_items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-slate-600 hover:text-violet-600 text-sm transition-colors font-medium">
                <span className="text-violet-300 mr-2">{item.num}.</span> {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <Section number="01" title="Information We Collect" id="s1">
        <p className="leading-relaxed">When you interact with Otomax, we collect the following categories of personal data:</p>
        <Table headers={['Category', 'Examples']} rows={dataCategories.map(i => [i.category, i.data])} />
      </Section>

      <Section number="02" title="How We Use Your Information" id="s2">
        <p className="leading-relaxed">We use the information we collect for the following purposes:</p>
        <ul className="space-y-4 my-6">
          <li className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-violet-600 font-bold">→</span>
            <span><strong className="text-slate-900">Service Delivery:</strong> Responding to inquiries and delivering project proposals.</span>
          </li>
          <li className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-violet-600 font-bold">→</span>
            <span><strong className="text-slate-900">Sales & Marketing:</strong> Following up on leads and sending service announcements.</span>
          </li>
        </ul>
      </Section>

      <Section number="03" title="Legal Basis" id="s3">
        <Table headers={['Type of Processing', 'Legal Basis']} rows={legalBasis.map(i => [i.processing, i.basis])} />
      </Section>

      <Section number="06" title="Third-Party Sub-Processors" id="s6">
        <p className="leading-relaxed">Trusted third-party sub-processors that handle data on our behalf:</p>
        <Table
          headers={['Sub-Processor', 'Purpose', 'Data Shared', 'Privacy Policy']}
          rows={subProcessors.map(i => [i.name, i.purpose, i.data, i.policy])}
        />
      </Section>

      <Section number="09" title="Data Storage & Security" id="s9">
        <p className="leading-relaxed">Your data is stored in a self-hosted PostgreSQL database on a secure VPS provided by Hostinger.</p>
        <Callout type="info">
          <strong>Security:</strong> All data transmission is encrypted via HTTPS/TLS, and access is restricted to authorized personnel.
        </Callout>
      </Section>

      <Section number="10" title="Data Retention" id="s10">
        <Table headers={['Data Type', 'Retention Period']} rows={retentionPeriods.map(i => [i.dataType, i.period])} />
      </Section>

      <Section number="14" title="Contact Us" id="s14">
        <div className="bg-violet-600 text-white rounded-3xl p-8 shadow-xl shadow-violet-100">
          <h3 className="text-xl font-bold mb-4">Questions or Concerns?</h3>
          <p className="opacity-90 mb-6 leading-relaxed">For any inquiries relating to this Privacy Policy or your personal data, please reach out to our team.</p>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">Otomax Digital Solutions</p>
            <a href="mailto:info@otomax.tech" className="text-violet-200 hover:text-white transition-colors font-bold underline underline-offset-4">info@otomax.tech</a>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ number, title, id, children }: SectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-2xl font-black text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-baseline gap-4">
        <span className="text-xs font-bold tracking-widest text-violet-600 uppercase">{number}</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-slate-600">{children}</div>
    </section>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][]; }) {
  return (
    <div className="overflow-x-auto my-8 rounded-2xl border border-slate-100">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            {headers.map((h, i) => (
              <th key={i} className="text-slate-900 font-bold text-xs uppercase tracking-wider text-left px-4 py-4 border-b border-slate-100">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-violet-50/30 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-4 border-b border-slate-50 text-slate-600 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ type, children }: { type: 'warn' | 'info'; children: React.ReactNode; }) {
  return (
    <div className="bg-violet-50 border-l-4 border-violet-600 rounded-r-2xl px-6 py-5 my-8 text-slate-700 leading-relaxed shadow-sm">
      {children}
    </div>
  );
}
