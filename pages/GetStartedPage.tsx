import React from 'react';
import Icon from '../components/Icon';
import { servicesData } from '../data/servicesData';
import type { Service } from '../data/servicesData';

const ServiceChoiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const link = `#/layanan/${service.slug}`;
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
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col text-left h-full group transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 cursor-pointer"
      aria-label={`Pelajari lebih lanjut tentang ${service.title}`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 group-hover:bg-brand-secondary/20 transition-colors">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
        <p className="text-slate-500 flex-grow mb-6">{service.shortDescription}</p>
        <div className="mt-auto">
          <span className="font-semibold text-brand-secondary group-hover:underline">
            Lihat Detail Layanan &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};


const GetStartedPage: React.FC = () => {
  const openHumiChat = () => {
    window.dispatchEvent(new CustomEvent('openHumiChat'));
  };

  return (
    <div className="animate-floatIn">
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
            Siap Memulai Perjalanan Legal Anda?
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Pilih layanan yang paling sesuai dengan kebutuhan bisnis Anda saat ini untuk memulai. Tim kami siap membantu Anda di setiap langkah.
          </p>
        </div>
      </section>
      
      <section className="pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {servicesData.map((service) => (
              <ServiceChoiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center bg-slate-100 p-8 sm:p-12 rounded-2xl border border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">Masih Bingung Harus Mulai dari Mana?</h2>
                <p className="mt-4 text-slate-600 max-w-xl mx-auto">
                    Jangan khawatir, kami siap membantu Anda. Dapatkan informasi cepat dari AI Legal Agent kami atau hubungi tim kami untuk diskusi lebih lanjut.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={openHumiChat}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-secondary text-white hover:bg-sky-400 transition-all"
                    >
                         <Icon className="w-5 h-5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                         </Icon>
                        Tanya HUMI
                    </button>
                    <a href="#/kontak" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-brand-dark text-white hover:bg-slate-700 transition-all">
                        Hubungi Kami
                    </a>
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

export default GetStartedPage;