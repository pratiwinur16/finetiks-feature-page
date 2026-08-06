"use client";

import { motion } from "framer-motion";

function HeartShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21s-6.7-4.35-9.3-8.28C1.02 10.6 1.5 7.5 4 6a4.6 4.6 0 0 1 6 1 4.6 4.6 0 0 1 6-1c2.5 1.5 2.98 4.6 1.3 6.72C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

// Deterministic per-particle drift/scale/timing so server and client render
// identically (avoids hydration mismatch from Math.random()).
const PARTICLES = Array.from({ length: 5 }).map((_, i) => ({
  drift: Math.round(Math.sin(i * 2.1) * 12),
  scale: 0.32 + (i % 3) * 0.08,
  delay: i * 0.7,
}));

export default function HeartStream() {
  return (
    <div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-visible">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/2 text-white/70"
          style={{ width: 14, height: 14, marginLeft: -7, marginTop: -7 }}
          initial={{ opacity: 0, x: 0, y: 0, scale: p.scale * 0.6 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -18, -34, -48],
            x: [0, p.drift * 0.5, p.drift, p.drift * 1.2],
            scale: [p.scale * 0.6, p.scale, p.scale, p.scale * 0.8],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          <HeartShape className="h-full w-full" />
        </motion.div>
      ))}

      <motion.div
        className="relative text-white"
        style={{ width: 30, height: 30 }}
        animate={{ scale: [1, 1.16, 1, 1.08, 1] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.3, 0.45, 1],
        }}
      >
        <HeartShape className="h-full w-full" />
      </motion.div>
    </div>
  );
}
