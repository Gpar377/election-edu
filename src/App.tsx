import { motion, useScroll, useSpring } from 'framer-motion';
import { Assistant } from './components/Assistant';
import { Timeline } from './components/Timeline';
import { PollingLocator } from './components/PollingLocator';
import { VoterReadiness } from './components/VoterReadiness';
import { Vote, ShieldCheck, Globe, HelpCircle, ArrowUpRight } from 'lucide-react';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white relative">
      <div className="bg-mesh" />
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-white/10 group cursor-pointer">
              <Vote className="text-black transition-transform group-hover:rotate-12" size={28} />
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter text-white">ELECTION<span className="text-indigo-500">EDU</span></span>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">AI Intelligence Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#process" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Process</a>
            <a href="#locator" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Locator</a>
            <a href="#assistant" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">AI Guide</a>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <a href="https://github.com" target="_blank" className="text-slate-400 hover:text-white transition-colors">
              <Globe size={20} />
            </a>
            <button className="btn-noir py-2.5 px-6 text-xs">Launch App</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="container text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Hackathon Prototype v2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85]"
            >
              DEMOCRACY, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400">REIMAGINED.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-2xl mx-auto text-xl mb-12 font-medium"
            >
              The first AI-native platform designed to bridge the gap between citizens and the democratic process. Powered by Google Gemini 1.5 Flash.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <button className="btn-noir">Get Started Now <ArrowUpRight size={20} /></button>
              <button className="btn-ghost">Watch Presentation</button>
            </motion.div>
          </div>
        </section>

        {/* Voter Readiness Dashboard */}
        <section className="py-24 px-6">
          <div className="container">
             <VoterReadiness />
          </div>
        </section>

        {/* Interactive Roadmap */}
        <section id="process" className="py-24 border-y border-white/5 bg-white/[0.01]">
          <div className="container">
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Election Lifecycle</h2>
              <p className="text-slate-500 font-medium max-w-xl">A comprehensive guide from the moment you register to the day your vote shapes the future.</p>
            </div>
            <Timeline />
          </div>
        </section>

        {/* Locator & AI Section */}
        <section className="py-32 px-6">
          <div className="container grid lg:grid-cols-2 gap-20">
            <div id="locator">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-indigo-500" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Google Services</span>
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Polling Locator</h2>
                <p className="text-slate-500 font-medium">Real-time station discovery with live crowd intelligence and navigation assistance.</p>
              </div>
              <PollingLocator />
            </div>

            <div id="assistant">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-indigo-500" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Gemini 1.5 Flash</span>
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">AI Knowledge Assistant</h2>
                <p className="text-slate-500 font-medium">Your personal expert on constitutional rights, election procedures, and candidate verification.</p>
              </div>
              <Assistant />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-black/80">
        <div className="container grid md:grid-cols-3 gap-16 items-start">
          <div className="col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <Vote size={32} className="text-white" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase">ElectionEdu</span>
            </div>
            <p className="text-slate-500 text-sm mb-12 leading-relaxed">
              Empowering the world's largest democracy with intelligent, accessible, and secure digital infrastructure. Built for Bharat.
            </p>
            <div className="flex gap-6">
               <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"><Globe size={24} /></div>
               <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"><Globe size={24} /></div>
            </div>
          </div>
          
          <div className="col-span-1 grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Platform</p>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Locator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Resources</p>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ECI API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>

          <div className="col-span-1">
            <div className="glass-panel p-8 bg-white/[0.02]">
              <p className="text-xs font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-indigo-400">
                <HelpCircle size={14} />
                Voter Helpline
              </p>
              <p className="text-4xl font-black mb-3 tracking-tighter text-white">1950</p>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-[0.2em] font-bold">Toll-Free Government Support</p>
            </div>
          </div>
        </div>
        <div className="container mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          <p>© 2026 Bharat AI Initiative • Designed for Impact</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
