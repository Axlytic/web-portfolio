import React from 'react';
import { Eye, Layers, Zap, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface BentoGridProps {
  theme: 'dark' | 'light';
}

export const BentoGrid: React.FC<BentoGridProps> = ({ theme }) => {
  const cardBg =
    theme === 'dark'
      ? 'bg-[#121218]/60 border-white/10 text-white shadow-2xl hover:border-orange-500/30'
      : 'bg-white/80 border-zinc-200 text-zinc-900 shadow-xl hover:border-orange-500/40';

  return (
    <section
      id="about"
      className={`relative w-full py-28 px-6 md:px-12 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#08080a]' : 'bg-[#e5e5ea]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-orange-500 bg-orange-500/10 border border-orange-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Core Capabilities
          </span>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-zinc-950'
            }`}
          >
            Crafted for the AI Era.
          </h2>
          <p
            className={`mt-4 text-base transition-colors ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Seamlessly fusing interactive 3D motion, editorial typography, and generative AI
            into unforgettable web experiences.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Large Span 2 Columns */}
          <div
            className={`md:col-span-2 p-8 md:p-10 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-500 font-bold">
                Scroll-Driven Frame Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 leading-tight">
                150-Frame Zero-Lag Canvas Animation
              </h3>
              <p
                className={`mt-3 max-w-xl text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Every mouse scroll movement is interpolated with smooth linear lerp curves.
                Frames stream seamlessly from memory with retina DPR scaling, eliminating
                video scrubbing stutter.
              </p>
            </div>

            {/* Visual simulation bar */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}>
                Frame Target: 150/150 • FPS: 60Hz
              </span>
              <span className="text-emerald-400 font-semibold">Ready & Optimized</span>
            </div>
          </div>

          {/* Card 2: 1 Column Vertical */}
          <div
            className={`p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                Dual Mode
              </span>
              <h3 className="text-2xl font-bold mt-2">
                Dynamic Inversion
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Seamless real-time contrast inversion. In light mode, the silhouette is bold
                and dark; in dark mode, the character glows with electric cyber luminosity.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <div className="w-3 h-3 rounded-full bg-zinc-900 border border-white/20" />
              <span className="text-xs font-mono text-zinc-500">Live Palette Switch</span>
            </div>
          </div>

          {/* Card 3: 1 Column */}
          <div
            className={`p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-500 font-bold">
                Atmospheric Depth
              </span>
              <h3 className="text-xl font-bold mt-2">
                Cinematic Vignette
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Radial and linear soft gradients guarantee razor-sharp text legibility across
                all 150 frames.
              </p>
            </div>
          </div>

          {/* Card 4: Span 2 Columns */}
          <div
            className={`md:col-span-2 p-8 md:p-10 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-500 font-bold">
                Editorial Aesthetics
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                Warsaw-Inspired Minimalist Typography
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Combining bold Swiss typography proportions with subtle glowing strokes,
                frosted glass cards, and fluid responsive scaling down to mobile viewports.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Mobile Responsive
              </span>
              <span>Ultra-Clean Codebase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

