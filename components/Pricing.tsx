
import React from 'react';
import Icon from './Icon';

const PricingCard: React.FC<{ plan: string; price: string; description: string; features: string[]; popular?: boolean }> = ({ plan, price, description, features, popular = false }) => {
  const popularClasses = popular
    ? 'border-brand-secondary ring-2 ring-brand-secondary'
    : 'border-slate-200';
  const buttonClasses = popular
    ? 'bg-brand-secondary text-white hover:bg-sky-400'
    : 'bg-brand-dark text-white hover:bg-slate-700';
  return (
    <div className={`rounded-2xl p-8 bg-white border ${popularClasses} flex flex-col`}>
      {popular && <span className="absolute top-0 -translate-y-1/2 bg-brand-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">Paling Populer</span>}
      <h3 className="text-2xl font-bold text-brand-dark">{plan}</h3>
      <p className="text-slate-500 mt-2">{description}</p>
      <div className="mt-6">
        <span className="text-4xl font-extrabold text-brand-dark">{price}</span>
        {plan !== 'Free' && <span className="text-slate-500"> / bulan</span>}
      </div>
      <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Icon className="w-5 h-5 text-green-500 mr-2"><polyline points="20 6 9 17 4 12"></polyline></Icon>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full mt-10 rounded-lg text-sm font-semibold py-3 px-4 transition-colors ${buttonClasses}`}>
        Pilih Paket
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="harga" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Paket Layanan yang Fleksibel</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Pilih paket yang paling sesuai dengan skala dan kebutuhan bisnis Anda saat ini.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          <PricingCard
            plan="Basic"
            price="Rp 499k"
            description="Untuk UMKM yang baru mulai dan butuh legalitas dasar."
            features={['Pendirian Badan Usaha (UMKM)', 'Konsultasi Legal via Chat (5 Sesi)', 'Template Dokumen Dasar', 'Edukasi Hukum via Newsletter']}
          />
          <div className="relative">
            <PricingCard
              plan="Pro"
              price="Rp 1.2M"
              description="Untuk bisnis yang berkembang dan butuh dukungan legal berkelanjutan."
              features={['Semua di paket Basic', 'Pendirian Badan Usaha (PT/CV)', 'Konsultasi Legal Tanpa Batas', 'Review Dokumen & Kontrak (3/bulan)', 'Pendampingan Legal Advisor']}
              popular={true}
            />
          </div>
          <PricingCard
            plan="Enterprise"
            price="Custom"
            description="Solusi legal komprehensif untuk skala bisnis yang lebih besar."
            features={['Semua di paket Pro', 'Legal Retainer Bulanan', 'Manajemen Kekayaan Intelektual', 'Dukungan Sengketa Bisnis', 'Prioritas Layanan Tertinggi']}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
