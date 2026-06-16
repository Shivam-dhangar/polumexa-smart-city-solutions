import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit3, AlertTriangle, Battery, MapPin, Radio, RefreshCw } from "lucide-react";
import { getBins, addBin, updateBin, deleteBin, type Bin } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/bins")({
  component: BinsPage,
});

const ZONES = ["Zone A", "Zone B", "Zone C", "Zone D"];

type DialogMode = "add" | "edit" | null;

const EMPTY_FORM = {
  code: "", location: "", zone: "Zone A",
  fill: 0, battery: 100, sensor: "ok" as Bin["sensor"],
  capacity: 100,
};

function BinsPage() {
  const [bins, setBins] = useState<Bin[]>(getBins);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editingBin, setEditingBin] = useState<Bin | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterZone, setFilterZone] = useState("All");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const refresh = useCallback(() => setBins(getBins()), []);

  const filtered = filterZone === "All" ? bins : bins.filter((b) => b.zone === filterZone);
  const alertCount = bins.filter((b) => b.fill > 85 || b.battery < 25 || b.sensor !== "ok").length;

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingBin(null);
    setDialogMode("add");
  }

  function openEdit(bin: Bin) {
    setForm({ code: bin.code, location: bin.location, zone: bin.zone, fill: bin.fill, battery: bin.battery, sensor: bin.sensor, capacity: bin.capacity });
    setEditingBin(bin);
    setDialogMode("edit");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dialogMode === "add") {
      addBin(form);
      showToast(`Bin ${form.code} added successfully`);
    } else if (editingBin) {
      updateBin(editingBin.id, form);
      showToast(`Bin ${form.code} updated`);
    }
    refresh();
    setDialogMode(null);
  }

  function handleDelete(bin: Bin) {
    if (confirm(`Delete ${bin.code}? This cannot be undone.`)) {
      deleteBin(bin.id);
      refresh();
      showToast(`Bin ${bin.code} removed`);
    }
  }

  function handleMarkForPickup(bin: Bin) {
    updateBin(bin.id, { fill: 0 });
    refresh();
    showToast(`${bin.code} marked as collected — fill reset to 0%`);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl">Smart Bins</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{bins.length} bins · {alertCount} alerts</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl btn-glow text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Bin
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ZONES.map((z) => {
          const zBins = bins.filter((b) => b.zone === z);
          const full = zBins.filter((b) => b.fill > 85).length;
          return (
            <button
              key={z}
              onClick={() => setFilterZone(filterZone === z ? "All" : z)}
              className={`glass rounded-xl p-3 text-left transition border ${filterZone === z ? "border-eco/50 bg-eco/5" : "border-transparent"}`}
            >
              <p className="text-xs text-muted-foreground">{z}</p>
              <p className="font-display font-bold text-lg mt-1">{zBins.length}</p>
              {full > 0 && <p className="text-xs text-destructive">{full} need pickup</p>}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
          <p className="text-sm font-medium">{filterZone === "All" ? "All Bins" : filterZone} ({filtered.length})</p>
          <div className="flex items-center gap-2">
            {filterZone !== "All" && (
              <button onClick={() => setFilterZone("All")} className="text-xs text-muted-foreground hover:text-foreground">Clear filter</button>
            )}
            <button onClick={refresh} className="p-1.5 rounded-lg hover:bg-secondary/60 transition">
              <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/30">
              <tr className="text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Bin ID</th>
                <th className="text-left px-4 py-3 font-medium">Location</th>
                <th className="text-left px-4 py-3 font-medium">Zone</th>
                <th className="text-right px-4 py-3 font-medium">Fill</th>
                <th className="text-right px-4 py-3 font-medium">Battery</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bin) => {
                const needsPickup = bin.fill > 85;
                const lowBatt = bin.battery < 25;
                return (
                  <tr key={bin.id} className="border-t border-border/30 hover:bg-secondary/20 transition">
                    <td className="px-5 py-3">
                      <span className="font-mono text-eco">{bin.code}</span>
                      {(needsPickup || lowBatt || bin.sensor !== "ok") && (
                        <AlertTriangle className="inline w-3 h-3 text-orange-400 ml-1.5" />
                      )}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3 h-3 shrink-0" />{bin.location}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{bin.zone}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${bin.fill > 85 ? "bg-destructive" : bin.fill > 60 ? "bg-orange-400" : "bg-eco"}`}
                            style={{ width: `${bin.fill}%` }}
                          />
                        </div>
                        <span className={`font-medium ${bin.fill > 85 ? "text-destructive" : ""}`}>{bin.fill}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`flex items-center justify-end gap-1 ${lowBatt ? "text-orange-400" : "text-muted-foreground"}`}>
                        <Battery className="w-3 h-3" />{bin.battery}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${bin.sensor === "ok" ? "bg-eco/15 text-eco" : "bg-orange-400/15 text-orange-400"}`}>
                        <Radio className="w-2.5 h-2.5" />
                        {bin.sensor === "ok" ? "Online" : "Warning"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {needsPickup && (
                          <button
                            onClick={() => handleMarkForPickup(bin)}
                            className="px-2 py-1 rounded-lg text-xs bg-eco/15 text-eco hover:bg-eco/25 transition"
                          >
                            Mark Collected
                          </button>
                        )}
                        <button onClick={() => openEdit(bin)} className="p-1.5 rounded-lg hover:bg-secondary/60 transition">
                          <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(bin)} className="p-1.5 rounded-lg hover:bg-destructive/15 transition">
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-eco text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-glow z-50"
        >
          {toast}
        </motion.div>
      )}

      {/* Dialog */}
      {dialogMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-md border border-border/60"
          >
            <h2 className="font-display font-bold text-lg mb-5">
              {dialogMode === "add" ? "Add New Bin" : `Edit ${editingBin?.code}`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Bin Code" required>
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="BIN-X00"
                    required
                    className="input-field"
                  />
                </Field>
                <Field label="Zone">
                  <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} className="input-field">
                    {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Market Square Gate 1"
                  required
                  className="input-field"
                />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label={`Fill % (${form.fill})`}>
                  <input type="range" min={0} max={100} value={form.fill} onChange={(e) => setForm({ ...form, fill: Number(e.target.value) })} className="w-full accent-eco" />
                </Field>
                <Field label={`Battery % (${form.battery})`}>
                  <input type="range" min={0} max={100} value={form.battery} onChange={(e) => setForm({ ...form, battery: Number(e.target.value) })} className="w-full accent-eco" />
                </Field>
                <Field label="Sensor">
                  <select value={form.sensor} onChange={(e) => setForm({ ...form, sensor: e.target.value as Bin["sensor"] })} className="input-field">
                    <option value="ok">OK</option>
                    <option value="warn">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </Field>
              </div>
              <Field label="Capacity (kg)">
                <input type="number" min={10} max={1000} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="input-field" />
              </Field>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setDialogMode(null)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-secondary/60 text-sm transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl btn-glow text-sm font-medium">
                  {dialogMode === "add" ? "Add Bin" : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
