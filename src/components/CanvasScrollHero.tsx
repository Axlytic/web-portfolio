import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HeroOverlay } from './HeroOverlay';

interface CanvasScrollHeroProps {
  theme: 'dark' | 'light';
  totalFrames?: number;
}

export const CanvasScrollHero: React.FC<CanvasScrollHeroProps> = ({
  theme,
  totalFrames = 150,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Separate image caches for Light and Dark modes
  const lightImagesRef = useRef<HTMLImageElement[]>([]);
  const darkImagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  // 1. Preload frames for current theme first, then secondary theme in background
  useEffect(() => {
    let isCancelled = false;

    const loadSet = (folder: string, ref: React.MutableRefObject<HTMLImageElement[]>, isPrimary: boolean) => {
      const arr: HTMLImageElement[] = [];
      let count = 0;

      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const numStr = String(i).padStart(3, '0');
        img.src = `${folder}/frame-${numStr}.jpg`;

        img.onload = () => {
          if (isCancelled) return;
          if (isPrimary) {
            count++;
            setLoadedCount(count);
            if (count >= 15) {
              setIsReady(true);
            }
          }
        };

        arr.push(img);
      }
      ref.current = arr;
    };

    if (theme === 'dark') {
      loadSet('/frames-dark', darkImagesRef, true);
      loadSet('/frames', lightImagesRef, false);
    } else {
      loadSet('/frames', lightImagesRef, true);
      loadSet('/frames-dark', darkImagesRef, false);
    }

    return () => {
      isCancelled = true;
    };
  }, [theme, totalFrames]);

  // 2. Scroll listener
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) return;

    // Progress from 0.0 (top) to 1.0 (bottom of hero section)
    const currentScroll = -rect.top;
    const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

    setScrollProgress(progress);

    targetFrameRef.current = Math.min(
      Math.floor(progress * (totalFrames - 1)),
      totalFrames - 1
    );
  }, [totalFrames]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 3. Render loop with Lerp smoothing & Retina DPR scaling
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const activeImages = theme === 'dark' ? darkImagesRef.current : lightImagesRef.current;

      if (canvas && ctx && activeImages.length > 0) {
        // Linear Interpolation (Lerp) for smooth easing
        currentFrameRef.current +=
          (targetFrameRef.current - currentFrameRef.current) * 0.12;

        const frameIndex = Math.min(
          Math.max(Math.round(currentFrameRef.current), 0),
          totalFrames - 1
        );

        const img = activeImages[frameIndex];
        if (img && img.complete && img.naturalWidth > 0) {
          const dpr = window.devicePixelRatio || 1;
          const displayWidth = window.innerWidth;
          const displayHeight = window.innerHeight;

          if (
            canvas.width !== Math.floor(displayWidth * dpr) ||
            canvas.height !== Math.floor(displayHeight * dpr)
          ) {
            canvas.width = Math.floor(displayWidth * dpr);
            canvas.height = Math.floor(displayHeight * dpr);
          }

          ctx.save();
          ctx.scale(dpr, dpr);

          // Object-fit: cover algorithm
          const hRatio = displayWidth / img.naturalWidth;
          const vRatio = displayHeight / img.naturalHeight;
          const ratio = Math.max(hRatio, vRatio);

          const centerShiftX = (displayWidth - img.naturalWidth * ratio) / 2;
          const centerShiftY = (displayHeight - img.naturalHeight * ratio) / 2;

          ctx.clearRect(0, 0, displayWidth, displayHeight);
          ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            centerShiftX,
            centerShiftY,
            img.naturalWidth * ratio,
            img.naturalHeight * ratio
          );

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [theme, totalFrames]);

  const loadPercent = Math.min(Math.round((loadedCount / 30) * 100), 100);

  return (
    <div
      ref={containerRef}
      className={`relative h-[350vh] w-full transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#08080a]' : 'bg-[#e5e5ea]'
      }`}
    >
      {/* Loading Overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080a] text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-zinc-400">
              Initializing 3D Engine
            </span>
          </div>
          <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="mt-3 text-xs font-mono text-zinc-500">
            {loadPercent}%
          </span>
        </div>
      )}

      {/* Sticky Viewport: Canvas & Hero Overlay Stay Pinned During Scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 1. Canvas Layer (No inverted negative filter!) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* 2. Soft Atmospheric Vignette Gradients */}
        {theme === 'dark' ? (
          <>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/40 to-transparent w-[55%]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-[#08080a]/85 via-transparent to-transparent w-[35%] ml-auto" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#e5e5ea]/85 via-[#e5e5ea]/30 to-transparent w-[50%]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-[#e5e5ea]/80 via-transparent to-transparent w-[35%] ml-auto" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#e5e5ea] via-transparent to-[#e5e5ea]/40" />
          </>
        )}

        {/* 3. Hero Overlay (Inside Sticky Container, so it scrolls away naturally when hero ends!) */}
        <HeroOverlay theme={theme} scrollProgress={scrollProgress} />
      </div>
    </div>
  );
};
