import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CanvasScrollHero } from './components/CanvasScrollHero';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { BentoGrid } from './components/BentoGrid';
import { Footer } from './components/Footer';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.style.backgroundColor = '#08080a';
      document.body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundColor = '#e5e5ea';
      document.body.style.color = '#09090b';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#08080a] text-white' : 'bg-[#e5e5ea] text-zinc-900'
      }`}
    >
      {/* Fixed Navigation Bar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Hero Container with Sticky 150-Frame Canvas & Internal UI Overlay */}
      <main id="home" className="relative w-full">
        <CanvasScrollHero theme={theme} totalFrames={150} />
      </main>

      {/* Subsequent Sections as Done in the Video Tutorial */}
      <InfiniteMarquee theme={theme} />
      <BentoGrid theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

export default App;
