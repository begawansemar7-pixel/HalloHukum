import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HumiWidget from './components/HumiWidget';
import VideoConsultationModal from './components/VideoConsultationModal';
import BottomCarousel from './components/BottomCarousel';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceOnboardingPage from './pages/ServiceOnboardingPage';
import GetStartedPage from './pages/GetStartedPage';
import ServiceOptionDetailPage from './pages/ServiceOptionDetailPage';
import BlogPostPage from './pages/BlogPostPage';

const staticRoutes: { [key: string]: React.FC } = {
  // HomePage is handled separately
  '/tentang-kami': AboutPage,
  '/layanan': ServicesPage,
  '/harga': PricingPage,
  '/blog': BlogPage,
  '/faq': FaqPage,
  '/kontak': ContactPage,
  '/syarat-ketentuan': TermsPage,
  '/kebijakan-privasi': PrivacyPage,
  '/mulai': GetStartedPage,
};

const App: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({ path: '/', params: {} as Record<string, string> });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1).split('?')[0] || '/';
      
      // Prioritize static routes
      if (staticRoutes[hash]) {
        setCurrentRoute({ path: hash, params: {} });
        window.scrollTo(0, 0);
        return;
      }
      
      // Handle dynamic routes if no static route matches
      const serviceOptionDetailRegex = /^\/layanan\/(.+?)\/(.+)$/;
      const blogPostRegex = /^\/blog\/(.+)$/;
      const serviceDetailRegex = /^\/layanan\/(.+)$/;
      const serviceOnboardingRegex = /^\/mulai-layanan\/(.+)$/;

      const serviceOptionDetailMatch = hash.match(serviceOptionDetailRegex);
      const blogPostMatch = hash.match(blogPostRegex);
      const serviceDetailMatch = hash.match(serviceDetailRegex);
      const serviceOnboardingMatch = hash.match(serviceOnboardingRegex);

      if (serviceOptionDetailMatch && serviceOptionDetailMatch[1] && serviceOptionDetailMatch[2]) {
        setCurrentRoute({ path: '/layanan/:slug/:optionSlug', params: { slug: serviceOptionDetailMatch[1], optionSlug: serviceOptionDetailMatch[2] } });
      } else if (blogPostMatch && blogPostMatch[1]) {
        setCurrentRoute({ path: '/blog/:slug', params: { slug: blogPostMatch[1] } });
      } else if (serviceDetailMatch && serviceDetailMatch[1]) {
        setCurrentRoute({ path: '/layanan/:slug', params: { slug: serviceDetailMatch[1] } });
      } else if (serviceOnboardingMatch && serviceOnboardingMatch[1]) {
        setCurrentRoute({ path: '/mulai-layanan/:slug', params: { slug: serviceOnboardingMatch[1] } });
      } else {
        setCurrentRoute({ path: hash, params: {} });
      }
      window.scrollTo(0, 0);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    const scheduleCall = () => setIsVideoModalOpen(true);
    window.addEventListener('scheduleVideoCall', scheduleCall);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scheduleVideoCall', scheduleCall);
    };
  }, []);

  const renderPage = () => {
    // Check static routes first
    const PageComponent = staticRoutes[currentRoute.path];
    if (PageComponent) {
        return <PageComponent />;
    }

    // Then dynamic routes
    if (currentRoute.path === '/layanan/:slug/:optionSlug') {
      return <ServiceOptionDetailPage serviceSlug={currentRoute.params.slug} optionSlug={currentRoute.params.optionSlug} />;
    }

    if (currentRoute.path === '/blog/:slug') {
      return <BlogPostPage slug={currentRoute.params.slug} />;
    }

    if (currentRoute.path === '/layanan/:slug') {
      return <ServiceDetailPage slug={currentRoute.params.slug} />;
    }
    
    if (currentRoute.path === '/mulai-layanan/:slug') {
      return <ServiceOnboardingPage slug={currentRoute.params.slug} />;
    }

    if (currentRoute.path === '/') {
      return <HomePage onScheduleVideoCall={() => setIsVideoModalOpen(true)} />;
    }

    // Fallback to home page for any route not found
    return <HomePage onScheduleVideoCall={() => setIsVideoModalOpen(true)} />;
  };

  return (
    <div className="bg-brand-light font-sans text-brand-dark min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <BottomCarousel />
      <Footer />
      <HumiWidget onScheduleVideoCall={() => setIsVideoModalOpen(true)} />
      <VideoConsultationModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
};

export default App;