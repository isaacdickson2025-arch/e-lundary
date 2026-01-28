import React from 'react';
import { Card, Button } from '../components/UI';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto space-y-8 mb-16 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-luxury-gold text-sm font-subheading tracking-wider uppercase backdrop-blur-md">
          <Star size={14} className="fill-luxury-gold" /> Premium Laundry Service
        </div>
        
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-lg">
          Fresh laundry, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-[#FFFDD0]">
            without the stress.
          </span>
        </h1>
        
        <p className="font-body text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Book a pickup, track your wash, and enjoy spotless clothes—right at your doorstep. 
          Experience the gold standard in fabric care.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button 
            className="w-full sm:w-auto px-10 py-4 text-lg"
            onClick={() => onNavigate(ViewState.LOGIN_CUSTOMER)}
          >
            Book a Pickup <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-xs text-gray-500 mt-4 sm:mt-0 font-subheading">
            Powered by Isaac W. Dickson
          </p>
        </div>
      </div>

      {/* Features Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {[
          { icon: Clock, title: "24h Turnaround", desc: "Fast, reliable service that fits your busy schedule." },
          { icon: Shield, title: "Secure Care", desc: "Your garments are treated with the utmost care and safety." },
          { icon: Star, title: "Premium Quality", desc: "Top-tier detergents and professional handling every time." }
        ].map((feature, idx) => (
          <Card key={idx} className="bg-white/5 border border-white/10 hover:bg-white/10 !shadow-none hover:!shadow-lg !text-left group transition-all duration-500">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center mb-4 text-luxury-gold group-hover:scale-110 transition-transform">
              <feature.icon size={24} />
            </div>
            <h3 className="text-white font-heading text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-400 font-body text-sm leading-relaxed">{feature.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};