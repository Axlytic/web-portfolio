import React from 'react';
import { ArrowRight, Star, ChevronRight, ChevronLeft, Sparkles, ArrowDown } from 'lucide-react';

interface HeroOverlayProps {
  theme: 'dark' | 'light';
  scrollProgress: number;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ theme, scrollProgress }) => {
  // Fade out hero UI as camera completes zoom into the character (progress 0.65 -> 0.92)
  const fadeStart = 0.65;
  const fadeEnd = 0.90;
  const opacity =
    scrollProgress <= fadeStart
      ? 1
      : scrollProgress >= fadeEnd
      ? 0
      : 1 - (scrollProgress - fadeStart) / (fadeEnd - fadeStart);

  const translateY =
    scrollProgress <= fadeStart
      ? 0
      : (scrollProgress - fadeStart) * -80;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto',
      }}
      className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-12 pt-24 md:pt-28 select-none transition-opacity duration-200"
    >
      {/* Middle Content Row: Left Headline & Right Widget */}
      <div className="flex-1 flex flex-col lg:flex-row items-start justify-between gap-12 w-full max-w-7xl mx-auto">
        
        {/* Left Column: Headline, Rating & CTAs */}
        <div className="pointer-events-auto max-w-xl flex flex-col items-start">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-4 w-0.5 bg-orange-500" />
            <span
              className={`text-xs md:text-sm font-semibold tracking-wider uppercase ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Creative Agency
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-zinc-950'
            }`}
          >
            We start from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
              zero
            </span>
            , delivering only what{' '}
            <span className="relative inline-block">
              matters.
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-orange-500/80 rounded-full" />
            </span>
          </h1>

          {/* Social Proof: 5 Stars + 3000+ Customers */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span
              className={`text-xs md:text-sm font-medium ${
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              <strong className="font-bold">3000+</strong> Customers
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {/* Primary CTA: Chat With Us */}
            <button
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-sm shadow-xl shadow-orange-500/10 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Chat With Us</span>
              <div className="w-6 h-6 rounded-full bg-orange-500 text-black flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Secondary CTA: Our Works */}
            <button
              className={`px-6 py-3.5 rounded-full text-sm font-semibold border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-black/5 border-black/10 text-zinc-900 hover:bg-black/10'
              }`}
            >
              Our Works
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Widget Card & Partners */}
        <div className="pointer-events-auto hidden md:flex flex-col items-end gap-6 w-full lg:w-80 ml-auto">
          {/* Glass Card: "Design to explore" */}
          <div
            className={`w-full p-4 rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] ${
              theme === 'dark'
                ? 'bg-zinc-900/50 border-white/10 text-white shadow-black/60'
                : 'bg-white/70 border-zinc-200 text-zinc-900 shadow-zinc-300/60'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Inner Mini Card */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 flex items-center justify-center p-3 text-orange-400 shadow-inner group">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/5 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 animate-pulse text-orange-400" />
                </div>
              </div>

              {/* Card Text & Navigation Buttons */}
              <div className="flex-1 flex flex-col justify-between h-24 py-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-orange-500">
                    Featured
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <h3 className="text-base font-bold leading-tight">
                    Design to explore.
                  </h3>
                </div>
                {/* Micro Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="w-12 h-1 bg-zinc-400/30 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-orange-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="w-5 h-5 rounded-full bg-zinc-500/20 flex items-center justify-center hover:bg-zinc-500/40 text-xs transition">
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button className="w-5 h-5 rounded-full bg-zinc-500/20 flex items-center justify-center hover:bg-zinc-500/40 text-xs transition">
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Partners Minimal Monochrome List */}
          <div className="w-full flex flex-col items-end">
            <span
              className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              Our Partners
            </span>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2.5 opacity-60 hover:opacity-90 transition-opacity">
              {['zantic', 'BookStore', 'Wager', 'Crona', 'Mercury', 'Kinetix'].map((brand) => (
                <span
                  key={brand}
                  className={`text-xs font-mono tracking-tight font-bold ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'
                  }`}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Giant Typography ZENRIXA + Floating Status Pill */}
      <div className="w-full flex flex-col items-center justify-end pb-2">
        {/* Giant Typography Brand: ZENRIXA */}
        <div className="w-full text-center overflow-hidden leading-none select-none">
          <h2
            className={`font-black tracking-tighter text-[15vw] leading-none transition-all duration-700 ${
              theme === 'dark'
                ? 'brand-stroke-dark text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent'
                : 'brand-stroke-light text-transparent bg-clip-text bg-gradient-to-b from-black/20 via-black/5 to-transparent'
            }`}
          >
            ZENRIXA
          </h2>
        </div>

        {/* Bottom Floating Pill Bar */}
        <div className="pointer-events-auto mt-2">
          <div
            className={`inline-flex items-center gap-6 px-6 py-2.5 rounded-full border shadow-lg backdrop-blur-xl text-xs font-medium tracking-wide transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#121218]/70 border-white/10 text-zinc-300 shadow-black/40'
                : 'bg-white/80 border-zinc-200 text-zinc-700 shadow-zinc-300/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>10+ Years Exp</span>
            </div>
            <span className="text-zinc-500">•</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Based in Warsaw</span>
            </div>
            <span className="text-zinc-500">•</span>
            <div className="flex items-center gap-1 text-orange-500 font-semibold group cursor-pointer">
              <span>Scroll Down</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

