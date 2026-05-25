import { motion } from "framer-motion";
import { Cloud, Trees, Recycle, Award } from "lucide-react";
import { SectionHeader } from "./About";
import { Counter } from "./Counter";

const stats = [
  { icon: Cloud, label: "CO₂ Reduced", value: 184, suffix: " t", desc: "Across all active deployments this year" },
  { icon: Trees, label: "Trees Saved", value: 2940, suffix: "", desc: "Equivalent forest impact via paper recycling" },
  { icon: Recycle, label: "Plastic Recycled", value: 87000, suffix: " kg", desc: "Diverted from landfill into circular streams" },
  { icon: Award, label: "Sustainability Score", value: 92, suffix: "/100", desc: "Monthly ESG aggregate across partners" },
];

export function CarbonDashboard() {
  return (
    <section id="carbon" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eco/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Impact"
          title={<>Carbon dashboard — proof of <span className="text-gradient">positive impact</span></>}
          subtitle="Quantifiable sustainability metrics your municipality, board or campus can publish with confidence."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-eco/20 blur-2xl" />
              <s.icon className="w-7 h-7 text-eco" />
              <div className="mt-4 font-display font-bold text-4xl text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium">{s.label}</div>
              <div className="mt-2 text-xs text-muted-foreground">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
