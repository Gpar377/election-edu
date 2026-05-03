import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, ArrowRight, ShieldCheck, UserCheck, BookOpen, Search, ChevronRight } from 'lucide-react';

const TASKS = [
  { id: 'reg', label: 'Registered on NVSP', icon: UserCheck, desc: 'Verify your name at voterportal.eci.gov.in', color: 'saffron' },
  { id: 'id', label: 'Photo ID Ready', icon: ShieldCheck, desc: 'EPIC, Aadhaar, or any valid ECI document', color: 'blue' },
  { id: 'loc', label: 'Know Your Booth', icon: Search, desc: 'Locate your specific polling station', color: 'teal' },
  { id: 'edu', label: 'Know Your Candidates', icon: BookOpen, desc: 'Review manifestos and affidavits on ECI', color: 'saffron' },
];

const COLOR_MAP = {
  saffron: { bg: 'rgba(255,140,0,0.1)', border: 'rgba(255,140,0,0.25)', text: '#FFA742', icon: 'rgba(255,140,0,0.15)' },
  blue: { bg: 'rgba(0,82,204,0.1)', border: 'rgba(0,82,204,0.25)', text: '#6B9FFF', icon: 'rgba(0,82,204,0.15)' },
  teal: { bg: 'rgba(6,167,125,0.1)', border: 'rgba(6,167,125,0.25)', text: '#0CC594', icon: 'rgba(6,167,125,0.15)' },
};

/**
 * VoterReadinessComponent
 * 
 * Interactive checklist allowing users to track their preparation for voting day.
 * Includes dynamic progress calculations and accessibility labels.
 */
const VoterReadinessComponent: React.FC = () => {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleTask = (id: string) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const progress = Math.round((completed.length / TASKS.length) * 100);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="card-elevated overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel — Progress */}
        <div className="lg:w-72 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5"
          style={{ background: 'rgba(10,14,26,0.5)' }}>
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="url(#progress-grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF8C00" />
                  <stop offset="100%" stopColor="#FFC45E" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={progress}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="stat-number text-4xl text-white"
              >
                {progress}%
              </motion.span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Ready</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white text-center mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Civic Readiness Score
          </h3>
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Complete each step to ensure you're ready for polling day
          </p>

          <div className="mt-6 w-full">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold">{completed.length}/{TASKS.length} completed</span>
              <span style={{ color: '#FF8C00' }} className="font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF8C00, #FFC45E)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel — Tasks */}
        <div className="flex-1 p-8">
          <div className="grid gap-3">
            {TASKS.map((task) => {
              const isDone = completed.includes(task.id);
              const Icon = task.icon;
              const colors = COLOR_MAP[task.color as keyof typeof COLOR_MAP];
              return (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all group"
                  style={{
                    background: isDone ? colors.bg : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isDone ? colors.border : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center transition-all"
                    style={{
                      background: isDone ? colors.icon : 'rgba(255,255,255,0.04)',
                      color: isDone ? colors.text : '#4A5568',
                    }}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{task.label}</h4>
                      {isDone && (
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                          Done
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{task.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {isDone
                      ? <CheckCircle2 size={20} style={{ color: colors.text }} />
                      : <ChevronRight size={18} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
                    }
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16 }}
                className="mt-6 p-5 rounded-2xl flex items-center justify-between gap-4"
                style={{ background: 'rgba(6,167,125,0.1)', border: '1px solid rgba(6,167,125,0.3)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,167,125,0.2)' }}>
                    <Trophy size={24} style={{ color: '#0CC594' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">You're a Ready Citizen! 🎉</p>
                    <p className="text-xs text-slate-500">Share your readiness with friends</p>
                  </div>
                </div>
                <button className="btn-blue text-xs py-2.5 px-4 whitespace-nowrap">
                  Share <ArrowRight size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const VoterReadiness = React.memo(VoterReadinessComponent);
