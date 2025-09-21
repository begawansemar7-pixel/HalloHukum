import React, { useState } from 'react';
import Icon from '../components/Icon';

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, children: string }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{children}</p>
    </div>
);

const EntityCard: React.FC<{ title: string, description: string, features: string[], bestFor: string }> = ({ title, description, features, bestFor }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-brand-dark">{title}</h3>
        <p className="text-slate-500 mt-2 flex-grow">{description}</p>
        <div className="my-6">
            <p className="text-sm font-semibold text-slate-600 mb-2">Cocok untuk:</p>
            <span className="text-sm bg-sky-100 text-sky-800 font-medium px-3 py-1 rounded-full">{bestFor}</span>
        </div>
        <ul className="space-y-3 text-slate-600 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                    <span className="text-sm">{feature}</span>
                </li>
            ))}
        </ul>
        <a href="#/mulai-layanan/legalitas-usaha" className="mt-8 w-full text-center bg-brand-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors hover:bg-slate-700">
            Pilih {title}
        </a>
    </div>
);

const ProcessStep: React.FC<{ number: number, title: string, description: string }> = ({ number, title, description }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <span className="text-lg font-bold text-brand-secondary">{number}</span>
                </div>
            </div>
            <div className="w-px h-full bg-slate-300"></div>
        </div>
        <div className="pb-8">
            <p className="mb-2 text-xl font-bold text-brand-dark">{title}</p>
            <p className="text-slate-600">{description}</p>
        </div>
    </div>
);


const LegalitasUsahaPage: React.FC = () => {
    return (
        <div className="animate-floatIn">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                        Wujudkan Legalitas Usaha Anda dengan Mudah
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                        Dari PT, CV, hingga PT Perorangan, kami menyederhanakan seluruh proses birokrasi agar Anda bisa fokus mengembangkan bisnis dengan fondasi hukum yang kuat.
                    </p>
                    <a href="#/mulai-layanan/legalitas-usaha" className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Mulai Proses Sekarang
                    </a>
                </div>
            </section>
            
            {/* Benefits Section */}
            <section className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Mengapa Legalitas Usaha Penting?</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Legalitas bukan hanya soal formalitas, tapi investasi untuk masa depan bisnis Anda.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BenefitCard icon={<Icon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></Icon>} title="Perlindungan Hukum">Amankan aset pribadi Anda dari risiko bisnis dan beroperasi dengan tenang di bawah payung hukum yang jelas.</BenefitCard>
                        <BenefitCard icon={<Icon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="m21.2 15.2 1.3-1.3a2 2 0 0 0-3-3l-1.3 1.3a2 2 0 0 0 3 3Z"></path></Icon>} title="Kredibilitas Profesional">Tingkatkan kepercayaan pelanggan, investor, dan mitra bisnis dengan status badan usaha yang resmi dan terdaftar.</BenefitCard>
                        <BenefitCard icon={<Icon><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></Icon>} title="Akses Permodalan">Buka peluang untuk mendapatkan pinjaman bank, pendanaan dari investor, dan mengikuti tender pemerintah.</BenefitCard>
                    </div>
                </div>
            </section>

            {/* Entity Types Section */}
            <section className="py-20 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Pilih Badan Usaha yang Tepat</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Setiap jenis badan usaha memiliki kelebihan dan peruntukannya masing-masing. Kami bantu Anda memilih yang terbaik.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
                        <EntityCard 
                            title="PT Perorangan"
                            description="Solusi bagi pengusaha tunggal yang ingin menikmati keuntungan status badan hukum PT dengan syarat yang lebih mudah."
                            bestFor="Usaha Mikro & Kecil"
                            features={["Didirikan oleh 1 orang", "Pemisahan harta pribadi & perusahaan", "Status badan hukum", "Tidak ada modal minimal"]}
                        />
                        <div className="relative transform lg:scale-105">
                             <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-secondary text-white">Paling Populer</span>
                            </div>
                            <EntityCard 
                                title="Perseroan Terbatas (PT)"
                                description="Bentuk badan usaha paling kredibel, ideal untuk bisnis yang berencana untuk tumbuh besar dan menarik investor."
                                bestFor="Startup & Bisnis Berkembang"
                                features={["Didirikan oleh min. 2 orang", "Tanggung jawab terbatas pada modal", "Fleksibilitas kepemilikan saham", "Akses lebih mudah ke pendanaan"]}
                            />
                        </div>
                        <EntityCard 
                            title="Commanditaire V. (CV)"
                            description="Pilihan populer untuk usaha bersama dengan proses pendirian yang lebih sederhana dan biaya lebih rendah dibandingkan PT."
                            bestFor="Usaha bersama skala kecil-menengah"
                            features={["Didirikan oleh min. 2 orang", "Ada sekutu aktif & pasif", "Proses pendirian lebih mudah", "Tidak ada modal minimal yang ditentukan"]}
                        />
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Proses Cepat & Transparan</h2>
                            <p className="text-slate-600 text-lg mb-8">Kami memangkas kerumitan birokrasi menjadi empat langkah sederhana. Anda akan selalu tahu progres pengurusan legalitas Anda.</p>
                            <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800" alt="Proses legalitas usaha" className="rounded-2xl shadow-xl w-full h-auto" />
                        </div>
                        <div>
                            <ProcessStep number={1} title="Konsultasi & Pengumpulan Data" description="Anda mengisi formulir online dan mengunggah dokumen yang diperlukan. Tim kami akan memverifikasi dan memberikan konsultasi awal."/>
                            <ProcessStep number={2} title="Proses Akta Notaris" description="Kami bekerja sama dengan notaris terpercaya untuk pembuatan draf dan penandatanganan Akta Pendirian Perusahaan."/>
                            <ProcessStep number={3} title="Pengesahan Kemenkumham" description="Akta yang telah ditandatangani akan kami proses untuk mendapatkan pengesahan resmi dari Kementerian Hukum dan HAM."/>
                             <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div>
                                        <div className="flex items-center justify-center w-10 h-10 border-2 border-green-500 rounded-full bg-green-100">
                                            <Icon className="w-6 h-6 text-green-600"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p className="mb-2 text-xl font-bold text-brand-dark">Penerbitan Izin & Dokumen Legal</p>
                                    <p className="text-slate-600">Setelah disahkan, kami akan mengurus NIB (Nomor Induk Berusaha) dan izin lainnya. Semua dokumen legal akan kami serahkan kepada Anda.</p>
                                </div>
                            </div>
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

export default LegalitasUsahaPage;
