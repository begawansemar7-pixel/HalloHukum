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

const IPCard: React.FC<{ title: string, description: string, features: string[], bestFor: string }> = ({ title, description, features, bestFor }) => (
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
        <a href="#/mulai-layanan/kekayaan-intelektual" className="mt-8 w-full text-center bg-brand-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors hover:bg-slate-700">
            Daftarkan {title}
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


const KekayaanIntelektualPage: React.FC = () => {
    return (
        <div className="animate-floatIn">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                        Lindungi Aset Kreatif Bisnis Anda
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                        Dari merek dagang, logo, hingga karya orisinal, amankan identitas unik bisnis Anda dari peniruan dan penyalahgunaan.
                    </p>
                    <a href="#/mulai-layanan/kekayaan-intelektual" className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Amankan Aset Saya Sekarang
                    </a>
                </div>
            </section>
            
            {/* Benefits Section */}
            <section className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Aset Tak Terlihat, Bernilai Nyata</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Perlindungan Kekayaan Intelektual (KI) adalah fondasi untuk membangun brand yang kuat dan berkelanjutan.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BenefitCard icon={<Icon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></Icon>} title="Mencegah Peniruan">Dapatkan hak eksklusif untuk menggunakan merek atau karya Anda, dan cegah pihak lain menjiplak hasil kerja keras Anda.</BenefitCard>
                        <BenefitCard icon={<Icon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="m21.2 15.2 1.3-1.3a2 2 0 0 0-3-3l-1.3 1.3a2 2 0 0 0 3 3Z"></path></Icon>} title="Membangun Identitas Brand">Merek dagang yang terdaftar secara resmi memperkuat identitas dan citra profesional bisnis Anda di mata konsumen.</BenefitCard>
                        <BenefitCard icon={<Icon><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></Icon>} title="Meningkatkan Nilai Aset">Kekayaan intelektual yang terlindungi adalah aset berharga yang dapat dilisensikan atau dijual, meningkatkan valuasi bisnis Anda.</BenefitCard>
                    </div>
                </div>
            </section>

            {/* IP Types Section */}
            <section className="py-20 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Jenis Perlindungan untuk Anda</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Pahami perbedaan antara Merek Dagang dan Hak Cipta untuk memilih perlindungan yang paling tepat.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
                        <div className="relative transform lg:scale-105">
                             <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-secondary text-white">Paling Penting untuk UMKM</span>
                            </div>
                            <IPCard 
                                title="Merek Dagang"
                                description="Melindungi identitas komersial bisnis Anda, seperti nama, logo, atau slogan yang membedakan produk/jasa Anda dari pesaing."
                                bestFor="Semua Jenis Bisnis"
                                features={["Perlindungan 10 tahun (dapat diperpanjang)", "Mencegah pihak lain memakai nama/logo serupa", "Meningkatkan kepercayaan konsumen", "Dasar untuk waralaba (franchise)"]}
                            />
                        </div>
                        <IPCard 
                            title="Hak Cipta"
                            description="Melindungi karya orisinal dalam bidang ilmu pengetahuan, seni, dan sastra. Perlindungan timbul secara otomatis saat karya diciptakan."
                            bestFor="Kreator, Desainer, Penulis, Developer"
                            features={["Perlindungan seumur hidup + 70 tahun", "Hak eksklusif untuk menggandakan & distribusi", "Pencatatan sebagai bukti hukum yang kuat", "Melindungi konten website, buku, lagu, software"]}
                        />
                    </div>
                     <div className="text-center mt-12">
                        <p className="text-slate-600">Butuh perlindungan untuk penemuan/inovasi teknologi? Tanyakan kepada tim kami tentang <strong className="text-brand-dark">Paten</strong>.</p>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Proses Pendaftaran Kami Sederhanakan</h2>
                            <p className="text-slate-600 text-lg mb-8">Fokus pada kreasi Anda, biarkan kami yang mengurus proses pendaftaran yang rumit dari awal hingga akhir.</p>
                            <img src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=800" alt="Proses pendaftaran Kekayaan Intelektual" className="rounded-2xl shadow-xl w-full h-auto" />
                        </div>
                        <div>
                            <ProcessStep number={1} title="Konsultasi & Penelusuran" description="Kami menganalisis kebutuhan Anda dan melakukan penelusuran mendalam untuk memastikan merek Anda unik dan dapat didaftarkan."/>
                            <ProcessStep number={2} title="Persiapan & Pengajuan Dokumen" description="Tim kami membantu menyiapkan semua dokumen dan persyaratan yang diperlukan untuk pengajuan ke Direktorat Jenderal Kekayaan Intelektual (DJKI)."/>
                            <ProcessStep number={3} title="Pengajuan & Monitoring Proses" description="Kami mengajukan permohonan Anda secara resmi dan memonitor seluruh tahapan proses, mulai dari publikasi hingga pemeriksaan substantif."/>
                             <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div>
                                        <div className="flex items-center justify-center w-10 h-10 border-2 border-green-500 rounded-full bg-green-100">
                                            <Icon className="w-6 h-6 text-green-600"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p className="mb-2 text-xl font-bold text-brand-dark">Sertifikat Terbit!</p>
                                    <p className="text-slate-600">Setelah disetujui oleh DJKI, sertifikat resmi akan terbit. Aset intelektual Anda kini terlindungi secara hukum dan kami akan menyerahkan sertifikatnya kepada Anda.</p>
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

export default KekayaanIntelektualPage;