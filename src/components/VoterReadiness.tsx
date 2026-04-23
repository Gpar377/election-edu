import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy, ArrowRight, ShieldCheck, UserCheck, BookOpen } from 'lucide-react';

const TASKS = [
  { id: 'reg', label: 'Registered on NVSP', icon: UserCheck, desc: 'Verified status on voterportal.eci.gov.in' },
  { id: 'id', label: 'Photo ID Ready', icon: ShieldCheck, desc: 'EPIC, Aadhar, or other valid identity document' },
  { id: 'loc', label: 'Know Your Station', icon: BookOpen, desc: 'Located your specific polling booth' },
  { id: 'edu', label: 'Know Your Candidates', icon: Trophy, desc: 'Reviewed manifestos and background details' },
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
    <div className="glass-panel p-8">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Progress Ring */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeDasharray={502.6}
              initial={{ strokeDashoffset: 502.6 }}
              animate={{ strokeDashoffset: 502.6 - (502.6 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">{Math.round(progress)}%</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ready</span>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">Citizen Readiness</h3>
            <p className="text-sm text-slate-400 mb-6">Complete these steps to ensure you are ready for polling day.</p>
          </div>

          <div className="grid gap-3">
            {TASKS.map((task) => {
              const isDone = completed.includes(task.id);
              const Icon = task.icon;
              return (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    isDone 
                      ? 'bg-indigo-600/10 border-indigo-500/40' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isDone ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold ${isDone ? 'text-white' : 'text-slate-300'}`}>{task.label}</h4>
                    <p className="text-[10px] text-slate-500">{task.desc}</p>
                  </div>
                  {isDone ? <CheckCircle2 className="text-indigo-400" size={20} /> : <Circle className="text-slate-700" size={20} />}
                </button>
              );
            })}
          </div>

          {progress === 100 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Trophy className="text-green-500" size={24} />
                <p className="text-sm font-bold text-green-400">You are a Ready Citizen!</p>
              </div>
              <button className="text-xs font-black text-white flex items-center gap-1 hover:gap-2 transition-all">
                Share Achievement <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
