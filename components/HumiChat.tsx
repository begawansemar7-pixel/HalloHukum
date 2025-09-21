import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getHumiResponse } from '../services/geminiService';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import Icon from './Icon';

interface HumiChatProps {
  onClose: () => void;
  onScheduleVideoCall: () => void;
}

const HumiChat: React.FC<HumiChatProps> = ({ onClose, onScheduleVideoCall }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      text: "Selamat datang di HalloHukum! Saya HUMI, AI Legal Agent Anda. Saya siap membantu memberikan informasi awal untuk berbagai kebutuhan hukum UMKM Anda.\n\nSecara spesifik, saya bisa membantu dengan:\n\n• **Legalitas Usaha:** Informasi mengenai proses pendirian PT, CV, dan badan usaha lainnya. Anda bisa bertanya, misalnya, 'Apa saja syarat membuat PT untuk UMKM?'.\n\n• **Pembuatan Kontrak:** Panduan mengenai poin-poin penting yang harus ada dalam kontrak, seperti perjanjian kerjasama atau kontrak kerja. Contoh pertanyaan: 'Sebutkan 5 klausa penting dalam kontrak sewa tempat usaha'.\n\n• **Kekayaan Intelektual:** Panduan awal tentang pendaftaran merek dagang dan perlindungan hak cipta. Contoh: 'Jelaskan proses pendaftaran merek untuk UMKM.' atau 'Apakah logo saya perlu dilindungi hak cipta?'.\n\n• **Konsultasi Umum:** Jawaban untuk pertanyaan umum seputar hukum bisnis yang sering dihadapi UMKM.\n\nAyo, jangan ragu bertanya. Tuliskan pertanyaan Anda di bawah ini untuk memulai!", 
      sender: 'ai' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (transcript) {
        setInputValue(transcript);
    }
  }, [transcript]);


  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      text: trimmedInput,
      sender: 'user',
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    try {
      const aiResponseText = await getHumiResponse(trimmedInput, history);
      const newAiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
       const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVoiceButtonClick = () => {
      if (isListening) {
          stopListening();
          handleSendMessage();
      } else {
          startListening();
      }
  };

  return (
    <div className="w-[calc(100vw-2rem)] sm:w-96 h-[70vh] max-h-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col border border-slate-200">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl sm:rounded-t-2xl">
        <div>
          <h2 className="font-bold text-lg text-brand-dark">HUMI - AI Legal Agent</h2>
          <p className="text-xs text-green-600 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>Online</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-brand-dark" aria-label="Tutup obrolan">
          <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
        </button>
      </header>

      <div role="log" className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-dark text-white rounded-br-lg' : 'bg-slate-100 text-brand-dark rounded-bl-lg'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {/* CTA Button */}
        {messages.length === 1 && messages[0].sender === 'ai' && !isLoading && (
            <div className="pt-2">
                <button
                    onClick={() => {
                        onScheduleVideoCall();
                        onClose(); // Close chat widget after clicking CTA
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:bg-sky-400 transition-colors shadow-sm"
                >
                    <Icon className="w-5 h-5"><path d="M15.5 3H8.5a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 12h20M2 7h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path></Icon>
                    Jadwalkan Konsultasi Gratis
                </button>
            </div>
        )}
        {isLoading && (
           <div className="flex justify-start">
             <div className="max-w-[80%] p-3 rounded-2xl bg-slate-100 text-brand-dark rounded-bl-lg flex items-center space-x-2">
                <span className="h-2 w-2 bg-brand-dark rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-brand-dark rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-brand-dark rounded-full animate-bounce"></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <label htmlFor="chat-input" className="sr-only">Ketik pertanyaan Anda</label>
          <input
            type="text"
            id="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isListening ? "Mendengarkan..." : "Ketik pertanyaan Anda..."}
            className="w-full bg-slate-100 border-transparent rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
            disabled={isLoading}
          />
           {hasRecognitionSupport && (
            <button type="button" onClick={handleVoiceButtonClick} aria-label={isListening ? "Berhenti merekam suara" : "Gunakan input suara"} className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-brand-secondary text-white'}`}>
                <Icon className="w-5 h-5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></Icon>
            </button>
           )}
          <button type="submit" aria-label="Kirim pesan" className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center" disabled={isLoading || !inputValue}>
             <Icon className="w-5 h-5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></Icon>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default HumiChat;