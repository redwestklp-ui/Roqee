import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  duration?: number;
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  duration = 1400,
  onLoaded 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) {
        onLoaded();
      }
    }, duration + 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onLoaded]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-500 ease-in-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* دائرة تدور */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white/25 border-t-[#C6A16B] animate-spin"></div>

      {/* نص يرجى الانتظار */}
      <p className="font-alexandria font-bold text-base sm:text-lg text-white mt-4 tracking-wide drop-shadow-md">
        يرجى الانتظار
      </p>
    </div>
  );
};
