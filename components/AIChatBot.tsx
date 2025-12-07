import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, User, RefreshCw } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi there! I'm the Bricks Toy assistant. Need help finding the perfect gift? Tell me who it's for! 🎁" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); // Placeholder

      const stream = sendMessageToGemini(userMessage.text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Oops, I dropped a brick. Try again?", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-auto" onClick={onClose} />
      
      {/* Chat Window */}
      <div className="bg-white w-full sm:w-[400px] sm:h-[600px] h-[80vh] sm:rounded-2xl shadow-2xl flex flex-col pointer-events-auto transform transition-all animate-in slide-in-from-bottom-4 duration-300 border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-blue to-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Sparkles size={20} className="text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none">Gift Finder AI</h3>
              <p className="text-xs text-blue-100 mt-1">Powered by Gemini 2.5</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-brand-red text-white'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-blue text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                 <RefreshCw size={14} className="animate-spin text-brand-blue" />
                 <span className="text-xs text-gray-500">Building response...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about toys..." 
              className="w-full bg-gray-100 border-0 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all pr-12"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 top-1.5 p-2 bg-brand-blue text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-brand-blue transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-[10px] text-center text-gray-400 mt-2">
            AI can make mistakes. Please check product details.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;