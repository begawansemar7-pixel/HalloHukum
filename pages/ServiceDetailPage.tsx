import React from 'react';
import { servicesData } from '../data/servicesData';
import { relatedContentData } from '../data/relatedContentData';
import Icon from '../components/Icon';
import HumiPrompt from '../components/HumiPrompt';
import type { Benefit, ServiceOption } from '../types';

// --- Sub-components for this page ---

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, children: string }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{children}</p>
    </div>
);

const ServiceOptionCard: React.FC<{ option: ServiceOption, serviceSlug: string }> = ({ option, serviceSlug }) => {
    const link = `#/layanan/${serviceSlug}/${option.slug}`;
    const navigate = () => window.location.hash = link;
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate();
        }
    };
    
    return (
    <div 
       onClick={navigate}
       onKeyDown={handleKeyDown}
       role="link"
       tabIndex={0}
       aria-label={`Lihat detail untuk ${option.title}`}
       className={`bg-white rounded-2xl shadow-lg border ${option.isPopular ? 'border-brand-secondary ring-2 ring-brand-secondary' : 'border-slate-200'} p-8 flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}>
        <h3 className="text-2xl font-bold text-brand-dark">{option.title}</h3>
        <p className="text-slate-500 mt-2 flex-grow">{option.description}</p>
        <div className="my-6">
            <p className="text-sm font-semibold text-slate-600 mb-2">Cocok untuk:</p>
            <span className="text-sm bg-sky-100 text-sky-800 font-medium px-3 py-1 rounded-full">{option.bestFor}</span>
        </div>
        <ul className="space-y-3 text-slate-600 flex-grow">
            {option.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                    <span className="text-sm">{feature}</span>
                </li>
            ))}
        </ul>
        <div className="mt-8 text-center">
            <span className="font-semibold text-brand-secondary group-hover:underline">
                Lihat Detail &rarr;
            </span>
        </div>
    </div>
)};

const ProcessStep: React.FC<{ number: number, title: string, description: string, isLast?: boolean }> = ({ number, title, description, isLast = false }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <span className="text-lg font-bold text-brand-secondary">{number}</span>
                </div>
            </div>
            {!isLast && <div className="w-px h-full bg-slate-300"></div>}
        </div>
        <div className={isLast ? '' : 'pb-8'}>
            <p className="mb-2 text-xl font-bold text-brand-dark">{title}</p>
            <p className="text-slate-600">{description}</p>
        </div>
    </div>
);


// --- Main Page Component ---

interface ServiceDetailPageProps {
  slug: string;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const service = servicesData.find(s => s.slug === slug);
  const relatedItems = relatedContentData[slug] || [];

  if (!service) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Layanan Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, layanan yang Anda cari tidak ada.</p>
        <a href="#/layanan" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</a>
      </div>
    );
  }

  return (
    <div className="animate-floatIn">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 flex items-center justify-center">
                {/* FIX: Cast service.icon to a more specific type to satisfy React.cloneElement's type requirements. */}
                {React.cloneElement(service.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: "w-10 h-10" })}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                {service.title}
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                {service.heroSubtitle}
            </p>
            <a href={`#/mulai-layanan/${service.slug}`} className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Mulai Proses Sekarang
            </a>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">{service.benefitsTitle}</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{service.benefitsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.benefits.map((benefit, index) => (
                    <BenefitCard key={index} icon={benefit.icon} title={benefit.title}>
                        {benefit.description}
                    </BenefitCard>
                ))}
            </div>
        </div>
      </section>

      {/* Service Options Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">{service.serviceOptionsTitle}</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{service.serviceOptionsSubtitle}</p>
            </div>
            <div className={`grid grid-cols-1 lg:grid-cols-${service.serviceOptions.length > 2 ? '3' : '2'} gap-8 max-w-7xl mx-auto items-stretch`}>
                {service.serviceOptions.map((option, index) => (
                    <div key={index} className={`relative ${option.isPopular ? 'transform lg:scale-105 z-10' : ''}`}>
                         {option.isPopular && (
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                               <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-secondary text-white">Paling Populer</span>
                           </div>
                         )}
                        <ServiceOptionCard option={option} serviceSlug={service.slug} />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Proses Cepat & Transparan</h2>
                    <p className="text-slate-600 text-lg mb-8">Kami memangkas kerumitan birokrasi menjadi beberapa langkah sederhana. Anda akan selalu tahu progres pengurusan legalitas Anda.</p>
                    <img src={service.image} alt="Proses layanan" className="rounded-2xl shadow-xl w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
                </div>
                <div>
                    {service.processSteps.map((step, index) => (
                        <ProcessStep 
                            key={index}
                            number={index + 1} 
                            title={step.title} 
                            description={step.description}
                            isLast={index === service.processSteps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
      </section>
      
      {/* Related Content Section */}
      {relatedItems.length > 0 && (
          <section className="py-20 sm:py-24 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-8 text-center">Pelajari Lebih Lanjut</h2>
                  <div className="space-y-4">
                      {relatedItems.map((item, index) => (
                          <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex items-start gap-4 transition-all hover:border-brand-secondary hover:shadow-sm">
                              <div className="flex-shrink-0 mt-1">
                                  {item.type === 'blog' ? (
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                                          <Icon className="w-5 h-5 text-sky-600">
                                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                          </Icon>
                                      </div>
                                  ) : (
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                                          <Icon className="w-5 h-5 text-amber-600">
                                              <circle cx="12" cy="12" r="10"></circle>
                                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                          </Icon>
                                      </div>
                                  )}
                              </div>
                              <div>
                                  <h4 className="font-bold text-brand-dark">{item.title}</h4>
                                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                                  {item.link && (
                                      <a href={item.link} className="text-sm font-semibold text-brand-secondary hover:underline mt-2 inline-block">
                                          Baca Selengkapnya &rarr;
                                      </a>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

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

export default ServiceDetailPage;