import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Plus, Coins } from "lucide-react";
import { getCitizens, updateCitizenPoints, type Citizen } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/citizens")({
  component: CitizensPage,
});

function CitizensPage() {
  const [citizens, setCitizens] = useState(getCitizens);
  const [toast, setToast] = useState("");
  const [awardingId, setAwardingId] = useState<string | null>(null);
  const [awardPoints, setAwardPoints] = useState(50);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const refresh = useCallback(() => setCitizens(getCitizens()), []);

  const totalPoints = citizens.reduce((s, c) => s + c.points, 0);
  const totalRewards = citizens.reduce((s, c) => s + c.rewardsEarned, 0);
  const avgRecyclings = Math.round(citizens.reduce((s, c) => s + c.recyclingsThisMonth, 0) / citizens.length);

  function handleAward(c: Citizen) {
    updateCitizenPoints(c.id, awardPoints);
    refresh();
    setAwardingId(null);
    showToast(`Awarded ${awardPoints} pts to ${c.name}`);
  }

  const medalColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-slate-300";
    if (rank === 3) return "text-orange-500";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-xl">Citizens & Rewards</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Top recyclers in the programme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Points Issued", value: totalPoints.toLocaleString(), icon: Star },
          { label: "Rewards Disbursed",   value: `₹${totalRewards.toLocaleString()}`, icon: Coins },
          { label: "Avg Recyclings/Month", value: avgRecyclings, icon: Trophy },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <s.icon className="w-4 h-4 text-eco" />
            </div>
            <p className="font-display font-bold text-xl">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50">
          <h3 className="font-semibold text-sm">Leaderboard</h3>
        </div>
        <div className="divide-y divide-border/30">
          {citizens.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/20 transition"
            >
              {/* Rank */}
              <div className={`w-8 text-center font-display font-bold text-sm ${medalColor(idx + 1)}`}>
                {idx < 3 ? <Trophy className="w-4 h-4 mx-auto" /> : `#${idx + 1}`}
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-eco/60 to-cyan-accent/60 grid place-items-center text-xs font-bold shrink-0">
                {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.apartment} · {c.zone}</p>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-6 text-xs">
                <div className="text-right">
                  <p className="font-bold text-eco">{c.points.toLocaleString()}</p>
                  <p className="text-muted-foreground">points</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{c.rewardsEarned.toLocaleString()}</p>
                  <p className="text-muted-foreground">earned</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{c.recyclingsThisMonth}</p>
                  <p className="text-muted-foreground">this month</p>
                </div>
              </div>

              {/* Award */}
              <div className="shrink-0">
                {awardingId === c.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={10}
                      max={500}
                      value={awardPoints}
                      onChange={(e) => setAwardPoints(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg bg-secondary border border-border text-xs text-center"
                    />
                    <button onClick={() => handleAward(c)} className="px-2.5 py-1 rounded-lg bg-eco text-primary-foreground text-xs font-medium">Award</button>
                    <button onClick={() => setAwardingId(null)} className="px-2.5 py-1 rounded-lg border border-border text-xs">✕</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAwardingId(c.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:bg-secondary/60 text-xs transition"
                  >
                    <Plus className="w-3 h-3" /> Award
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-eco text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-glow z-50">
          {toast}
        </motion.div>
      )}
    </div>
  );
}
