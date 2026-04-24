import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, UserCheck, Megaphone, Vote, BarChart3 } from 'lucide-react';

const STEPS = [
  { id: '01', title: 'Registration', desc: 'Enroll on the electoral roll via NVSP or BLO.', icon: UserPlus, color: '#FF8C00' },
  { id: '02', title: 'Nomination', desc: 'Candidates file Form 2B with the Returning Officer.', icon: UserCheck, color: '#6B9FFF' },
  { id: '03', title: 'Campaigning', desc: 'Parties reach voters within the Model Code period.', icon: Megaphone, color: '#FFA742' },
  { id: '04', title: 'Polling Day', desc: 'Cast your vote at the designated EVM booth.', icon: Vote, color: '#0CC594' },
  { id: '05', title: 'Results', desc: 'Votes counted; winners declared by the ECI.', icon: BarChart3, color: '#6B9FFF' },
];

export const Timeline: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative">
      {/* Connecting Line */}
      <div className="hidden lg:block absolute top-10 left-10 right-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.3), rgba(255,255,255,0.1), rgba(6,167,125,0.3), transparent)' }} />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="card p-5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Step number */}
                <div className="text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ color: step.color, letterSpacing: '0.15em' }}>
                  Step {step.id}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${step.color}15`, color: step.color }}>
                  <Icon size={24} />
                </div>

                <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
