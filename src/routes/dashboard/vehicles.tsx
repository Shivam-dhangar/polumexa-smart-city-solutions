import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Edit3, Trash2, Truck, Zap, Fuel, Wrench } from "lucide-react";
import { getVehicles, addVehicle, updateVehicle, deleteVehicle, type Vehicle } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/vehicles")({
  component: VehiclesPage,
});

const ZONES = ["Zone A", "Zone B", "Zone C", "Zone D"];

const EMPTY_FORM = {
  code: "", driver: "", zone: "Zone A",
  status: "idle" as Vehicle["status"],
  loadPercent: 0, fuelType: "EV" as Vehicle["fuelType"],
  tripsThisMonth: 0,
};

function VehiclesPage() {
  const [vehicles, setVehicles] = useState(getVehicles);
  const [showDialog, setShowDialog] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const refresh = useCallback(() => setVehicles(getVehicles()), []);

  const active = vehicles.filter((v) => v.status === "active").length;
  const idle = vehicles.filter((v) => v.status === "idle").length;
  const maintenance = vehicles.filter((v) => v.status === "maintenance").length;

  function openAdd() { setForm(EMPTY_FORM); setEditingVehicle(null); setShowDialog(true); }
  function openEdit(v: Vehicle) {
    setForm({ code: v.code, driver: v.driver, zone: v.zone, status: v.status, loadPercent: v.loadPercent, fuelType: v.fuelType, tripsThisMonth: v.tripsThisMonth });
    setEditingVehicle(v);
    setShowDialog(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, form);
      showToast(`${form.code} updated`);
    } else {
      addVehicle(form);
      showToast(`Vehicle ${form.code} added`);
    }
    refresh();
    setShowDialog(false);
  }

  function handleDelete(v: Vehicle) {
    if (confirm(`Remove ${v.code}?`)) {
      deleteVehicle(v.id);
      refresh();
      showToast(`${v.code} removed`);
    }
  }

  const statusConfig: Record<Vehicle["status"], { label: string; cls: string; icon: React.ElementType }> = {
    active:      { label: "Active",      cls: "bg-eco/15 text-eco",              icon: Zap    },
    idle:        { label: "Idle",        cls: "bg-muted/40 text-muted-foreground", icon: Truck  },
    maintenance: { label: "Maintenance", cls: "bg-orange-400/15 text-orange-400", icon: Wrench },
  };

  const fuelIcon: Record<Vehicle["fuelType"], React.ElementType> = { EV: Zap, CNG: Fuel, Diesel: Fuel };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl">Vehicles</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{vehicles.length} vehicles registered</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl btn-glow text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active",      value: active,      cls: "text-eco"            },
          { label: "Idle",        value: idle,        cls: "text-muted-foreground" },
          { label: "Maintenance", value: maintenance, cls: "text-orange-400"     },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl p-4 text-center">
            <p className={`font-display font-bold text-2xl ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Vehicle cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v, i) => {
          const sc = statusConfig[v.status];
          const FuelIcon = fuelIcon[v.fuelType];
          return (
            <motion.div key={v.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono font-bold text-eco">{v.code}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.driver}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(v)} className="p-1.5 rounded-lg hover:bg-secondary/60 transition">
                    <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(v)} className="p-1.5 rounded-lg hover:bg-destructive/15 transition">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.cls}`}>
                    <sc.icon className="w-3 h-3" /> {sc.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <FuelIcon className="w-3 h-3" /> {v.fuelType}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Load</span>
                    <span>{v.loadPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${v.loadPercent > 85 ? "bg-orange-400" : "bg-gradient-to-r from-eco to-cyan-accent"}`}
                      style={{ width: `${v.loadPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
                  <span>{v.zone}</span>
                  <span>{v.tripsThisMonth} trips this month</span>
                </div>
              </div>
            </motion.div>
          );
        })}
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
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong rounded-2xl p-6 w-full max-w-md border border-border/60">
            <h2 className="font-display font-bold text-lg mb-5">{editingVehicle ? `Edit ${editingVehicle.code}` : "Add Vehicle"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Vehicle Code">
                  <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="EV-07" required className="input-field" />
                </Field>
                <Field label="Zone">
                  <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} className="input-field">
                    {ZONES.map((z) => <option key={z}>{z}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Driver Name">
                <input value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })} placeholder="Driver's full name" required className="input-field" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Fuel Type">
                  <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value as Vehicle["fuelType"] })} className="input-field">
                    <option value="EV">Electric (EV)</option>
                    <option value="CNG">CNG</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Vehicle["status"] })} className="input-field">
                    <option value="active">Active</option>
                    <option value="idle">Idle</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label={`Load % (${form.loadPercent})`}>
                  <input type="range" min={0} max={100} value={form.loadPercent} onChange={(e) => setForm({ ...form, loadPercent: Number(e.target.value) })} className="w-full accent-eco" />
                </Field>
                <Field label="Trips This Month">
                  <input type="number" min={0} value={form.tripsThisMonth} onChange={(e) => setForm({ ...form, tripsThisMonth: Number(e.target.value) })} className="input-field" />
                </Field>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowDialog(false)} className="flex-1 py-2.5 rounded-xl border border-border hover:bg-secondary/60 text-sm transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl btn-glow text-sm font-medium">{editingVehicle ? "Save" : "Add Vehicle"}</button>
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
