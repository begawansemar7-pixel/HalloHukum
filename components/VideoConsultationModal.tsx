import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface VideoConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoConsultationModal: React.FC<VideoConsultationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'scheduling' | 'confirmed'>('scheduling');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const meetingLink = "https://meet.google.com/new"; // Placeholder link

  const timeSlots = [
    '09:00 - 09:30',
    '10:00 - 10:30',
    '11:00 - 11:30',
    '14:00 - 14:30',
    '15:00 - 15:30',
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setTimeout(() => {
        setStep('scheduling');
        setSelectedTime(null);
        setIsCopied(false);
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md m-4 rounded-2xl shadow-xl transform transition-all duration-300 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-brand-dark transition-colors" aria-label="Close modal">
          <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
        </button>

        {step === 'scheduling' && (
          <div className="p-8">
            <h2 id="modal-title" className="text-2xl font-bold text-brand-dark mb-2">Jadwalkan Konsultasi Video</h2>
            <p className="text-slate-500 mb-6">Pilih slot waktu yang tersedia untuk berbicara langsung dengan konsultan hukum kami.</p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  aria-pressed={selectedTime === time}
                  className={`p-3 rounded-lg text-sm font-semibold border-2 transition-all ${selectedTime === time ? 'bg-brand-secondary border-brand-secondary text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-brand-secondary'}`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('confirmed')}
              disabled={!selectedTime}
              className="w-full bg-brand-dark text-white font-semibold py-3 rounded-lg transition-colors hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Konfirmasi Jadwal
            </button>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Icon className="w-8 h-8 text-green-600"><polyline points="20 6 9 17 4 12"></polyline></Icon>
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Jadwal Terkonfirmasi!</h2>
            <p className="text-slate-500 mb-6">
              Konsultasi video Anda telah dijadwalkan pada pukul <span className="font-semibold text-brand-dark">{selectedTime}</span>. Tautan untuk bergabung telah dibuat.
            </p>
            
            <div className="flex flex-col gap-3">
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-secondary text-white font-semibold py-3 rounded-lg transition-colors hover:bg-sky-400 shadow-sm"
              >
                <Icon className="w-5 h-5"><path d="m15 12-4 4-2-2"></path><path d="M13.5 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5Z"></path><path d="M14 2v6h6"></path></Icon>
                Gabung Sekarang
              </a>
              <button
                  onClick={handleCopyLink}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-3 rounded-lg transition-colors hover:bg-slate-200"
                >
                   <Icon className="w-5 h-5">
                       <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                       <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                   </Icon>
                  {isCopied ? 'Tautan Tersalin!' : 'Salin Tautan'}
                </button>
            </div>
            
            <button onClick={onClose} className="w-full mt-4 text-slate-600 font-semibold py-2 rounded-lg hover:bg-slate-100 transition-colors">
              Tutup
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default VideoConsultationModal;