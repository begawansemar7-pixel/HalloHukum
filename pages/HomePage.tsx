import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Icon from '../components/Icon';

interface HomePageProps {
  onScheduleVideoCall: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onScheduleVideoCall }) => {
  const openHumiChat = () => {
    window.dispatchEvent(new CustomEvent('openHumiChat'));
  };

  return (
    <>
      <Hero />
      <Services />

      {/* Humi Call to Action Section */}
      <section className="bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Punya Pertanyaan Hukum? <span className="text-brand-secondary">Tanya HUMI</span>
              </h2>
              <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-slate-300">
                AI Legal Agent kami siap 24/7 untuk memberikan informasi awal dan panduan mengenai kebutuhan legalitas bisnis Anda. Cepat, mudah, dan gratis.
              </p>
              <button
                onClick={openHumiChat}
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Mulai Chat dengan HUMI"
              >
                <Icon className="w-5 h-5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </Icon>
                Mulai Chat Sekarang
              </button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                alt="Ilustrasi antarmuka AI Legal Agent" 
                className="rounded-2xl shadow-2xl object-cover max-w-md w-full"
                style={{aspectRatio: '4/3'}}
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Pricing />
    </>
  );
};

export default HomePage;
