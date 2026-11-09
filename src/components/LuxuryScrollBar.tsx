import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface SectionMarker {
  id: string;
  label: string;
  shortLabel: string;
}

const SECTIONS: SectionMarker[] = [
  { id: 'hero', label: 'الرئيسية · البداية', shortLabel: 'الرئيسية' },
  { id: 'features', label: 'تجهيزات وخدمات VIP', shortLabel: 'التجهيزات' },
];

interface LuxuryScrollBarProps {
  currentView: string;
}

export const LuxuryScrollBar: React.FC<LuxuryScrollBarProps> = ({ currentView }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
        setScrollProgress(progress);
      }

      // Only check sections on home view
      if (currentView === 'home') {
        const scrollPosition = window.scrollY + 250;
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Handle click on the track to jump smoothly
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.min(1, Math.max(0, clickY / rect.height));
    const targetScroll = ratio * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Scroll to specific section
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70; // Header height offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to bottom
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickY = moveEvent.clientY - rect.top;
      const ratio = Math.min(1, Math.max(0, clickY / rect.height));
      const targetScroll = ratio * (document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: targetScroll });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const currentSectionObj = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <>
      <div 
        className="no-print fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isDragging) setIsHovered(false);
      }}
    >
      {/* Scroll Bar Outer Card */}
      <div className={`relative flex flex-col items-center py-2.5 px-1.5 rounded-full bg-gradient-to-b from-[#570A1B]/85 via-[#4a0817]/90 to-[#3d0613]/85 backdrop-blur-md border border-[#C6A16B]/50 shadow-[0_8px_25px_rgba(36,20,17,0.35)] transition-all duration-300 ${
        isHovered || isDragging ? 'border-[#C6A16B] shadow-[0_0_20px_rgba(198,161,107,0.4)] scale-105' : 'hover:border-[#C6A16B]/80'
      }`}>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          title="الانتقال إلى أعلى الصفحة"
          className="w-5 h-5 rounded-full bg-[#FFF9F1]/10 hover:bg-[#C6A16B] text-[#C6A16B] hover:text-[#570A1B] flex items-center justify-center transition-all duration-200 cursor-pointer mb-2.5 shadow-sm group"
        >
          <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>

        {/* The Vertical Track */}
        <div 
          ref={trackRef}
          onClick={handleTrackClick}
          className="w-1.5 h-44 lg:h-52 bg-[#F3E2CC]/15 rounded-full relative cursor-pointer overflow-visible my-1"
        >
          {/* Subtle filled track up to thumb position */}
          <div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#C6A16B] to-[#ebd2a9] rounded-full opacity-40 transition-all duration-75"
            style={{ height: `${scrollProgress}%` }}
          />

          {/* Section Micro-Markers on Track */}
          {currentView === 'home' && SECTIONS.map((sec, idx) => {
            const topPct = (idx / (SECTIONS.length - 1)) * 94 + 3;
            const isSecActive = activeSection === sec.id;
            return (
              <div
                key={sec.id}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection(sec.id);
                }}
                title={sec.label}
                style={{ top: `${topPct}%` }}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isSecActive
                    ? 'w-2 h-2 bg-[#FFF9F1] shadow-[0_0_8px_#FFF9F1] ring-1 ring-[#C6A16B]'
                    : 'bg-[#C6A16B]/40 hover:bg-[#C6A16B] hover:scale-150'
                }`}
              />
            );
          })}

          {/* The Glowing Royal Gold Thumb */}
          <div
            onMouseDown={handleMouseDown}
            style={{ 
              top: `${Math.min(92, Math.max(0, scrollProgress * 0.92))}%`,
            }}
            className={`absolute left-1/2 -translate-x-1/2 w-3.5 h-5 rounded-full bg-gradient-to-b from-[#FFF9F1] via-[#C6A16B] to-[#9a743b] border border-[#FFF9F1] shadow-[0_0_12px_rgba(198,161,107,0.9)] cursor-grab active:cursor-grabbing transition-transform duration-75 flex items-center justify-center ${
              isDragging ? 'scale-125 shadow-[0_0_18px_rgba(255,249,241,1)]' : 'hover:scale-110'
            }`}
          >
            {/* Inner jewel grip dot */}
            <div className="w-1 h-2 rounded-full bg-[#570A1B]/60" />
          </div>
        </div>

        {/* Scroll To Bottom Button */}
        <button
          onClick={scrollToBottom}
          title="الانتقال إلى أسفل الصفحة"
          className="w-5 h-5 rounded-full bg-[#FFF9F1]/10 hover:bg-[#C6A16B] text-[#C6A16B] hover:text-[#570A1B] flex items-center justify-center transition-all duration-200 cursor-pointer mt-2.5 shadow-sm group"
        >
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
        </button>

      </div>

      {/* Floating Section Info Card (Appears gracefully to the right on hover or drag) */}
      <div 
        className={`absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 origin-left ${
          isHovered || isDragging 
            ? 'opacity-100 scale-100 translate-x-0' 
            : 'opacity-0 scale-95 -translate-x-2'
        }`}
      >
        <div className="bg-[#570A1B] text-[#FFF9F1] px-3.5 py-2 rounded-xl border border-[#C6A16B] shadow-[0_8px_30px_rgba(36,20,17,0.4)] whitespace-nowrap text-right">
          <div className="flex items-center gap-2 mb-0.5">
            <Sparkles className="w-3 h-3 text-[#C6A16B]" />
            <span className="text-xs font-bold text-[#FFF9F1]">
              {currentView === 'home' ? currentSectionObj.label : 'تصفح رُقِيّ'}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[10px] text-[#F3E2CC]/80 font-medium pt-0.5 border-t border-[#C6A16B]/20">
            <span>التمرير السلس</span>
            <span className="font-bold text-[#C6A16B]">٪{Math.round(scrollProgress)}</span>
          </div>
        </div>
      </div>

    </div>
    
    {/* Mobile Compact Floating Scroll-to-Top Button (Left side, above bottom nav) */}
    {scrollProgress > 15 && (
      <button
        onClick={scrollToTop}
        className="no-print fixed left-3 bottom-24 z-40 md:hidden w-10 h-10 rounded-full bg-[#570A1B]/90 backdrop-blur-md border border-[#C6A16B] text-[#C6A16B] shadow-[0_4px_16px_rgba(36,20,17,0.35)] flex items-center justify-center transition-all duration-300 active:scale-95"
        title="العودة للأعلى"
      >
        <ChevronUp className="w-5 h-5 text-[#C6A16B]" />
      </button>
    )}
  </>
  );
};
