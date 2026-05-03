import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Assistant } from './components/Assistant';
import { Timeline } from './components/Timeline';
import { PollingLocator } from './components/PollingLocator';
import { VoterReadiness } from './components/VoterReadiness';
import { Vote, ArrowRight, ShieldCheck, Globe, Users, FileText, HelpCircle } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  color: 'saffron' | 'blue' | 'teal';
  delay: number;
}

const STATS: StatItem[] = [
  { value: '96.8Cr', label: 'Registered Voters', color: 'saffron', delay: 0.5 },
  { value: '10.5L', label: 'Polling Stations', color: 'blue', delay: 0.6 },
  { value: '543', label: 'Lok Sabha Seats', color: 'teal', delay: 0.7 },
];

const QUICK_FACTS = [
  { icon: Users, title: 'Who Can Vote?', desc: 'Any Indian citizen aged 18+ enrolled in the electoral roll of their constituency.', color: 'saffron' },
  { icon: ShieldCheck, title: 'Valid ID Documents', desc: 'EPIC Card, Aadhaar, Passport, Driving Licence, or any ECI-approved document.', color: 'blue' },
  { icon: Vote, title: 'Polling Hours', desc: 'Generally 7 AM – 6 PM on polling day. Check ECI for constituency-specific timings.', color: 'teal' },
];

interface FloatingOrbProps {
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ color, size, top, left, delay, duration }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[80px] opacity-30"
    style={{ background: color, width: size, height: size, top, left }}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <div className="min-h-screen relative">
      <div className="page-bg" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
        style={{ scaleX, background: 'linear-gradient(90deg, #FF8C00 33%, #ffffff 33% 66%, #06A77D 66%)' }}
      />

      {/* ─── Navigation ─── */}
      <nav className="sticky top-0 z-50 border-b border-white/5"
        style={{ background: 'rgba(10,14,26,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF8C00, #FF6B00)' }}>
              <Vote size={22} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Election<span style={{ color: '#FF8C00' }}>Edu</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">AI-Powered Civic Portal</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Process', 'Locator', 'AI Guide'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[12px] font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron-500 transition-all group-hover:w-full" style={{ background: '#FF8C00' }}></span>
              </a>
            ))}
            <div className="w-px h-5 bg-white/10" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-xs py-2.5 px-5 group"
            >
              Get Started <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ─── Hero ─── */}
        <section className="relative pt-32 pb-24 px-8">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <FloatingOrb color="#FF8C00" size="600px" top="-20%" left="60%" delay={0} duration={15} />
            <FloatingOrb color="#0052CC" size="500px" top="40%" left="-10%" delay={2} duration={18} />
            <FloatingOrb color="#06A77D" size="400px" top="60%" left="70%" delay={4} duration={20} />
            
            {/* Subtle Ashoka Chakra watermark */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none mix-blend-overlay"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="50" cy="50" r="48" />
                <circle cx="50" cy="50" r="40" />
                {Array.from({ length: 24 }).map((_, i) => (
                  <line key={i} x1="50" y1="50" x2="50" y2="2" transform={`rotate(${i * 15} 50 50)`} />
                ))}
              </svg>
            </motion.div>
          </div>

          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="badge badge-saffron mx-auto mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
                Live Hackathon Demo • Bharat 2026
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                className="heading-serif mb-6 relative z-10"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1.0' }}
              >
                Your Voice,{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#FF8C00]/20 via-[#FFC45E]/20 to-[#FF8C00]/20 blur-xl rounded-full opacity-50 animate-pulse"></span>
                  <span style={{ 
                    background: 'linear-gradient(to right, #FF8C00, #FFC45E, #FF8C00)', 
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    animation: 'shine 3s linear infinite'
                  }}>
                    India's
                  </span>
                </span>
                {' '}Future
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                India's first AI-native election portal — combining Google Gemini intelligence
                with real-time polling station data to make democracy more accessible for every citizen.
              </motion.p>

              {/* Tricolor bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="tricolor-bar max-w-xs mx-auto mb-8"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-20 relative z-10"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(255, 140, 0, 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary group"
                  aria-label="Check your voter readiness"
                >
                  Check Your Readiness <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary group"
                  aria-label="Find polling booth near you"
                >
                  <Globe size={16} aria-hidden="true" className="transition-transform group-hover:rotate-12" /> Find Polling Booth
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10"
              >
                {STATS.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: s.delay, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`card-${s.color === 'saffron' ? 'saffron' : s.color === 'teal' ? 'teal' : 'blue'} p-8 text-center relative overflow-hidden group cursor-default`}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                    <div className="stat-number text-4xl mb-3 text-white group-hover:scale-110 transition-transform duration-300 transform origin-bottom">{s.value}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-2">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Voter Readiness ─── */}
        <section className="py-28 px-8">
          <div className="container max-w-5xl">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.2)' }}>
                <ShieldCheck size={24} style={{ color: '#FF8C00' }} />
              </div>
              <h2 className="heading-serif text-4xl text-white mb-4">Voter Readiness Dashboard</h2>
              <p className="text-lg text-slate-400 max-w-2xl">Track your preparedness before polling day to ensure a smooth and hassle-free voting experience.</p>
            </div>
            <VoterReadiness />
          </div>
        </section>

        {/* ─── Election Lifecycle ─── */}
        <section id="process" className="py-28 px-8 border-t border-white/5" style={{ background: 'rgba(15,22,40,0.5)' }}>
          <div className="container max-w-6xl">
            <div className="flex flex-col items-center text-center mb-20">
              <div className="badge badge-blue mb-6">
                <FileText size={14} /> Electoral Process
              </div>
              <h2 className="heading-serif text-5xl text-white mb-6">Election Lifecycle</h2>
              <p className="text-lg text-slate-400 max-w-2xl">From voter registration to result declaration — every stage of India's democratic process, explained clearly.</p>
              <div className="tricolor-bar w-32 mt-8" />
            </div>
            <Timeline />
          </div>
        </section>

        {/* ─── Locator & Assistant ─── */}
        <section className="py-28 px-8">
          <div className="container max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
              {/* Polling Locator */}
              <div id="locator" className="flex flex-col h-full">
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="badge badge-blue"><Globe size={14} /> Google Services</div>
                  </div>
                  <h2 className="heading-serif text-4xl text-white mb-4">Find Your Booth</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">Real-time polling station discovery with live crowd estimates and seamless navigation to ensure you avoid the rush.</p>
                </div>
                <PollingLocator />
              </div>

              {/* AI Assistant */}
              <div id="ai-guide" className="flex flex-col h-full">
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="badge badge-teal"><ShieldCheck size={14} /> Gemini 1.5 Flash</div>
                  </div>
                  <h2 className="heading-serif text-4xl text-white mb-4">Ask Your AI Guide</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">Your personal expert on voter rights, election laws, and candidate information — available instantly to clarify any doubts.</p>
                </div>
                <Assistant />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Quick Facts Banner ─── */}
        <section className="py-20 px-8 border-t border-b border-white/5" style={{ background: 'rgba(0,53,128,0.05)' }}>
          <div className="container max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {QUICK_FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <motion.div 
                    key={fact.title} 
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`card-${fact.color} p-8 flex flex-col items-start gap-6 cursor-default transition-all duration-300 hover:shadow-2xl`}
                    style={{ 
                      boxShadow: fact.color === 'saffron' ? '0 10px 40px -10px rgba(255,140,0,0)' : 'none'
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: fact.color === 'saffron' ? 'rgba(255,140,0,0.1)' : fact.color === 'blue' ? 'rgba(0,82,204,0.1)' : 'rgba(6,167,125,0.1)',
                        color: fact.color === 'saffron' ? '#FFA742' : fact.color === 'blue' ? '#6B9FFF' : '#0CC594'
                      }}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{fact.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{fact.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="py-16 px-8 border-t border-white/5" style={{ background: '#070B17' }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF8C00, #FF6B00)' }}>
                  <Vote size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ElectionEdu</span>
              </div>
              <div className="tricolor-bar w-20 mb-4" />
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Empowering India's 96.8 crore voters with AI-native civic intelligence. Built on Google Gemini for Bharat's largest democracy.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Platform</p>
              <ul className="space-y-3 text-sm text-slate-500">
                {['Process', 'Locator', 'AI Guide', 'Readiness'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="card-saffron p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle size={14} style={{ color: '#FFA742' }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FFA742' }}>ECI Helpline</span>
                </div>
                <div className="stat-number text-4xl text-white mb-1">1950</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Toll-Free • 24×7</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600">© 2026 ElectionEdu • Built for PromptWars Hackathon • Powered by Google Gemini</p>
            <div className="flex gap-6 text-xs text-slate-600">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">ECI Official</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
