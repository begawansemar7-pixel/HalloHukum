import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const heroSlides = [
  {
    serviceName: 'Legalitas Usaha',
    description: 'Pendirian PT, CV, hingga pengurusan NIB dengan proses cepat dan transparan.',
    icon: <Icon className="w-8 h-8 text-brand-accent"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></Icon>,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop',
  },
  {
    serviceName: 'Pembuatan Kontrak',
    description: 'Lindungi bisnis Anda dengan kontrak kerja, sewa, dan kerjasama yang kuat dan sah.',
    icon: <Icon className="w-8 h-8 text-brand-accent"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5l-5 5c-.3.3-.5.7-.5 1.1v10.8c0 .8.7 1.5 1.5 1.5h12.9c.8 0 1.5-.7 1.5-1.5V3.5c0-.8-.7-1.5-1.5-1.5z"></path><path d="M12.5 2v4.5h4.5"></path><path d="m8.5 14 2 2 4-4"></path></Icon>,
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1920&auto=format&fit=crop',
  },
  {
    serviceName: 'Konsultasi Hukum',
    description: 'Dapatkan nasihat ahli dari konsultan hukum berpengalaman kapan pun Anda membutuhkannya.',
    icon: <Icon className="w-8 h-8 text-brand-accent"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></Icon>,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920&auto=format&fit=crop',
  },
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section className="relative pt-28 pb-36 sm:pt-36 sm:pb-48 text-white overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${heroSlides.length * 100}%` }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.image}
              className="w-full h-full bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-dark/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-shadow-md">
          Solusi Legal Terpercaya untuk <span className="text-brand-accent">UMKM Indonesia</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-200 text-shadow">
          Akses mudah, cepat, dan terjangkau untuk semua kebutuhan legalitas bisnis Anda. Dari pendirian usaha hingga konsultasi hukum, HalloHukum siap mendampingi.
        </p>

        {/* Dynamic Service Highlight */}
        <div className="mt-12 max-w-3xl mx-auto overflow-hidden rounded-2xl border border-white/20 shadow-lg">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 bg-white/10 backdrop-blur-md p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4">
                  <div className="flex-shrink-0">{slide.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{slide.serviceName}</h3>
                    <p className="text-slate-200 text-sm mt-1">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#/mulai" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Mulai Layanan Kami
          </a>
          <a href="#/layanan" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-white/10 text-white hover:bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-all">
            Pelajari Layanan
          </a>
        </div>
      </div>
      
       {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, slideIndex) => (
            <button 
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${slideIndex + 1}`}
            />
        ))}
      </div>
      
       <style>{`
        .text-shadow { text-shadow: 0 1px 3px rgba(0,0,0,0.4); }
        .text-shadow-md { text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
      `}</style>
    </section>
  );
};

export default Hero;