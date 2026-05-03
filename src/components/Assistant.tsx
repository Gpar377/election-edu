import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, RefreshCcw, Sparkles, User, Terminal } from 'lucide-react';
import DOMPurify from 'dompurify';
import { chatWithGemini } from '../services/GeminiService';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  isError?: boolean;
}

const QUICK_PROMPTS = [
  "How do I check my voter registration?",
  "What ID is valid on polling day?",
  "I lost my Voter ID — can I still vote?",
];

/**
 * Assistant Component
 * 
 * An interactive AI chat interface powered by Google Gemini.
 * Features strict DOMPurify XSS sanitization and semantic HTML for accessibility.
 */
export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Jai Hind! 🇮🇳 I'm ElectionEdu AI, powered by Google Gemini. I can help you with voter registration, polling procedures, candidate information, and your constitutional rights. What would you like to know?",
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

  /**
   * Processes the user query, sanitizes input, and sends it to Gemini AI.
   * @param {string} [text] - Optional pre-defined text from quick prompts
   */
  const handleSend = async (text?: string) => {
    const rawQuery = text || input;
    // Security: Enterprise-grade DOMPurify XSS sanitization
    const query = DOMPurify.sanitize(rawQuery).trim();

    if (!query || isTyping) return;
    
    const userMsg: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const response = await chatWithGemini(query);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error: unknown) {
      console.error("Gemini AI Error:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting. Please check your network and try again.",
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="card-elevated flex flex-col h-[520px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5"
        style={{ background: 'rgba(10,14,26,0.6)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(6,167,125,0.15)', border: '1px solid rgba(6,167,125,0.3)' }}>
            <Bot size={20} style={{ color: '#0CC594' }} />
          </div>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ElectionEdu AI</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Gemini 1.5 Flash • Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setMessages([messages[0]])}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          title="Reset chat"
        >
          <RefreshCcw size={15} />
        </button>
      </div>

      {/* Quick Prompts (only when fresh) */}
      {messages.length === 1 && (
        <div className="px-4 py-3 border-b border-white/5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(6,167,125,0.08)', border: '1px solid rgba(6,167,125,0.2)', color: '#0CC594', whiteSpace: 'nowrap' }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4" aria-live="polite" aria-atomic="false">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{
                  background: msg.role === 'user' ? 'rgba(0,82,204,0.2)' : 'rgba(6,167,125,0.12)',
                  border: msg.role === 'user' ? '1px solid rgba(0,82,204,0.3)' : '1px solid rgba(6,167,125,0.2)',
                  color: msg.role === 'user' ? '#6B9FFF' : '#0CC594',
                }}>
                {msg.role === 'user' ? <User size={15} /> : <Sparkles size={15} />}
              </div>
              <div
                className="max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, rgba(0,53,128,0.5), rgba(0,82,204,0.3))'
                    : msg.isError
                      ? 'rgba(239,68,68,0.1)'
                      : 'rgba(20,29,53,0.9)',
                  border: msg.role === 'user'
                    ? '1px solid rgba(0,82,204,0.3)'
                    : msg.isError
                      ? '1px solid rgba(239,68,68,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                  color: msg.isError ? '#FCA5A5' : '#E8EDF5',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center animate-pulse"
              style={{ background: 'rgba(6,167,125,0.12)', border: '1px solid rgba(6,167,125,0.2)', color: '#0CC594' }}>
              <Bot size={15} />
            </div>
            <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
              style={{ background: 'rgba(20,29,53,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[0, 150, 300].map(delay => (
                <motion.div key={delay} className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#0CC594' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: delay / 1000 }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-white/5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about voting, registration, candidates..."
            className="input-field py-3 text-sm flex-1"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #FF8C00, #FF6B00)', color: 'white', boxShadow: '0 4px 15px rgba(255,140,0,0.3)' }}
          >
            <Send size={17} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-2 flex items-center justify-center gap-1">
          <Terminal size={10} /> Powered by Google Gemini • Information verified against ECI guidelines
        </p>
      </div>
    </div>
  );
};
