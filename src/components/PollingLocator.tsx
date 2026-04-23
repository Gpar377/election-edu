import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, Info, ShieldCheck } from 'lucide-react';

const MOCK_STATIONS = [
  { id: 1, name: 'St. Mary\'s Secondary School', district: 'Kanchipuram', dist: '0.8 km', status: 'Optimal' },
  { id: 2, name: 'Government Arts College', district: 'Kanchipuram', dist: '1.2 km', status: 'Moderate' },
  { id: 3, name: 'Community Center - Ward 4', district: 'Kanchipuram', dist: '2.4 km', status: 'Optimal' },
];

export const PollingLocator: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="glass-panel overflow-hidden flex flex-col md:flex-row h-[500px]">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-white/5 flex flex-col bg-white/[0.01]">
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-indigo-400" />
            Station Finder
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Enter Pincode or EPIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {MOCK_STATIONS.map((station) => (
            <motion.div 
              key={station.id}
              whileHover={{ x: 5 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-slate-200">{station.name}</h4>
                <span className="text-[10px] font-black text-indigo-400">{station.dist}</span>
              </div>
              <p className="text-[10px] text-slate-500 mb-3">{station.district}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${station.status === 'Optimal' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{station.status} Crowd</span>
                </div>
                <button className="text-[10px] font-black text-white hover:text-indigo-400 transition-colors uppercase flex items-center gap-1">
                  Navigate <Navigation size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none">
             <path d="M0,100 L800,150 M0,200 L800,250 M100,0 L150,600 M300,0 L350,600" stroke="white" strokeWidth="1" fill="none" />
             <circle cx="200" cy="200" r="4" fill="white" />
             <circle cx="500" cy="400" r="4" fill="white" />
           </svg>
        </div>

        {/* Visual Map Markers */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 text-indigo-500"
        >
          <MapPin size={48} fill="currentColor" fillOpacity={0.2} />
        </motion.div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass-panel p-4 flex items-center justify-between gap-4 bg-black/60 border-white/20">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                 <ShieldCheck className="text-indigo-400" size={20} />
               </div>
               <div>
                 <p className="text-xs font-bold">Secure Polling Zone</p>
                 <p className="text-[10px] text-slate-400">Section 144 in effect within 100m</p>
               </div>
            </div>
            <button className="btn-noir py-2 px-4 text-[10px]">Open Full Map</button>
          </div>
        </div>

        <div className="absolute top-6 right-6 flex flex-col gap-2">
           <button className="w-10 h-10 glass-panel flex items-center justify-center hover:bg-white/10"><Info size={18} /></button>
           <button className="w-10 h-10 glass-panel flex items-center justify-center hover:bg-white/10"><Navigation size={18} /></button>
        </div>
      </div>
    </div>
  );
};
