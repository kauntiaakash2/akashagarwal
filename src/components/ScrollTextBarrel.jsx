import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const barrelItems = [
  "Akash Agarwal",
  "Software Engineer",
  "Garage Builder",
  "ML Developer",
  "Full-Stack Creator",
  "Problem Solver",
];

const BARREL_RADIUS = 260;

export default function ScrollTextBarrel({ items = barrelItems }) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const segmentAngle = 360 / items.length;

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black" aria-label="Scroll-linked 3D text barrel">
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: "1200px" }}>
          <motion.div
            className="relative flex h-48 w-full items-center justify-center"
            style={{ rotateX, transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => {
              const itemRotateX = index * segmentAngle;

              return (
                <motion.p
                  key={`${item}-${index}`}
                  className="absolute m-0 w-full px-6 text-center text-5xl font-bold tracking-tighter text-white md:text-7xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: `rotateX(${itemRotateX}deg) translateZ(${BARREL_RADIUS}px)`,
                  }}
                >
                  {item}
                </motion.p>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
