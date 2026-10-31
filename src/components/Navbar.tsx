import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      const time = now.toLocaleTimeString('en-US', options);
      const date = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setTimeString(`${time} • ${date}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = ['Home', 'Product', 'About', 'Brands', 'Careers', 'Partners'];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo: Zenrixa */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center p-1.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-full h-full text-black stroke-[2.5]"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            className={`text-xl font-extrabold tracking-tight transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Zenrixa
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-orange-500 ${
                idx === 0
                  ? theme === 'dark'
                    ? 'text-white font-semibold'
                    : 'text-zinc-950 font-semibold'
                  : theme === 'dark'
                  ? 'text-zinc-400'
                  : 'text-zinc-600'
              }`}
            >
              {link}
              {idx === 0 && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500" />
              )}
            </a>
          ))}
        </nav>

        {/* Right Section: Timezone / Theme Toggle / Menu */}
        <div className="flex items-center gap-4">
          {/* Live Warsaw Timezone pill */}
          <div
            className={`hidden md:flex flex-col text-right text-xs transition-colors ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider text-orange-500 font-bold">
              Timezone
            </span>
            <span className="font-mono">{timeString || '6:30pm • 23 June, 2024'}</span>
          </div>

          {/* Theme Toggle Button (Light <-> Dark) */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark and Light Mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className={`relative p-2.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
              theme === 'dark'
                ? 'bg-zinc-900/80 border-white/10 text-amber-400 hover:bg-zinc-800 shadow-md shadow-amber-400/10'
                : 'bg-white/90 border-zinc-300 text-zinc-800 hover:bg-zinc-100 shadow-md shadow-zinc-300/40'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 transition-transform rotate-0" />
            ) : (
              <Moon className="w-4 h-4 transition-transform rotate-0" />
            )}
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-white/5 border-white/15 text-white hover:bg-white/10'
                : 'bg-black/5 border-black/15 text-zinc-900 hover:bg-black/10'
            }`}
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="w-3.5 h-3.5" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden mt-4 mx-auto max-w-md rounded-2xl p-6 border shadow-2xl transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-[#121218]/95 border-white/10 text-white'
              : 'bg-white/95 border-zinc-200 text-zinc-900'
          } backdrop-blur-2xl`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-semibold py-1 hover:text-orange-500"
              >
                <span>{link}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

