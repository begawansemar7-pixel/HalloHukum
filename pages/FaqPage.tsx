import React, { useState } from 'react';
import Icon from '../components/Icon';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-brand-dark"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <Icon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </Icon>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600 pr-8">{answer}</p>
      </div>
    </div>
  );
};

const FaqPage: React.FC = () => {
    const faqs = [
        {
          question: "Apa saja layanan utama yang ditawarkan HalloHukum?",
          answer: "HalloHukum menyediakan layanan legalitas usaha (pendirian PT, CV, UMKM), pembuatan berbagai jenis kontrak bisnis, bantuan hukum untuk sengketa, dan layanan Legal Advisor On-Demand untuk konsultasi langsung dengan ahli hukum."
        },
        {
          question: "Siapa target utama pengguna HalloHukum?",
          answer: "Layanan kami dirancang khusus untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia yang membutuhkan solusi hukum yang mudah, terjangkau, dan terpercaya untuk mendukung pertumbuhan bisnis mereka."
        },
        {
          question: "Bagaimana proses pendirian PT melalui HalloHukum?",
          answer: "Prosesnya sangat mudah. Anda hanya perlu mengisi formulir online, mengunggah dokumen yang diperlukan, dan tim kami akan menangani semua proses birokrasi dari awal hingga akhir. Kami akan terus memberikan update hingga badan usaha Anda resmi terdaftar."
        },
        {
          question: "Apakah konsultasi dengan HUMI AI berbayar?",
          answer: "Tidak. Konsultasi awal dengan AI Legal Agent kami, HUMI, adalah gratis. HUMI dapat memberikan informasi dan panduan umum mengenai masalah hukum UMKM. Untuk nasihat hukum yang lebih spesifik dan mendalam, kami akan merekomendasikan Anda untuk terhubung dengan konsultan hukum manusia kami."
        },
        {
          question: "Bagaimana cara menjadwalkan konsultasi video dengan konsultan hukum?",
          answer: "Anda dapat memilih layanan 'Legal Advisor On-Demand' dan mengklik tombol 'Jadwalkan Konsultasi Video'. Selanjutnya, Anda bisa memilih slot waktu yang tersedia dan akan langsung mendapatkan tautan untuk sesi konsultasi video Anda."
        }
    ];

  return (
    <>
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Temukan jawaban cepat untuk pertanyaan-pertanyaan yang paling sering diajukan mengenai layanan kami.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
      </section>
    </>
  );
};

export default FaqPage;