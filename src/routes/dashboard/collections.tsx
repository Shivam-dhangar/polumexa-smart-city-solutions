import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, TrendingUp, Recycle, Percent } from "lucide-react";
import { getCollections, addCollection, deleteCollection, getBins, getVehicles, type Collection } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/collections")({
  component: CollectionsPage,
});

const DRIVERS = ["Ramesh Kumar", "Vikram Thakur", "Suresh Patel", "Ankit Mishra", "Pawan Singh", "Deepak Rawat"];
const ZONES = ["Zone A", "Zone B", "Zone C", "Zone D"];

const EMPTY_FORM = {
  date: "2026-06-16",
  zone: "Zone A",
  binCode: "",
  vehicleCode: "",
  weightKg: 0,
  recycledKg: 0,
  driver: DRIVERS[0],
  status: "completed" as Collection["status"],
};

function CollectionsPage() {
  const [collections, setCollections] = useState(getCollections);
  const [bins] = useState(getBins);
  const [vehicles] = useState(getVehicles);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterZone, setFilterZone] = useState("All");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const refresh = useCallback(() => setCollections(getCollections()), []);

  const filtered = filterZone === "All" ? collections : collections.filter((c) => c.zone === filterZone);

  const totalWeight = filtered.reduce((s, c) => s + c.weightKg, 0);
  const totalRecycled = filtered.reduce((s, c) => s + c.recycledKg, 0);
  const rate = totalWeight > 0 ? Math.round((totalRecycled / totalWeight) * 100) : 0;

  const recyclePct = form.weightKg > 0 ? Math.round((form.recycledKg / form.weightKg) * 100) : 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.recycledKg > form.weightKg) {
      alert("Recycled weight cannot exceed total weight.");
      return;
    }
    addCollection(form);
    refresh();
    setShowDialog(false);
    showToast("Collection logged successfully");
  }

  function handleDelete(col: Collection) {
    if (confirm("Remove this collection record?")) {
      deleteCollection(col.id);
      refresh();
      showToast("Record removed");
    }
  }

  const statusColor: Record<Collection["status"], string> = {
    completed: "bg-eco/15 text-eco",
    pending:   "bg-orange-400/15 text-orange-400",
    cancelled: "bg-muted/30 text-muted-foreground",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl">Collections</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{collections.length} records total</p>
        </div>
        <button onClick={() => setShowDialog(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl btn-glow text-sm font-medium">
          <Plus className="w-4 h-4" /> Log Collection
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: "Total Collected", value: `${totalWeight.toLocaleString()} kg`, color: "from-eco to-cyan-accent" },
          { icon: Recycle,    label: "Total Recycled",  value: `${totalRecycled.toLocaleString()} kg`, color: "from-cyan-accent to-eco" },
          { icon: Percent,    label: "Recycling Rate",  value: `${rate}%`, color: "from-eco to-cyan-accent" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${s.color} grid place-items-center`}>
                <s.icon className="w-3 h-3 text-primary-foreground" />
              </span>
            </div>
            <p className="font-display font-bold text-xl">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Zone filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...ZONES].map((z) => (
          <button
            key={z}
            onClick={() => setFilterZone(z)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${filterZone === z ? "bg-eco text-primary-foreground" : "glass hover:bg-secondary/60 text-muted-foreground"}`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/30">
              <tr className="text-muted-foreground">
                {["Date", "Zone", "Bin", "Vehicle", "Driver", "Weight", "Recycled", "Rate", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const r = c.weightKg > 0 ? Math.round((c.recycledKg / c.weightKg) * 100) : 0;
                return (
                  <tr key={c.id} className="border-t border-border/30 hover:bg-secondary/20 transition">
                    <td className="px-4 py-3 text-muted-foreground">{c.date}</td>
                    <td className="px-4 py-3">{c.zone}</td>
                    <td className="px-4 py-3 font-mono text-eco">{c.binCode}</td>
                    <td className="px-4 py-3 font-mono">{c.vehicleCode}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.driver}</td>
                    <td className="px-4 py-3 font-medium">{c.weightKg} kg</td>
                    <td className="px-4 py-3 text-eco">{c.recycledKg} kg</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-eco rounded-full" style={{ width: `${r}%` }} />
                        </div>
                        <span>{r}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(c)} className="p-1 rounded hover:bg-destructive/15 transition">
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-eco text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-glow z-50">
          {toast}
        </motion.div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong rounded-2xl p-6 w-full max-w-lg border border-border/60">
            <h2 className="font-display font-bold text-lg mb-5">Log New Collection</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="input-field" />
                </Field>
                <Field label="Zone">
                  <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} className="input-field">
                    {ZONES.map((z) => <option key={z}>{z}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Bin">
                  <select value={form.binCode} onChange={(e) => setForm({ ...form, binCode: e.target.value })} required className="input-field">
                    <option value="">Select bin…</option>
                    {bins.map((b) => <option key={b.id} value={b.code}>{b.code} – {b.location}</option>)}
                  </select>
                </Field>
                <Field label="Vehicle">
                  <select value={form.vehicleCode} onChange={(e) => setForm({ ...form, vehicleCode: e.target.value })} required className="input-field">
                    <option value="">Select vehicle…</option>
                    {vehicles.map((v) => <option key={v.id} value={v.code}>{v.code} – {v.driver}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Driver">
                <select value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })} className="input-field">
                  {DRIVERS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Total Weight (kg)">
                  <input type="number" min={1} max={5000} value={form.weightKg || ""} onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })} required placeholder="e.g. 120" className="input-field" />
                </Field>
                <Field label={`Recycled (kg) ${form.weightKg > 0 ? `— ${recyclePct}%` : ""}`}>
                  <input type="number" min={0} max={form.weightKg || 5000} value={form.recycledKg || ""} onChange={(e) => setForm({ ...form, recycledKg: Number(e.target.value) })} required placeholder="e.g. 90" className="input-field" />
                </Field>
              </div>
              <Field label="Status">
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Collection["status"] })} className="input-field">
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </Field>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowDialog(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-secondary/60 text-sm transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl btn-glow text-sm font-medium">Log Collection</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      {children}
    </div>
  );
}
