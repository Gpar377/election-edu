import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, Info, ShieldCheck, Globe } from 'lucide-react';

const MOCK_STATIONS = [
  { id: 1, name: 'St. Mary\'s Secondary School', district: 'Kanchipuram, TN', dist: '0.8 km', status: 'Optimal' },
  { id: 2, name: 'Government Arts College', district: 'Kanchipuram, TN', dist: '1.2 km', status: 'Moderate' },
  { id: 3, name: 'Community Center - Ward 4', district: 'Kanchipuram, TN', dist: '2.4 km', status: 'Optimal' },
];

export const PollingLocator: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="glass-panel overflow-hidden flex flex-col xl:flex-row h-[600px]">
      {/* Sidebar */}
      <div className="w-full xl:w-96 border-r border-white/5 flex flex-col bg-white/[0.01]">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <MapPin size={24} className="text-indigo-400" />
              Live Finder
            </h3>
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
               <Globe size={16} className="animate-spin-slow" />
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Enter Pincode or EPIC ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-noir pl-12"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 px-2">Nearby Stations</p>
          {MOCK_STATIONS.map((station) => (
            <motion.div 
              key={station.id}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-black text-slate-200 group-hover:text-white transition-colors">{station.name}</h4>
                <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg">{station.dist}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">{station.district}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${station.status === 'Optimal' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{station.status} Crowd</span>
                </div>
                <button className="text-[10px] font-black text-white hover:text-indigo-400 transition-colors uppercase flex items-center gap-1 tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 group-hover:border-indigo-500/30">
                  Route <Navigation size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative bg-[#020408] overflow-hidden group/map">
        {/* Mock Map Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity group-hover/map:opacity-20 duration-1000">
           <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none" className="text-slate-500">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M0,150 Q400,100 800,200 T1200,150" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-50" />
              <path d="M100,0 Q150,300 100,600" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-30" />
           </svg>
        </div>

        {/* Pulsing Markers */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-indigo-500/20 blur-xl"
        />
        
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]"
        >
          <MapPin size={56} fill="currentColor" fillOpacity={0.2} />
        </motion.div>
        
        {/* Map UI Overlays */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/80 border-white/20 backdrop-blur-3xl">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
                 <ShieldCheck className="text-indigo-400" size={28} />
               </div>
               <div>
                 <p className="text-sm font-black text-white uppercase tracking-tight">Official Polling Zone</p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Verified Security Infrastructure Active</p>
               </div>
            </div>
            <button className="btn-noir py-3 px-8 text-xs w-full md:w-auto whitespace-nowrap">Open Maps Experience</button>
          </div>
        </div>

        <div className="absolute top-8 right-8 flex flex-col gap-3">
           <button className="w-12 h-12 glass-panel flex items-center justify-center hover:bg-white/10 text-white transition-all"><Info size={22} /></button>
           <button className="w-12 h-12 glass-panel flex items-center justify-center hover:bg-white/10 text-white transition-all"><Navigation size={22} /></button>
        </div>
      </div>
    </div>
  );
};
