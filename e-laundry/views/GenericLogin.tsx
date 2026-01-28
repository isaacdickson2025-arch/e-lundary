import React, { useState } from 'react';
import { Card, Button, Input, PageTitle } from '../components/UI';
import { ViewState } from '../types';
import { ShieldCheck, Truck, Briefcase } from 'lucide-react';

interface GenericLoginProps {
  view: ViewState;
}

export const GenericLogin: React.FC<GenericLoginProps> = ({ view }) => {
  const [isLoading, setIsLoading] = useState(false);

  let title = "Staff Login";
  let Icon = Briefcase;
  
  if (view === ViewState.LOGIN_ADMIN) {
    title = "Admin Portal";
    Icon = ShieldCheck;
  } else if (view === ViewState.LOGIN_DELIVERY) {
    title = "Partner Portal";
    Icon = Truck;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        alert("This is a demo portal for " + title);
    }, 1500);
  }

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <Card className="w-full max-w-md animate-fade-in text-center">
        <div className="w-16 h-16 mx-auto bg-luxury-black text-luxury-gold rounded-2xl flex items-center justify-center mb-6 shadow-xl">
           <Icon size={32} />
        </div>
        <PageTitle className="text-2xl md:text-3xl mb-2">{title}</PageTitle>
        <p className="text-gray-500 mb-8">Restricted Access Area</p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <Input label="Username / ID" placeholder="Enter ID" />
            <Input label="Password" type="password" placeholder="••••••••" />
            
            <Button className="w-full mt-4" isLoading={isLoading}>
                Secure Login
            </Button>
        </form>
        
        <p className="mt-6 text-xs text-gray-400">
            Unauthorized access is strictly prohibited. <br/> IP Address Logged.
        </p>
      </Card>
    </div>
  );
};