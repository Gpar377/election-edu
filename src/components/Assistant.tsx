import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, RefreshCcw, Sparkles, User, Terminal } from 'lucide-react';
import { chatWithGemini } from '../services/GeminiService';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  isError?: boolean;
}

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello. I am ElectionEdu AI, your intelligent guide to the democratic process. I am powered by Google Gemini to provide you with verified, context-aware information. How can I help you today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithGemini(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I encountered a synchronization error. Please check your network or API configuration.", 
        isError: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass-panel flex flex-col h-[600px] overflow-hidden border-white/10 shadow-2xl">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
             <Bot size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Gemini 1.5 Pro</h3>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'user' 
                    ? 'bg-white text-black border-white' 
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                </div>
                <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white text-black font-medium'
                    : msg.isError 
                      ? 'bg-red-500/10 border border-red-500/20 text-red-200' 
                      : 'bg-white/[0.03] border border-white/5 text-slate-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
             <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 animate-pulse">
                   <Bot size={18} />
                </div>
                <div className="flex gap-1.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
             </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white/[0.01] border-t border-white/5">
        <div className="relative flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about voter rights, registration, or polling..."
            className="input-noir pr-32"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
           <Terminal size={12} className="text-slate-600" />
           <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">End-to-End Encrypted Verification Portal</p>
        </div>
      </div>
    </div>
  );
};
