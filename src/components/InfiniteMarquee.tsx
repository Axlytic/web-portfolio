import React from 'react';

interface InfiniteMarqueeProps {
  theme: 'dark' | 'light';
}

const row1Logos = [
  'ZANTIC', 'BOOKSTORE', 'WAGER', 'CRONA', 'MERCURY', 'KINETIX', 'ORION', 'AETHER'
];

const row2Logos = [
  'NEXUS', 'PULSE', 'STRATA', 'CYPHER', 'SYNAPSE', 'LUMINA', 'VOLT', 'ECHO'
];

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ theme }) => {
  return (
    <section
      className={`relative w-full py-20 overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#08080a]' : 'bg-[#e5e5ea]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-orange-500 font-bold">
          Trusted by Next-Gen Leaders
        </span>
        <h3
          className={`text-2xl md:text-3xl font-bold mt-2 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-zinc-900'
          }`}
        >
          Powering World-Class Digital Experiences
        </h3>
      </div>

      {/* Row 1: Right to Left */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex gap-12 items-center animate-marquee-left">
          {[...row1Logos, ...row1Logos, ...row1Logos].map((logo, idx) => (
            <div
              key={idx}
              className={`text-2xl md:text-3xl font-extrabold font-mono tracking-wider transition-colors duration-300 hover:text-orange-500 cursor-default select-none ${
                theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex gap-12 items-center animate-marquee-right">
          {[...row2Logos, ...row2Logos, ...row2Logos].map((logo, idx) => (
            <div
              key={idx}
              className={`text-2xl md:text-3xl font-extrabold font-mono tracking-wider transition-colors duration-300 hover:text-orange-500 cursor-default select-none ${
                theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

