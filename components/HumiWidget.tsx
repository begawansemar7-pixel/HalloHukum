import React, { useState, useEffect } from 'react';
import HumiChat from './HumiChat';
import Icon from './Icon';

interface HumiWidgetProps {
  onScheduleVideoCall: () => void;
}

const HumiWidget: React.FC<HumiWidgetProps> = ({ onScheduleVideoCall }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Add listener for custom event to open the chat
  useEffect(() => {
    const openChat = () => setIsOpen(true);
    
    window.addEventListener('openHumiChat', openChat);

    return () => {
      window.removeEventListener('openHumiChat', openChat);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount


  return (
    <>
      <div className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-dark text-white rounded-full p-4 shadow-xl hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-secondary/50 transform hover:scale-105 transition-all"
          aria-label="Open HUMI AI Chat"
        >
           <Icon className="w-8 h-8">
            <path d="M12 20.94c1.5 0 2.75 1.25 2.75 2.75S13.5 26.44 12 26.44 9.25 25.19 9.25 23.69s1.25-2.75 2.75-2.75zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" clipRule="evenodd" fill="currentColor"/>
          </Icon>
        </button>
      </div>
      <div className={`fixed bottom-0 right-0 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
        {isOpen && <HumiChat onClose={() => setIsOpen(false)} onScheduleVideoCall={onScheduleVideoCall} />}
      </div>
    </>
  );
};

export default HumiWidget;