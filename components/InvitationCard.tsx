
import React, { useState, useEffect } from 'react';

interface InvitationCardProps {
  name: string;
  onAccept: () => void;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ name, onAccept }) => {
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [hasStartedEscaping, setHasStartedEscaping] = useState(false);

  // Function to calculate a random position for the elusive button
  const moveButton = () => {
    // We want to keep the button within the viewport but jumpy
    // Using fixed positioning after the first attempt to allow it to travel "around the page"
    const padding = 80;
    const randomX = Math.random() * (window.innerWidth - padding * 2) + padding;
    const randomY = Math.random() * (window.innerHeight - padding * 2) + padding;

    setHasStartedEscaping(true);
    setNoButtonStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      zIndex: 100,
      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: 'translate(-50%, -50%)', // Center it on the coordinates
      margin: 0,
    });
  };

  const handleNoAction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    moveButton();
  };

  const handleNoHover = () => {
    // On desktop, jump away before they even click
    if (window.matchMedia("(pointer: fine)").matches) {
      moveButton();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border-4 border-white text-center space-y-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="space-y-4">
          <div className="text-6xl mb-4 pulse-soft inline-block">💝</div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 font-cursive tracking-wide leading-tight">
            Hey {name}!
          </h1>
          <p className="text-xl md:text-2xl text-pink-700 font-semibold leading-relaxed">
            Will you be my Valentine? 🌹
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <button
            onClick={onAccept}
            className="w-full sm:w-auto group relative px-10 py-4 bg-red-500 hover:bg-red-600 text-white text-xl font-black rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg hover:shadow-red-200 min-w-[140px]"
          >
            <span className="relative z-10">Yes! 💖</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
          </button>

          <button
            onClick={handleNoAction}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoAction} // Immediate response on mobile touch
            style={noButtonStyle}
            className={`${
              hasStartedEscaping ? 'shadow-xl' : ''
            } w-full sm:w-auto px-10 py-4 border-2 border-pink-200 text-pink-400 text-xl font-bold rounded-full hover:bg-pink-50 transition-all min-w-[140px]`}
          >
            No 😢
          </button>
        </div>
        
        <p className="text-xs text-pink-300 italic pt-2 font-medium">
          * Hint: It seems you can't say no! 😉
        </p>
      </div>
    </div>
  );
};

export default InvitationCard;
