import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { Trash2, TrendingUp, Truck, Leaf, AlertTriangle, Clock } from "lucide-react";
import {
  getBins, getCollections, getVehicles, getTodayCollections,
  getLast7DaysStats,
} from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { user } = Route.useRouteContext();
  const [bins] = useState(getBins);
  const [vehicles] = useState(getVehicles);
  const [todayCollections] = useState(getTodayCollections);
  const [weeklyData] = useState(getLast7DaysStats);
  const [recentCollections] = useState(() => getCollections().slice(0, 5));

  const totalWeight = todayCollections.reduce((s, c) => s + c.weightKg, 0);
  const totalRecycled = todayCollections.reduce((s, c) => s + c.recycledKg, 0);
  const recyclingRate = totalWeight > 0 ? Math.round((totalRecycled / totalWeight) * 100) : 0;
  const co2Saved = Math.round(totalRecycled * 2.5);

  const alertBins = bins.filter((b) => b.fill > 85 || b.battery < 25 || b.sensor !== "ok");
  const activeVehicles = vehicles.filter((v) => v.status === "active").length;

  const kpis = [
    { label: "Smart Bins", value: bins.length, suffix: "", icon: Trash2, sub: `${alertBins.length} need attention`, color: "from-eco to-cyan-accent" },
    { label: "Today Collected", value: totalWeight, suffix: " kg", icon: TrendingUp, sub: `${recyclingRate}% recycled`, color: "from-cyan-accent to-eco" },
    { label: "Active Vehicles", value: activeVehicles, suffix: `/${vehicles.length}`, icon: Truck, sub: "on route now", color: "from-eco to-cyan-accent" },
    { label: "CO₂ Saved Today", value: co2Saved, suffix: " kg", icon: Leaf, sub: "vs landfill disposal", color: "from-cyan-accent to-eco" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-xl">Good morning, {user.name.split(" ")[0]} 👋</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Here's what's happening across {user.city} today.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <span className={`grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br ${k.color}`}>
                <k.icon className="w-3.5 h-3.5 text-primary-foreground" />
              </span>
            </div>
            <p className="font-display font-bold text-2xl">
              {k.value.toLocaleString()}<span className="text-lg text-muted-foreground">{k.suffix}</span>
            </p>
            <p className="text-xs text-eco mt-1">{k.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 glass rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">7-Day Waste vs Recycled (kg)</h3>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-eco" />Collected
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-cyan-accent" />Recycled
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="og1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.19 152)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.78 0.19 152)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="og2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.17 195)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.82 0.17 195)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.35 0.03 170 / 0.3)" />
              <XAxis dataKey="label" stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.025 168)" fontSize={11} />
              <Tooltip
                contentStyle={{ background: "oklch(0.18 0.03 168)", border: "1px solid oklch(0.35 0.03 170)", borderRadius: 10, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="totalKg" name="Collected" stroke="oklch(0.78 0.19 152)" fill="url(#og1)" strokeWidth={2} />
              <Area type="monotone" dataKey="recycledKg" name="Recycled" stroke="oklch(0.82 0.17 195)" fill="url(#og2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Alerts + recent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5"
        >
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" /> Alerts
          </h3>
          {alertBins.length === 0 ? (
            <p className="text-xs text-muted-foreground">All bins are operating normally.</p>
          ) : (
            <div className="space-y-2.5">
              {alertBins.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${b.fill > 85 ? "bg-destructive" : "bg-orange-400"}`} />
                  <div>
                    <p className="text-xs font-medium">{b.code}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.fill > 85 ? `Fill ${b.fill}% — needs pickup` : b.battery < 25 ? `Battery ${b.battery}% — low` : "Sensor warning"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent collections */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl p-5"
      >
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" /> Recent Collections
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border/50">
                <th className="text-left py-2 pr-4 font-medium">Date</th>
                <th className="text-left py-2 pr-4 font-medium">Zone</th>
                <th className="text-left py-2 pr-4 font-medium">Bin</th>
                <th className="text-left py-2 pr-4 font-medium">Vehicle</th>
                <th className="text-right py-2 pr-4 font-medium">Weight</th>
                <th className="text-right py-2 font-medium">Recycled</th>
              </tr>
            </thead>
            <tbody>
              {recentCollections.map((c) => (
                <tr key={c.id} className="border-b border-border/30 last:border-0">
                  <td className="py-2.5 pr-4 text-muted-foreground">{c.date}</td>
                  <td className="py-2.5 pr-4">{c.zone}</td>
                  <td className="py-2.5 pr-4 font-mono text-eco">{c.binCode}</td>
                  <td className="py-2.5 pr-4 font-mono">{c.vehicleCode}</td>
                  <td className="py-2.5 pr-4 text-right">{c.weightKg} kg</td>
                  <td className="py-2.5 text-right text-eco">{c.recycledKg} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
