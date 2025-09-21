import React from 'react';
import { servicesData } from '../data/servicesData';
import Icon from '../components/Icon';

interface ServiceOptionDetailPageProps {
  serviceSlug: string;
  optionSlug: string;
}

const ServiceOptionDetailPage: React.FC<ServiceOptionDetailPageProps> = ({ serviceSlug, optionSlug }) => {
  const service = servicesData.find(s => s.slug === serviceSlug);
  const option = service?.serviceOptions.find(o => o.slug === optionSlug);

  if (!service || !option) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Detail Layanan Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, informasi yang Anda cari tidak ada.</p>
        <a href={`#/layanan/${serviceSlug}`} className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</a>
      </div>
    );
  }

  const { detailedContent } = option;

  return (
    <div className="animate-floatIn">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <a href={`#/layanan/${serviceSlug}`} className="text-sm font-semibold text-brand-secondary hover:underline">
                        &larr; Kembali ke {service.title}
                    </a>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                    {option.title}
                </h1>
                <p className="mt-6 text-lg text-slate-600">
                    {detailedContent.longDescription}
                </p>
                <a href={`#/mulai-layanan/${service.slug}`} className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Mulai Proses {option.title}
                </a>
            </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Use Cases */}
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Ideal Untuk Kebutuhan Berikut:</h2>
                    <div className="space-y-4">
                        {detailedContent.useCases.map((useCase, index) => (
                            <div key={index} className="bg-white p-5 rounded-lg border border-slate-200 flex items-start">
                                <Icon className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                                <div>
                                    <h4 className="font-semibold text-brand-dark">{useCase.title}</h4>
                                    <p className="text-sm text-slate-500">{useCase.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements */}
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Persyaratan yang Diperlukan:</h2>
                    <div className="bg-white p-6 rounded-lg border border-slate-200">
                        <ul className="space-y-3">
                            {detailedContent.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                    <Icon className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0 mt-1">
                                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                    </Icon>
                                    <span className="text-slate-600">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <style>{`
        @keyframes floatIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-floatIn { animation: floatIn 0.7s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ServiceOptionDetailPage;
