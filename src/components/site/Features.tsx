import { motion } from "framer-motion";
import {
  Brain, Truck, Gift, Wifi, LineChart, BarChart3, Route, Eye,
} from "lucide-react";
import { SectionHeader } from "./About";

const features = [
  { icon: Brain, title: "AI Waste Segregation", text: "Computer-vision sorts plastic, paper, metal and organic waste in real time." },
  { icon: Truck, title: "Pickup Tracking", text: "Live GPS tracking of every collection vehicle with ETA notifications." },
  { icon: Gift, title: "Recycling Rewards", text: "Citizen incentives, vouchers and leaderboards drive participation." },
  { icon: Wifi, title: "Smart IoT Bins", text: "Connected bins report fill, weight, temperature and tampering 24/7." },
  { icon: LineChart, title: "Carbon Footprint Dashboard", text: "Quantify CO₂ reduced per neighborhood, building, or industrial zone." },
  { icon: BarChart3, title: "Real-time Analytics", text: "City-wide dashboards with anomaly detection and forecasting." },
  { icon: Route, title: "Smart Route Optimization", text: "Dynamic routing cuts fuel use up to 40% with traffic-aware paths." },
  { icon: Eye, title: "Waste Collection Monitoring", text: "Verify pickups with image-confirmed evidence and SLA scoring." },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities"
          title={<>Premium toolset for <span className="text-gradient">circular cities</span></>}
          subtitle="Every Polumexa module is engineered to work standalone — and even better together."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-eco/0 via-eco/0 to-cyan-accent/0 group-hover:from-eco/10 group-hover:to-cyan-accent/10 transition" />
              <div className="relative">
                <div className="inline-grid place-items-center w-11 h-11 rounded-xl bg-secondary/60 border border-border group-hover:bg-gradient-to-br group-hover:from-eco group-hover:to-cyan-accent transition">
                  <f.icon className="w-5 h-5 text-eco group-hover:text-primary-foreground transition" />
                </div>
                <h3 className="mt-5 font-semibold text-base">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
