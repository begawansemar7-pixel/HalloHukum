import React from 'react';
import Icon from './Icon';
import { servicesData } from '../data/servicesData';
import type { Service } from '../data/servicesData';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
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
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col text-left h-full w-full group relative focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 overflow-hidden cursor-pointer"
      aria-label={`Pelajari lebih lanjut tentang ${service.title}`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 group-hover:bg-brand-secondary/20 transition-colors">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
        <p className="text-slate-500 flex-grow">{service.shortDescription}</p>
      </div>

      {/* Floating overlay with "Enter" button */}
      <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
        <div className="text-center p-4">
            <h4 className="text-white font-bold text-xl">{service.title}</h4>
            <div className="mt-4 bg-brand-accent text-brand-dark font-semibold py-2 px-6 rounded-lg">
                Lihat Detail
            </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Layanan Hukum Terintegrasi</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Satu platform untuk semua kebutuhan legalitas UMKM Anda, dari awal hingga berkembang.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;