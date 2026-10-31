import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative w-full py-16 px-6 md:px-12 border-t transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-[#08080a] border-white/10 text-white'
          : 'bg-[#e5e5ea] border-zinc-300 text-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center p-1 text-black font-extrabold text-xs">
            Z
          </div>
          <span className="text-lg font-bold tracking-tight">ZENRIXA</span>
          <span className="text-xs text-zinc-500 ml-2">© 2026 Zenrixa Studio. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-8 text-xs font-mono text-zinc-500">
          <a href="#home" className="hover:text-orange-500 transition">Privacy</a>
          <a href="#home" className="hover:text-orange-500 transition">Terms</a>
          <a href="#home" className="hover:text-orange-500 transition">Contact</a>
        </div>

        <button
          onClick={scrollToTop}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wider transition-all hover:scale-105 ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white'
              : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'
          }`}
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

