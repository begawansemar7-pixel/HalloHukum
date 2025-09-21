import React from 'react';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <a href="#/" className="flex items-center space-x-2" aria-label="HalloHukum Homepage">
                <div className="bg-white p-2 rounded-lg">
                    <Icon className="text-brand-dark">
                        <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                        <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                        <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                    </Icon>
                </div>
                <span className="text-2xl font-bold text-white">HalloHukum</span>
            </a>
            <p className="mt-4 text-slate-400 text-sm">Memberdayakan UMKM Indonesia dengan solusi hukum yang mudah dan terpercaya.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Layanan</h3>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li><a href="#/layanan" className="hover:text-white">Legalitas Usaha</a></li>
              <li><a href="#/layanan" className="hover:text-white">Bantuan Hukum</a></li>
              <li><a href="#/layanan" className="hover:text-white">Kontrak Bisnis</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Perusahaan</h3>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li><a href="#/tentang-kami" className="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white">Karir</a></li>
              <li><a href="#/blog" className="hover:text-white">Blog</a></li>
              <li><a href="#/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#/kontak" className="hover:text-white">Hubungi Kami</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li><a href="#/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</a></li>
              <li><a href="#/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</a></li>
            </ul>
          </div>
           <div className="col-span-2 md:col-span-1">
             <h3 className="font-semibold text-white">Langganan Newsletter</h3>
             <p className="mt-4 text-slate-400 text-sm">Dapatkan info & edukasi hukum terbaru langsung ke email Anda.</p>
             <form className="mt-4 flex">
                <label htmlFor="newsletter-email" className="sr-only">Alamat email untuk newsletter</label>
                <input type="email" id="newsletter-email" placeholder="Email Anda" className="w-full rounded-l-md px-3 py-2 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-secondary" />
                <button type="submit" aria-label="Berlangganan newsletter" className="bg-brand-secondary rounded-r-md px-3 text-white">
                  <Icon className="w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></Icon>
                </button>
             </form>
           </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} HalloHukum. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             <a href="#" aria-label="Ikuti kami di Facebook" className="hover:text-white"><Icon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></Icon></a>
             <a href="#" aria-label="Ikuti kami di Twitter" className="hover:text-white"><Icon><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></Icon></a>
             <a href="#" aria-label="Ikuti kami di Instagram" className="hover:text-white"><Icon><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></Icon></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;