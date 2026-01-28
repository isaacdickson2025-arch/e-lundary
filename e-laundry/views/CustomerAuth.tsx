import React, { useState } from 'react';
import { Card, Button, Input, PageTitle, SectionHeader } from '../components/UI';
import { Phone, Lock, User as UserIcon, MapPin, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { ViewState, User, UserRole } from '../types';

interface CustomerAuthProps {
  initialView: ViewState.LOGIN_CUSTOMER | ViewState.REGISTER_CUSTOMER;
  onNavigate: (view: ViewState) => void;
  onLogin: (user: User) => void;
}

export const CustomerAuth: React.FC<CustomerAuthProps> = ({ initialView, onNavigate, onLogin }) => {
  const isRegistering = initialView === ViewState.REGISTER_CUSTOMER;
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    phone: '',
    pin: '',
    confirmPin: '',
    name: '',
    address: '',
    email: '',
    agree: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Invalid phone number";
    if (!formData.pin || formData.pin.length !== 4) newErrors.pin = "PIN must be 4 digits";
    
    if (isRegistering) {
        if (!formData.name) newErrors.name = "Full name is required";
        if (formData.pin !== formData.confirmPin) newErrors.confirmPin = "PINs do not match";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.agree) newErrors.agree = "You must agree to terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      if (isRegistering) {
        // After register, auto-login or go to login
        alert("Account Created Successfully! Please Login.");
        onNavigate(ViewState.LOGIN_CUSTOMER);
      } else {
        // Login Logic
        const user: User = {
          name: "Isaac Dickson", // Mock name
          phone: formData.phone,
          role: 'customer'
        };
        onLogin(user);
      }
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[70vh] py-8">
      <Card className="w-full max-w-lg animate-fade-in relative overflow-hidden">
        
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black" />

        <div className="text-center mb-8">
          <PageTitle>{isRegistering ? "Create Account" : "Welcome Back 👋"}</PageTitle>
          <p className="text-gray-500 font-body">
            {isRegistering 
              ? "Register to start booking laundry services" 
              : "Login to continue using e-Laundry"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Registration Extra Fields */}
          {isRegistering && (
            <div className="space-y-4 animate-slide-down">
              <SectionHeader>👤 Personal Information</SectionHeader>
              <Input 
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                icon={UserIcon}
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </div>
          )}

          {/* Common Fields */}
          <div>
            <Input 
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="Enter registered phone number"
              icon={Phone}
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
          </div>

          <div className="relative">
             {isRegistering && <SectionHeader>🔐 Security</SectionHeader>}
            <Input 
              name="pin"
              type={showPin ? "text" : "password"}
              maxLength={4}
              label={isRegistering ? "Create 4-Digit PIN" : "4-Digit PIN"}
              placeholder="••••"
              icon={Lock}
              className="tracking-[0.5em] font-bold"
              value={formData.pin}
              onChange={(e) => {
                 // Only allow numbers
                 if (/^\d*$/.test(e.target.value)) handleInputChange(e);
              }}
              error={errors.pin}
            />
             <button 
                type="button" 
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-[42px] text-gray-400 hover:text-luxury-gold transition-colors"
              >
                {showPin ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
          </div>

          {!isRegistering && (
             <div className="flex justify-end -mt-3 mb-4">
                <button type="button" className="text-sm text-luxury-gold hover:underline font-subheading">
                   Forgot PIN?
                </button>
             </div>
          )}

          {/* Registration Address & Confirm PIN */}
          {isRegistering && (
            <div className="space-y-4 animate-slide-down">
              <Input 
                name="confirmPin"
                type="password"
                maxLength={4}
                label="Confirm 4-Digit PIN"
                placeholder="••••"
                icon={Lock}
                className="tracking-[0.5em] font-bold"
                value={formData.confirmPin}
                onChange={(e) => {
                     if (/^\d*$/.test(e.target.value)) handleInputChange(e);
                }}
                error={errors.confirmPin}
              />

              <SectionHeader>📍 Address Information</SectionHeader>
              <Input 
                name="address"
                label="Home Address"
                placeholder="Enter your delivery address"
                icon={MapPin}
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
              />

              <div className="pt-2">
                 <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-bold">Optional</p>
                <Input 
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter email for receipts"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleInputChange}
                />
              </div>

               <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <input 
                    type="checkbox" 
                    name="agree"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-luxury-gold rounded focus:ring-luxury-gold border-gray-300"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600 font-body">
                    I agree to the <span className="text-luxury-black font-semibold">Terms & Privacy Policy</span>
                  </label>
               </div>
               {errors.agree && <p className="text-red-500 text-xs">{errors.agree}</p>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4">
            <Button type="submit" className="w-full text-lg shadow-xl" isLoading={isLoading}>
              {isRegistering ? "Create Account" : "Login"}
            </Button>
          </div>

        </form>

        {/* Toggle View */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-600 font-body mb-2">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onNavigate(isRegistering ? ViewState.LOGIN_CUSTOMER : ViewState.REGISTER_CUSTOMER)}
          >
            {isRegistering ? "Login Instead" : "Create Account"}
          </Button>
        </div>

      </Card>
    </div>
  );
};