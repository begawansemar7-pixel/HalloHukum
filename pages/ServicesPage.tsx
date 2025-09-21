import React from 'react';
import Icon from '../components/Icon';
import { servicesData } from '../data/servicesData';

const ServiceDetailCard = ({ icon, title, description, features, slug }: { icon: React.ReactNode; title: string; description: string; features: string[], slug: string }) => {
    const link = `#/layanan/${slug}`;
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
        aria-label={`Lihat detail untuk ${title}`}
        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 cursor-pointer"
    >
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary/20 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-brand-dark">{title}</h3>
        </div>
        <p className="text-slate-500 mb-6">{description}</p>
        <ul className="space-y-3 mb-6 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                    <span className="text-slate-600">{feature}</span>
                </li>
            ))}
        </ul>
        
        {/* Floating overlay with "Enter" button */}
        <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
            <div className="text-center p-4">
                <h4 className="text-white font-bold text-2xl">{title}</h4>
                <div className="mt-4 bg-brand-accent text-brand-dark font-semibold py-3 px-8 rounded-lg text-lg">
                    Lihat Detail
                </div>
            </div>
        </div>
    </div>
)};

const ServicesPage: React.FC = () => {
    return (
        <>
            <section className="py-20 sm:py-28 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                        Layanan Kami
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                        Kami menyediakan solusi hukum yang komprehensif, dirancang khusus untuk mendukung setiap tahap pertumbuhan bisnis UMKM Anda.
                    </p>
                </div>
            </section>
            <section className="py-20 sm:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {servicesData.map((service, index) => (
                            <ServiceDetailCard 
                                key={index} 
                                icon={service.icon}
                                title={service.title}
                                description={service.shortDescription}
                                features={service.features.slice(0, 4)} // Show first 4 features for brevity
                                slug={service.slug}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServicesPage;