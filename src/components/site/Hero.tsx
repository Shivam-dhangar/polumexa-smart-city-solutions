import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated grid + glow background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[40rem] h-[40rem] rounded-full bg-eco/20 blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-32 w-[36rem] h-[36rem] rounded-full bg-cyan-accent/15 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.19 152)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.78 0.19 152)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.82 0.17 195)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[15, 35, 55, 75].map((y, i) => (
            <motion.line
              key={i}
              x1="0"
              x2="100%"
              y1={`${y}%`}
              y2={`${y}%`}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="w-3.5 h-3.5 text-eco" />
            AI + IoT for sustainable cities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
          >
            AI Powered <br />
            <span className="text-gradient">Smart Waste</span> Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Transforming cities with intelligent recycling and IoT-powered waste solutions.
            Polumexa Solutions builds the operating system for modern, sustainable municipalities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold btn-glow">
              Live Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold glass hover:bg-secondary/60 transition"
            >
              <Play className="w-4 h-4 text-eco" /> Explore Features
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: "98%", v: "Sorting Accuracy" },
              { k: "12k+", v: "Smart Bins" },
              { k: "40%", v: "Cost Reduction" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-display font-bold text-gradient">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: futuristic smart city visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-eco/30 via-transparent to-cyan-accent/20 blur-2xl" />
            <div className="relative h-full glass rounded-3xl p-6 overflow-hidden">
              <SmartCityArt />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SmartCityArt() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.30 0.10 195)" />
          <stop offset="100%" stopColor="oklch(0.18 0.05 165)" />
        </linearGradient>
        <linearGradient id="bld" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.40 0.10 170)" />
          <stop offset="100%" stopColor="oklch(0.22 0.05 168)" />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%">
          <stop offset="0%" stopColor="oklch(0.85 0.18 148)" />
          <stop offset="100%" stopColor="oklch(0.85 0.18 148 / 0)" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bg)" rx="20" />
      <circle cx="300" cy="120" r="80" fill="url(#sun)" />
      <circle cx="300" cy="120" r="22" fill="oklch(0.92 0.15 145)" />

      {/* Buildings */}
      {[
        [40, 220, 60, 160],
        [110, 180, 50, 200],
        [170, 240, 55, 140],
        [235, 200, 60, 180],
        [305, 230, 55, 150],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="url(#bld)" rx="4" />
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 3 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + 8 + c * 14}
                y={y + 12 + r * 22}
                width="8"
                height="10"
                fill={Math.random() > 0.4 ? "oklch(0.85 0.18 148)" : "oklch(0.40 0.05 170)"}
                opacity={0.85}
              />
            ))
          )}
        </g>
      ))}

      {/* Ground */}
      <rect x="0" y="380" width="400" height="20" fill="oklch(0.20 0.04 168)" />

      {/* Smart bins */}
      {[60, 150, 250, 340].map((x, i) => (
        <g key={i} transform={`translate(${x}, 360)`}>
          <rect x="-8" y="-22" width="16" height="22" fill="oklch(0.78 0.19 152)" rx="2" />
          <circle cx="0" cy="-28" r="3" fill="oklch(0.92 0.18 145)">
            <animate attributeName="opacity" values="1;0.3;1" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Connecting signal arcs */}
      <path d="M60 332 Q 200 240 340 332" stroke="oklch(0.82 0.17 195)" strokeWidth="1.2" fill="none" strokeDasharray="3 4" opacity="0.7">
        <animate attributeName="stroke-dashoffset" from="0" to="14" dur="1.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
