import React from "react";
import { kernelIdentity, kernelZones } from "../data/kernelPortfolio.js";

const KernelScene = React.lazy(() => import("./KernelScene.jsx"));

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function useKernelNavigation() {
  const containerRef = React.useRef(null);
  const scrollProgress = React.useRef(0);
  const pointer = React.useRef({ x: 0, y: 0 });
  const [progress, setProgress] = React.useState(0);
  const [pointerState, setPointerState] = React.useState({ x: 0, y: 0, active: false });

  React.useEffect(() => {
    let rafId = 0;

    const update = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxScroll = container.offsetHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? clamp((window.scrollY - container.offsetTop) / maxScroll) : 0;
      scrollProgress.current = nextProgress;
      setProgress(nextProgress);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    let rafId = 0;

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      pointer.current = { x, y };

      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => setPointerState({ x: event.clientX, y: event.clientY, active: true }));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointer]);

  return { containerRef, scrollProgress, pointer, progress, pointerState };
}

function getActiveZone(progress) {
  if (progress < 0.33) return 0;
  if (progress < 0.67) return 1;
  return 2;
}

function KernelOverlay({ activeZone, progress, hoveredThread, pointerState }) {
  const zone = kernelZones[activeZone];

  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 p-4 text-white md:p-8">
      <div className="col-span-12 flex items-start justify-between border-t border-white/25 pt-3 md:col-span-10 md:col-start-2">
        <div className="max-w-[760px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/58">{zone.label}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.82] tracking-[-0.08em] md:text-[8.4rem]">
            {kernelIdentity.name}
          </h1>
        </div>
        <div className="hidden w-44 border-l border-[#ff3b30] pl-4 font-mono text-[10px] uppercase leading-5 tracking-[0.22em] text-white/62 md:block">
          {zone.coordinates}
        </div>
      </div>

      <div className="col-span-12 row-start-4 self-end border-l border-[#ff3b30] pl-4 md:col-span-4 md:col-start-2 md:row-start-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#ff3b30]">{kernelIdentity.role}</p>
        <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.05em] md:text-4xl">{zone.title}</h2>
        <p className="mt-4 max-w-md font-mono text-xs leading-6 text-white/70 md:text-sm">{activeZone === 0 ? kernelIdentity.specialization : zone.body}</p>
      </div>

      <div className="col-span-12 row-start-6 self-end md:col-span-5 md:col-start-7 md:row-start-5">
        <div className="border border-white/20 bg-black/95 p-4 font-mono shadow-[0_0_0_1px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-[10px] uppercase tracking-[0.24em] text-white/58">
            <span>{hoveredThread ? "THREAD INSPECTOR" : "KERNEL STATUS"}</span>
            <span>{Math.round(progress * 100).toString().padStart(3, "0")}%</span>
          </div>
          <div className="min-h-28 pt-4">
            {hoveredThread ? (
              <>
                <p className="text-xs uppercase tracking-[0.28em] text-[#ff3b30]">{hoveredThread.meta}</p>
                <p className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-white">{hoveredThread.title}</p>
                <p className="mt-3 text-xs leading-6 text-white/68">{hoveredThread.detail}</p>
              </>
            ) : (
              <>
                <p className="text-xs leading-6 text-white/68">{kernelIdentity.thesis}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-white/45">Hover execution monoliths to inspect details.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden w-[min(72vw,820px)] -translate-x-1/2 md:block">
        <div className="h-px bg-white/15">
          <div className="h-px bg-[#ff3b30]" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
          {kernelZones.map((kernelZone, index) => (
            <span key={kernelZone.id} className={index === activeZone ? "text-white" : undefined}>
              {kernelZone.title}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`pointer-events-none absolute hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff3b30] mix-blend-difference md:block ${pointerState.active ? "opacity-100" : "opacity-0"}`}
        style={{ left: pointerState.x, top: pointerState.y }}
      />
    </div>
  );
}

export default function KernelPortfolioExperience() {
  const { containerRef, scrollProgress, pointer, progress, pointerState } = useKernelNavigation();
  const [hoveredThread, setHoveredThread] = React.useState(null);
  const activeZone = getActiveZone(progress);

  return (
    <main ref={containerRef} className="relative h-[420vh] cursor-none bg-black selection:bg-[#ff3b30] selection:text-black">
      <section className="sticky top-0 h-screen overflow-hidden bg-black" aria-label="Akash Agarwal computational graph portfolio">
        <React.Suspense
          fallback={
            <div className="flex h-full items-center justify-center bg-black font-mono text-xs uppercase tracking-[0.35em] text-white/60">
              Booting WebGL kernel
            </div>
          }
        >
          <KernelScene scrollProgress={scrollProgress} pointer={pointer} onHoverThread={setHoveredThread} />
        </React.Suspense>
        <KernelOverlay activeZone={activeZone} progress={progress} hoveredThread={hoveredThread} pointerState={pointerState} />
      </section>
    </main>
  );
}
