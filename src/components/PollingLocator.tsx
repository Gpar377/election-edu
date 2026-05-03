import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Search, Shield, Clock, ChevronRight } from 'lucide-react';

const MOCK_STATIONS = [
  { id: 1, name: "St. Mary's Secondary School", area: 'Kanchipuram North', dist: '0.8 km', status: 'Optimal', wait: '5 min', booths: 6 },
  { id: 2, name: 'Government Arts College', area: 'Kanchipuram Central', dist: '1.2 km', status: 'Moderate', wait: '15 min', booths: 8 },
  { id: 3, name: 'Community Center — Ward 4', area: 'Kanchipuram South', dist: '2.4 km', status: 'Optimal', wait: '3 min', booths: 4 },
];

const statusConfig = {
  Optimal: { color: '#0CC594', bg: 'rgba(6,167,125,0.1)', border: 'rgba(6,167,125,0.25)', dot: '#0CC594' },
  Moderate: { color: '#FFA742', bg: 'rgba(255,167,66,0.1)', border: 'rgba(255,167,66,0.25)', dot: '#FFA742' },
};

/**
 * PollingLocator Component
 * 
 * Provides an interactive UI to find nearby polling stations, view crowd status,
 * and get directions. Includes an accessible search interface.
 */
export const PollingLocator: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = MOCK_STATIONS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card-elevated overflow-hidden flex flex-col h-[520px]">
      {/* Search bar */}
      <div className="p-4 border-b border-white/5">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by area, pincode, or school name..."
            className="input-field pl-11 py-3 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Station List */}
        <div className="w-full overflow-y-auto">
          <div className="p-4 pb-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
              {filtered.length} Stations Near You
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {filtered.map((station) => {
                  const cfg = statusConfig[station.status as keyof typeof statusConfig];
                  const isSelected = selected === station.id;
                  return (
                    <motion.button
                      key={station.id}
                      layout
                      onClick={() => setSelected(isSelected ? null : station.id)}
                      className="w-full text-left p-4 rounded-2xl transition-all group"
                      style={{
                        background: isSelected ? 'rgba(0,82,204,0.08)' : 'rgba(255,255,255,0.02)',
                        border: isSelected ? '1px solid rgba(0,82,204,0.3)' : '1px solid rgba(255,255,255,0.06)',
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'rgba(0,82,204,0.12)', color: '#6B9FFF' }}>
                            <MapPin size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-tight">{station.name}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{station.area}</p>
                          </div>
                        </div>
                        <div className="text-[11px] font-bold" style={{ color: '#6B9FFF', whiteSpace: 'nowrap' }}>
                          {station.dist}
                        </div>
                      </div>

                      {/* Status row */}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                          style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
                          {station.status} Crowd
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                          <Clock size={10} /> ~{station.wait} wait
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold ml-auto">
                          {station.booths} booths
                        </span>
                      </div>

                      {/* Expanded navigate row */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                              <button className="btn-blue flex-1 text-xs py-2.5">
                                <Navigation size={13} /> Navigate
                              </button>
                              <button className="btn-secondary flex-1 text-xs py-2.5">
                                View Details <ChevronRight size={13} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Security notice */}
          <div className="mx-4 mt-2 mb-4 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
            <Shield size={16} style={{ color: '#FFA742', flexShrink: 0 }} />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <span style={{ color: '#FFA742' }} className="font-bold">Section 144</span> is typically active within 100m of polling stations on election day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
