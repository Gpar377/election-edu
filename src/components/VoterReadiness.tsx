import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, ArrowRight, ShieldCheck, UserCheck, BookOpen, Search } from 'lucide-react';

const TASKS = [
  { id: 'reg', label: 'Registered on NVSP', icon: UserCheck, desc: 'Verified status on voterportal.eci.gov.in' },
  { id: 'id', label: 'Photo ID Ready', icon: ShieldCheck, desc: 'EPIC, Aadhar, or other valid identity document' },
  { id: 'loc', label: 'Know Your Station', icon: Search, desc: 'Located your specific polling booth' },
  { id: 'edu', label: 'Know Your Candidates', icon: BookOpen, desc: 'Reviewed manifestos and background details' },
];

export const VoterReadiness: React.FC = () => {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleTask = (id: string) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const progress = (completed.length / TASKS.length) * 100;

  return (
    <div className="glass-panel p-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Progress Ring */}
        <div className="relative w-56 h-56 flex-shrink-0 animate-float">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="100"
              fill="transparent"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="14"
            />
            <motion.circle
              cx="112"
              cy="112"
              r="100"
              fill="transparent"
              stroke="url(#progress-gradient)"
              strokeWidth="14"
              strokeDasharray={628.3}
              initial={{ strokeDashoffset: 628.3 }}
              animate={{ strokeDashoffset: 628.3 - (628.3 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              key={progress}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white"
            >
              {Math.round(progress)}%
            </motion.span>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Readiness</span>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 w-full">
          <div className="mb-10">
            <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase">Citizen Readiness</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-lg">Complete the essential steps to secure your democratic right and ensure a smooth voting experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TASKS.map((task) => {
              const isDone = completed.includes(task.id);
              const Icon = task.icon;
              return (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`group relative flex items-center gap-5 p-5 rounded-3xl border transition-all text-left overflow-hidden ${
                    isDone 
                      ? 'bg-indigo-600/10 border-indigo-500/40' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isDone ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'
                  }`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-black uppercase tracking-tight mb-0.5 transition-colors ${isDone ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{task.label}</h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{task.desc}</p>
                  </div>
                  <div className={`transition-all duration-500 ${isDone ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-2'}`}>
                     <CheckCircle2 className={isDone ? 'text-indigo-400' : 'text-slate-700'} size={24} />
                  </div>
                  
                  {/* Hover Accent */}
                  {!isDone && (
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-500/50 transition-all duration-500 group-hover:w-full" />
                  )}
                </button>
              );
            })}
          </div>

          {progress === 100 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-green-500/20 to-transparent border border-green-500/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-base font-black text-white uppercase tracking-tight">You are a Ready Citizen!</p>
                  <p className="text-[10px] text-green-400 font-black uppercase tracking-[0.2em]">Achievement Unlocked</p>
                </div>
              </div>
              <button className="text-[11px] font-black text-white bg-green-500/20 px-6 py-3 rounded-xl border border-green-500/30 hover:bg-green-500 hover:text-black transition-all flex items-center gap-2 uppercase tracking-widest">
                Share <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
