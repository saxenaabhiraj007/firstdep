
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const SuccessCard: React.FC = () => {
  const [poem, setPoem] = useState<string>("");
  const [loadingPoem, setLoadingPoem] = useState(false);

  const generateSpecialNote = async () => {
    setLoadingPoem(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a very short, cute, 2-line Valentine's poem for a girl named Gullu who just said 'Yes' to being a Valentine. Keep it sweet and romantic.",
      });
      if (response.text) {
        setPoem(response.text.trim());
      }
    } catch (e) {
      console.error("Failed to generate poem", e);
    } finally {
      setLoadingPoem(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(244,63,94,0.2)] border-4 border-pink-100 text-center space-y-8 animate-[bounceIn_0.8s_both] w-full max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="space-y-3 relative z-10">
        <h2 className="text-5xl md:text-6xl font-black text-red-500 font-cursive drop-shadow-sm">
          Good job!
        </h2>
        <p className="text-pink-600 font-bold italic text-lg md:text-xl tracking-wide">
          Gullu, you made the perfect choice! ❤️
        </p>
      </div>

      {/* Robust CSS-Based "Good Job" Sticker */}
      <div className="relative py-4 flex justify-center items-center">
        {/* Confetti-like background particles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 rounded-full bg-pink-400 animate-ping"
              style={{ 
                transform: `rotate(${i * 45}deg) translateY(-80px)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* The Central "Sticker" */}
        <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 rounded-full p-1 shadow-[0_15px_30px_rgba(244,63,94,0.4)] animate-[pulse_3s_infinite] flex items-center justify-center group transition-transform hover:scale-105">
          <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center p-6 border-4 border-white/50">
            <span className="text-7xl md:text-8xl mb-2 animate-bounce">🏆</span>
            <div className="text-red-500 font-black text-3xl md:text-4xl font-cursive leading-tight">
              Valentine
            </div>
            <div className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-md mt-2">
              Official 2026
            </div>
            <div className="text-pink-400 text-5xl mt-3 animate-pulse">💖</div>
          </div>
          
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full ring-8 ring-pink-200/50 animate-ping opacity-20"></div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 px-2 relative z-10">
        {!poem && !loadingPoem && (
          <button 
            onClick={generateSpecialNote}
            className="group flex items-center gap-3 text-base text-pink-500 hover:text-white transition-all font-black px-6 py-3 bg-pink-50 hover:bg-pink-500 rounded-2xl shadow-sm border-2 border-pink-100"
          >
            <span>Tap for a tiny surprise</span>
            <span className="group-hover:rotate-[20deg] transition-transform text-xl">🎁</span>
          </button>
        )}
        
        {loadingPoem && (
          <div className="flex items-center gap-2 text-pink-500 font-bold animate-pulse text-lg">
            <span>✨</span>
            <span>Writing a special poem for Gullu...</span>
          </div>
        )}
        
        {poem && (
          <div className="bg-gradient-to-br from-white to-pink-50 p-6 rounded-3xl border-2 border-pink-200 italic text-pink-800 animate-[fadeIn_0.8s_ease-out] text-lg md:text-xl shadow-[inset_0_2px_10px_rgba(244,63,94,0.05)] font-medium leading-relaxed">
            "{poem}"
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-pink-100/50">
        <div className="flex justify-center gap-6">
          {['💖', '💐', '🍭', '💐', '💖'].map((emoji, i) => (
            <span key={i} className="animate-bounce text-3xl" style={{ animationDelay: `${i * 0.15}s` }}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
