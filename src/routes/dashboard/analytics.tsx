import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { Leaf, TrendingUp, Droplets, Trees } from "lucide-react";
import { getLast7DaysStats, getZoneStats, getCollections } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

const CHART_STYLE = {
  contentStyle: {
    background: "oklch(0.18 0.03 168)",
    border: "1px solid oklch(0.35 0.03 170)",
    borderRadius: 10,
    fontSize: 12,
  },
};

const ZONE_COLORS = ["oklch(0.78 0.19 152)", "oklch(0.82 0.17 195)", "oklch(0.75 0.18 95)", "oklch(0.70 0.15 50)"];

function AnalyticsPage() {
  const [weeklyData] = useState(getLast7DaysStats);
  const [zoneData] = useState(getZoneStats);
  const [collections] = useState(getCollections);

  const totalWeight = collections.reduce((s, c) => s + c.weightKg, 0);
  const totalRecycled = collections.reduce((s, c) => s + c.recycledKg, 0);
  const overallRate = totalWeight > 0 ? Math.round((totalRecycled / totalWeight) * 100) : 0;
  const co2Saved = Math.round(totalRecycled * 2.5);
  const treesEquivalent = Math.round(co2Saved / 22);
  const waterSaved = Math.round(totalRecycled * 3.8);

  const pieData = [
    { name: "Organic",  value: Math.round(totalWeight * 0.38), color: "oklch(0.78 0.19 152)" },
    { name: "Plastic",  value: Math.round(totalWeight * 0.30), color: "oklch(0.82 0.17 195)" },
    { name: "Paper",    value: Math.round(totalWeight * 0.20), color: "oklch(0.75 0.18 95)"  },
    { name: "Metal",    value: Math.round(totalWeight * 0.12), color: "oklch(0.70 0.15 50)"  },
  ];

  const rateData = weeklyData.map((d) => ({
    ...d,
    rate: d.totalKg > 0 ? Math.round((d.recycledKg / d.totalKg) * 100) : 0,
  }));

  const impactCards = [
    { icon: TrendingUp, label: "Total Recycled", value: `${totalRecycled.toLocaleString()} kg`, sub: `${overallRate}% rate`, color: "from-eco to-cyan-accent" },
    { icon: Leaf,       label: "CO₂ Saved",     value: `${co2Saved.toLocaleString()} kg`,      sub: "vs landfill",         color: "from-cyan-accent to-eco" },
    { icon: Trees,      label: "Trees Equivalent", value: treesEquivalent.toLocaleString(),     sub: "CO₂ absorption",      color: "from-eco to-cyan-accent" },
    { icon: Droplets,   label: "Water Saved",   value: `${waterSaved.toLocaleString()} L`,     sub: "recycling benefit",   color: "from-cyan-accent to-eco" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-xl">Analytics</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Based on {collections.length} collection records</p>
      </div>

      {/* Impact KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactCards.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${k.color} grid place-items-center`}>
                <k.icon className="w-3.5 h-3.5 text-primary-foreground" />
              </span>
            </div>
            <p className="font-display font-bold text-xl">{k.value}</p>
            <p className="text-xs text-eco mt-1">{k.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly trend + recycling rate */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">7-Day Collection Trend (kg)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="ag1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.19 152)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.78 0.19 152)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ag2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.17 195)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.82 0.17 195)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.35 0.03 170 / 0.3)" />
              <XAxis dataKey="label" stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <Tooltip {...CHART_STYLE} />
              <Area type="monotone" dataKey="totalKg" name="Collected" stroke="oklch(0.78 0.19 152)" fill="url(#ag1)" strokeWidth={2} />
              <Area type="monotone" dataKey="recycledKg" name="Recycled" stroke="oklch(0.82 0.17 195)" fill="url(#ag2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Daily Recycling Rate (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={rateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.35 0.03 170 / 0.3)" />
              <XAxis dataKey="label" stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.025 168)" fontSize={11} domain={[0, 100]} />
              <Tooltip {...CHART_STYLE} formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="rate" name="Rate %" stroke="oklch(0.82 0.17 195)" strokeWidth={2.5} dot={{ fill: "oklch(0.82 0.17 195)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Zone comparison + waste composition */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Zone Comparison (kg)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={zoneData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.35 0.03 170 / 0.3)" />
              <XAxis dataKey="zone" stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <Tooltip {...CHART_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="totalKg" name="Total" fill="oklch(0.78 0.19 152)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recycledKg" name="Recycled" fill="oklch(0.82 0.17 195)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Estimated Waste Composition</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip {...CHART_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {pieData.map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-muted-foreground flex-1">{p.name}</span>
                  <span className="font-medium">{p.value.toLocaleString()} kg</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
