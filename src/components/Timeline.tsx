import React from 'react';
import { motion } from 'framer-motion';
import { ELECTION_STEPS } from '../constants';
import * as LucideIcons from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <div className="relative py-12 px-4 max-w-5xl mx-auto overflow-x-auto">
      {/* Connector Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block"></div>
      
      <div className="flex md:justify-between items-start gap-8 min-w-[800px] md:min-w-0">
        {ELECTION_STEPS.map((step, idx) => {
          const IconComponent = (LucideIcons as any)[step.icon];
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex flex-col items-center text-center group cursor-pointer flex-1"
            >
              {/* Icon Container */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-all duration-500 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)`,
                  border: `1px solid ${step.color}33`,
                  boxShadow: `0 0 20px ${step.color}11`
                }}
              >
                <IconComponent size={28} style={{ color: step.color }} />
                
                {/* Connector Dot */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20"></div>
              </div>
              
              {/* Content */}
              <h4 className="text-sm font-bold mb-2 group-hover:text-white transition-colors text-slate-300">
                {step.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-[140px]">
                {step.description}
              </p>
              
              {/* Index Number */}
              <div className="absolute -top-4 text-[40px] font-black text-white/[0.03] pointer-events-none select-none">
                0{idx + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
