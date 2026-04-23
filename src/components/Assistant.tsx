import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, ChevronRight, RefreshCcw, Sparkles, User, AlertCircle } from 'lucide-react';
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
      content: "Welcome to ElectionEdu AI. I'm equipped with Google Gemini intelligence to help you navigate our democracy. How can I assist you today?",
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
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const aiResponse = await chatWithGemini(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const reset = () => {
    setMessages([{
      role: 'assistant',
      content: "Session reset. How can I help you with the election process?",
    }]);
  };

  return (
    <div className="glass-panel flex flex-col h-[650px] w-full max-w-2xl mx-auto overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              Gemini Intelligence
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-[10px] text-indigo-400 border border-indigo-500/20">1.5 FLASH</span>
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Active Context</span>
            </div>
          </div>
        </div>
        <button onClick={reset} className="p-2.5 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
          <RefreshCcw size={18} className="text-slate-500 hover:text-white" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gradient-to-b from-transparent to-black/10">
        <AnimatePresence mode='popLayout'>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20' 
                    : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5 backdrop-blur-sm'
                }`}>
                  <p className="text-[14px] leading-relaxed font-medium">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
               <Bot size={16} className="text-slate-400" />
             </div>
             <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-5 border-t border-white/10 bg-white/[0.02]">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about registration, election symbols, laws..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none min-h-[60px] max-h-[150px]"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute right-3 bottom-3 p-2.5 rounded-xl transition-all ${
              input.trim() && !isTyping 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between px-1">
          <div className="flex gap-4">
             <button onClick={() => setInput("How do I register to vote?")} className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">Registration</button>
             <button onClick={() => setInput("What is the Model Code of Conduct?")} className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">MCC Rules</button>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <AlertCircle size={12} />
            Official Sources Only
          </div>
        </div>
      </div>
    </div>
  );
};
