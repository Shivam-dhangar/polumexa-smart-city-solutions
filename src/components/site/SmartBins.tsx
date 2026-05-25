import { motion } from "framer-motion";
import { MapPin, Radio, AlertTriangle, Battery } from "lucide-react";
import { SectionHeader } from "./About";

const bins = [
  { id: "BIN-A21", loc: "Civic Plaza", fill: 84, sensor: "ok", battery: 92, alert: false },
  { id: "BIN-B07", loc: "Tech Park Gate 3", fill: 96, sensor: "ok", battery: 71, alert: true },
  { id: "BIN-C14", loc: "Greenfield Apt", fill: 42, sensor: "ok", battery: 88, alert: false },
  { id: "BIN-D02", loc: "Riverside Mkt", fill: 67, sensor: "warn", battery: 23, alert: true },
];

export function SmartBins() {
  return (
    <section id="bins" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="IoT Hardware"
          title={<>Animated <span className="text-gradient">Smart Bins</span> with live telemetry</>}
          subtitle="Each Polumexa bin streams fill level, sensor health, GPS and alerts to your control plane."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bins.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-eco">{b.id}</span>
                {b.alert && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">
                    <AlertTriangle className="w-3 h-3" /> Alert
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-end gap-4">
                <BinVisual fill={b.fill} />
                <div className="flex-1">
                  <div className="text-3xl font-display font-bold text-gradient">{b.fill}%</div>
                  <div className="text-xs text-muted-foreground">fill level</div>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-xs">
                <Row icon={MapPin} label={b.loc} />
                <Row icon={Radio} label={`Sensor ${b.sensor === "ok" ? "operational" : "warning"}`} status={b.sensor} />
                <Row icon={Battery} label={`Battery ${b.battery}%`} status={b.battery < 30 ? "warn" : "ok"} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ icon: Icon, label, status }: { icon: React.ElementType; label: string; status?: string }) {
  const color = status === "warn" ? "text-orange-400" : "text-muted-foreground";
  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
}

function BinVisual({ fill }: { fill: number }) {
  return (
    <div className="relative w-16 h-20 rounded-md border-2 border-eco/50 overflow-hidden bg-secondary/40">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: `${fill}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-eco to-cyan-accent"
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-2 h-2 rounded-full bg-eco-glow shadow-[0_0_8px_currentColor] animate-pulse" />
      </div>
    </div>
  );
}
