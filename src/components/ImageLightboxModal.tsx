import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  images: { url: string; title: string; category?: string }[];
  currentIndex: number;
  apartmentName: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  apartmentName,
  onClose,
  onPrev,
  onNext,
  onSelectIndex
}) => {
  // Handle ESC and Arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNext(); // in RTL, arrow left goes next
      } else if (e.key === 'ArrowRight') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div 
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-right">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6A16B]"></span>
          <span className="text-white font-alexandria font-bold text-sm sm:text-base">
            {apartmentName}
          </span>
          <span className="text-xs text-[#C6A16B] bg-[#570A1B] px-2.5 py-0.5 rounded-full border border-[#C6A16B]/40">
            {currentIndex + 1} من {images.length}
          </span>
        </div>

        {/* Big Prominent Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 transition-all cursor-pointer shadow-lg group"
          title="إغلاق الصورة (Esc)"
        >
          <span className="text-xs font-alexandria font-bold group-hover:text-[#C6A16B] transition-colors">إغلاق</span>
          <X className="w-5 h-5 text-white group-hover:text-[#C6A16B] transition-colors" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 select-none"
        onClick={onClose}
      >
        {/* Navigation Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          type="button"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#570A1B]/80 hover:bg-[#570A1B] text-white border-2 border-[#C6A16B] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
          title="الصورة السابقة"
          aria-label="الصورة السابقة"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#C6A16B]" />
        </button>

        {/* Main Image */}
        <div 
          className="max-h-[75vh] max-w-[94vw] sm:max-w-[85vw] flex items-center justify-center relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className="max-h-[75vh] max-w-full object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Navigation Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          type="button"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#570A1B]/80 hover:bg-[#570A1B] text-white border-2 border-[#C6A16B] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
          title="الصورة التالية"
          aria-label="الصورة التالية"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#C6A16B]" />
        </button>
      </div>

      {/* Bottom Bar: Caption and Thumbnails */}
      <div 
        className="w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-3 pb-5 px-4 sm:px-6 space-y-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Caption */}
        <div className="text-center">
          <p className="text-white font-alexandria font-bold text-sm sm:text-base drop-shadow">
            {currentImage.title}
          </p>
        </div>

        {/* Thumbnails row */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-xl mx-auto scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`relative shrink-0 w-14 h-10 sm:w-18 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#C6A16B] scale-105 ring-2 ring-[#570A1B]'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
