import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Shirt, Truck, Briefcase, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', icon: Home, view: ViewState.HOME },
    { label: 'Wash', icon: Shirt, view: ViewState.LOGIN_CUSTOMER },
    { label: 'Delivery', icon: Truck, view: ViewState.LOGIN_DELIVERY },
    { label: 'Staff', icon: Briefcase, view: ViewState.LOGIN_OFFICE },
    { label: 'Admin', icon: ShieldCheck, view: ViewState.LOGIN_ADMIN },
  ];

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-luxury-black via-[#151525] to-luxury-navy text-luxury-softWhite font-body overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isMenuOpen ? 'bg-luxury-black/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick(ViewState.HOME)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-[#A08035] flex items-center justify-center text-luxury-black font-heading font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                e
              </div>
              <span className="font-heading text-2xl tracking-wide text-white group-hover:text-luxury-gold transition-colors">
                e-Laundry
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-subheading font-medium text-sm
                    ${currentView === item.view 
                      ? 'bg-luxury-gold text-luxury-black shadow-lg scale-105' 
                      : 'text-luxury-softWhite hover:bg-white/10 hover:text-luxury-gold'}
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-luxury-gold p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-luxury-black/95 backdrop-blur-xl border-t border-white/5 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[400px] shadow-2xl' : 'max-h-0'}`}>
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`
                  flex items-center gap-4 px-6 py-4 rounded-xl w-full transition-all
                  ${currentView === item.view 
                    ? 'bg-luxury-gold text-luxury-black font-semibold' 
                    : 'text-luxury-softWhite hover:bg-white/5'}
                `}
              >
                <item.icon size={22} />
                <span className="text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 min-h-screen flex flex-col items-center justify-start p-4 md:p-6">
        <div className="w-full max-w-7xl animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-30 pointer-events-none" />
    </div>
  );
};