import React from 'react';
import { Loader2 } from 'lucide-react';

// --- Card Component ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-[24px] shadow-premium p-6 md:p-10 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative font-subheading font-semibold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-luxury-gold text-luxury-black hover:bg-[#B89240] hover:scale-[1.03] shadow-lg",
    outline: "border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 hover:scale-[1.03]",
    text: "text-luxury-gold hover:text-[#B89240] underline-offset-4 hover:underline bg-transparent shadow-none hover:scale-100",
  };

  const sizes = "py-3 px-6 text-sm md:text-base";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

// --- Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ElementType;
}

export const Input: React.FC<InputProps> = ({ label, error, icon: Icon, className = '', ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-luxury-black/80 font-subheading text-sm font-medium mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full bg-gray-50 text-luxury-black placeholder-gray-400
            border-2 ${error ? 'border-red-500' : 'border-gray-100 focus:border-luxury-gold/50'}
            rounded-2xl py-3.5 px-4 outline-none transition-all duration-200
            font-body text-base shadow-sm focus:shadow-md
            ${Icon ? 'pl-11' : ''}
            ${className}
          `}
          {...props}
        />
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1 font-body">{error}</p>}
    </div>
  );
};

// --- Typography Components ---
export const PageTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h1 className={`font-heading text-3xl md:text-4xl lg:text-5xl text-luxury-black mb-2 ${className}`}>
    {children}
  </h1>
);

export const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-subheading text-xl text-luxury-black/90 mb-4 font-semibold">
    {children}
  </h2>
);