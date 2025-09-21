import React, { useState } from 'react';
import Icon from './Icon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Tentang Kami', path: '#/tentang-kami' },
    { name: 'Layanan', path: '#/layanan' },
    { name: 'Harga', path: '#/harga' },
    { name: 'Blog', path: '#/blog' },
    { name: 'Hubungi Kami', path: '#/kontak' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-brand-light/80 backdrop-blur-md sticky top-0 z-40 w-full border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#/" onClick={handleLinkClick} className="flex items-center space-x-2" aria-label="HalloHukum Homepage">
             <div className="bg-brand-dark p-2 rounded-lg">
                <Icon className="text-brand-accent">
                    <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                    <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                    <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                </Icon>
             </div>
            <span className="text-2xl font-bold text-brand-dark">HalloHukum</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navigasi utama">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.path} className="text-slate-600 hover:text-brand-dark font-medium transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#/mulai" className="hidden md:inline-flex items-center justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-brand-dark text-white hover:bg-slate-700 transition-colors">
            Mulai Sekarang
          </a>
          <button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
             <Icon className="text-brand-dark w-7 h-7">
                {isMenuOpen ? (
                   <>
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                   </>
                ) : (
                   <>
                     <line x1="3" y1="12" x2="21" y2="12"></line>
                     <line x1="3" y1="6" x2="21" y2="6"></line>
                     <line x1="3" y1="18" x2="21" y2="18"></line>
                   </>
                )}
             </Icon>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div id="mobile-menu" className={`absolute top-full left-0 w-full bg-brand-light/95 backdrop-blur-md shadow-lg md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen border-t border-slate-200' : 'max-h-0'}`}>
          <nav className="px-6 pt-2 pb-6" aria-label="Navigasi mobile">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.path} onClick={handleLinkClick} className="block text-slate-700 hover:text-brand-dark font-semibold transition-colors py-3 text-base">
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#/mulai" onClick={handleLinkClick} className="mt-4 w-full inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-brand-dark text-white hover:bg-slate-700 transition-colors">
                    Mulai Sekarang
                </a>
              </li>
            </ul>
          </nav>
      </div>
    </header>
  );
};

export default Header;