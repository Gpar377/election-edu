import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck, Megaphone, Vote, BarChart3 } from 'lucide-react';

const STEPS = [
  { id: '01', title: 'Registration', desc: 'Secure your spot on the electoral roll.', icon: UserPlus },
  { id: '02', title: 'Nomination', desc: 'Candidates file and verify credentials.', icon: UserCheck },
  { id: '03', title: 'Campaigning', desc: 'Parties reach out with their vision.', icon: Megaphone },
  { id: '04', title: 'Polling Day', desc: 'Cast your vote at the designated booth.', icon: Vote },
  { id: '05', title: 'Results', desc: 'The voice of the people is declared.', icon: BarChart3 },
];

export const Timeline: React.FC = () => {
  return (
    <div className="relative pt-12 pb-8">
      <div className="timeline-line hidden lg:block" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center flex flex-col items-center"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.08] group-hover:border-indigo-500/50 shadow-2xl">
                  <Icon size={32} className="text-slate-400 transition-colors duration-500 group-hover:text-indigo-400" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-indigo-500 shadow-xl group-hover:border-indigo-500/50 transition-colors">
                  {step.id}
                </div>
              </div>
              <h3 className="text-lg font-black mb-3 text-white uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{step.title}</h3>
              <p className="text-sm text-slate-500 font-medium px-4 leading-relaxed group-hover:text-slate-400 transition-colors">
                {step.desc}
              </p>
              
              <div className="mt-8 timeline-dot hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
