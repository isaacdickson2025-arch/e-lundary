import React from 'react';
import { Card, PageTitle, Button } from '../components/UI';
import { User, ViewState } from '../types';
import { Plus, Clock, MapPin } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <PageTitle className="!mb-0">Welcome back, {user.name.split(' ')[0]} 👋</PageTitle>
          <p className="text-gray-400 font-body mt-2">Ready to get your laundry done today?</p>
        </div>
        <Button onClick={onLogout} variant="outline" className="!border-white/20 !text-white hover:!bg-white/10">
          Logout
        </Button>
      </div>

      {/* Main Action Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-r from-luxury-gold to-[#B89240] !border-none !text-luxury-black relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
            <div>
               <h2 className="font-heading text-3xl font-bold mb-2">New Pickup Request</h2>
               <p className="font-body opacity-90 max-w-sm">Schedule a driver to pick up your laundry from your home address.</p>
            </div>
            <div className="mt-8 flex items-center gap-3 bg-luxury-black/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                <Plus size={20} />
                <span className="font-bold">Book Now</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-center items-center text-center gap-4 bg-white/90">
             <div className="w-16 h-16 rounded-full bg-blue-50 text-luxury-navy flex items-center justify-center">
                 <Clock size={32} />
             </div>
             <div>
                <h3 className="font-heading text-xl text-luxury-black">Active Orders</h3>
                <p className="text-gray-500">No active orders</p>
             </div>
             <Button variant="text" className="text-sm">View History</Button>
        </Card>
      </div>

      {/* Recent Activity / Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="bg-luxury-navy/50 border border-white/5 text-white">
            <h3 className="font-subheading text-lg font-semibold mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-luxury-gold" /> Saved Address
            </h3>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-luxury-gold">
                    <MapPin size={20} />
                </div>
                <div>
                    <p className="font-medium text-white">Home</p>
                    <p className="text-sm text-gray-400">123 Luxury Lane, Beverly Hills</p>
                </div>
                <Button variant="text" className="ml-auto !text-xs !text-gray-400 hover:!text-white">Edit</Button>
            </div>
         </Card>
         
         <Card className="bg-luxury-navy/50 border border-white/5 text-white">
            <h3 className="font-subheading text-lg font-semibold mb-6">Promotions</h3>
            <div className="p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl border border-white/10">
                <p className="font-heading text-lg text-white mb-1">Get 20% Off</p>
                <p className="text-sm text-gray-300 mb-3">On your first dry cleaning order.</p>
                <div className="inline-block px-3 py-1 bg-white/10 rounded text-xs tracking-widest font-mono">CODE: LUXURY20</div>
            </div>
         </Card>
      </div>

    </div>
  );
};