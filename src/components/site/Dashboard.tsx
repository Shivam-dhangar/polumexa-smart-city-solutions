import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";
import { Activity, Leaf, Coins, Truck, MapPin } from "lucide-react";
import { SectionHeader } from "./About";
import { Counter } from "./Counter";

const weeklyData = [
  { day: "Mon", waste: 240, recycled: 180 },
  { day: "Tue", waste: 310, recycled: 230 },
  { day: "Wed", waste: 280, recycled: 220 },
  { day: "Thu", waste: 360, recycled: 290 },
  { day: "Fri", waste: 420, recycled: 350 },
  { day: "Sat", waste: 380, recycled: 320 },
  { day: "Sun", waste: 260, recycled: 210 },
];

const pieData = [
  { name: "Plastic", value: 32, color: "oklch(0.78 0.19 152)" },
  { name: "Organic", value: 41, color: "oklch(0.82 0.17 195)" },
  { name: "Paper", value: 18, color: "oklch(0.75 0.18 95)" },
  { name: "Metal", value: 9, color: "oklch(0.70 0.15 50)" },
];

const zones = ["Zone A — Civic Center", "Zone B — Industrial Park", "Zone C — Apartments", "Zone D — School Block"];

export function DashboardDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const bins = zones.map((z, i) => ({
    name: z,
    fill: Math.min(98, 35 + ((tick * 7 + i * 23) % 60)),
  }));

  return (
    <section id="dashboard" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Live Demo"
          title={<>Smart City <span className="text-gradient">Command Center</span></>}
          subtitle="A glimpse of the Polumexa control plane — operating with realistic simulated telemetry."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          {/* KPI cards */}
          {[
            { icon: Activity, label: "Waste Collected", value: 12480, suffix: " kg", color: "from-eco to-cyan-accent" },
            { icon: Leaf, label: "Recycled", value: 72, suffix: "%", color: "from-eco to-cyan-accent" },
            { icon: Truck, label: "Active Vehicles", value: 38, suffix: "", color: "from-cyan-accent to-eco" },
            { icon: Coins, label: "Rewards Issued", value: 9420, suffix: " ₹", color: "from-eco to-cyan-accent" },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="lg:col-span-3 glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{k.label}</span>
                <span className={`grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br ${k.color} text-primary-foreground`}>
                  <k.icon className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 font-display font-bold text-3xl">
                <Counter to={k.value} suffix={k.suffix} />
              </div>
              <div className="mt-2 text-xs text-eco">↑ 12.4% vs last week</div>
            </motion.div>
          ))}

          {/* Area chart */}
          <div className="lg:col-span-8 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Weekly Waste vs Recycled (tonnes)</h3>
              <div className="flex items-center gap-4 text-xs">
                <Legend color="oklch(0.78 0.19 152)" label="Waste" />
                <Legend color="oklch(0.82 0.17 195)" label="Recycled" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.19 152)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.78 0.19 152)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.17 195)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.82 0.17 195)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.35 0.03 170 / 0.4)" />
                <XAxis dataKey="day" stroke="oklch(0.72 0.025 168)" fontSize={12} />
                <YAxis stroke="oklch(0.72 0.025 168)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.18 0.03 168)",
                    border: "1px solid oklch(0.35 0.03 170)",
                    borderRadius: 12,
                  }}
                />
                <Area type="monotone" dataKey="waste" stroke="oklch(0.78 0.19 152)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="recycled" stroke="oklch(0.82 0.17 195)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie */}
          <div className="lg:col-span-4 glass rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Waste Composition</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.18 0.03 168)",
                    border: "1px solid oklch(0.35 0.03 170)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              {pieData.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                  <span className="text-muted-foreground">{p.name}</span>
                  <span className="ml-auto font-medium">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bin levels */}
          <div className="lg:col-span-7 glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Live Bin Fill Levels</h3>
            <div className="space-y-4">
              {bins.map((b) => (
                <div key={b.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground/90">{b.name}</span>
                    <span className={b.fill > 85 ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {b.fill}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-full ${b.fill > 85 ? "bg-gradient-to-r from-destructive to-orange-400" : "bg-gradient-to-r from-eco to-cyan-accent"}`}
                      animate={{ width: `${b.fill}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 shimmer pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle tracking */}
          <div className="lg:col-span-5 glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Pickup Vehicles</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={[
                { v: "EV-01", load: 78 }, { v: "EV-02", load: 42 },
                { v: "EV-03", load: 91 }, { v: "EV-04", load: 30 },
                { v: "EV-05", load: 64 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.35 0.03 170 / 0.3)" />
                <XAxis dataKey="v" stroke="oklch(0.72 0.025 168)" fontSize={11} />
                <YAxis stroke="oklch(0.72 0.025 168)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 168)", border: "1px solid oklch(0.35 0.03 170)", borderRadius: 12 }} />
                <Bar dataKey="load" radius={[6, 6, 0, 0]} fill="oklch(0.78 0.19 152)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-eco" /> 38 vehicles live across 4 zones
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
