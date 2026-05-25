import { motion } from "framer-motion";
import { Shield, Network, TrendingUp, Globe2, FileCheck } from "lucide-react";
import { SectionHeader } from "./About";

const points = [
  { icon: Shield, title: "Startup India Compatible", text: "Recognized startup eligibility with tax & funding alignment." },
  { icon: Network, title: "Smart City Integration", text: "ICCC-ready APIs, BIS-aligned hardware, MoUD-friendly reporting." },
  { icon: TrendingUp, title: "Government Scalability", text: "Multi-tenant architecture deployable district to nation-wide." },
  { icon: Globe2, title: "ESG & Sustainability Impact", text: "Auditable CO₂, circularity & SDG-12 metrics out of the box." },
  { icon: FileCheck, title: "Digital India Alignment", text: "Data-residency, Aadhaar-grade security, DigiLocker integration ready." },
];

export function Government() {
  return (
    <section id="government" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative glass-strong rounded-3xl p-8 lg:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-eco/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-accent/20 blur-3xl" />
          <div className="relative">
            <SectionHeader
              center={false}
              eyebrow="Government Potential"
              title={<>Designed to power <span className="text-gradient">national-scale</span> sustainability programs</>}
              subtitle="Polumexa is architected from day one to operate inside government frameworks — secure, auditable, and built for scale."
            />
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
              {points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-5"
                >
                  <p.icon className="w-6 h-6 text-eco" />
                  <h3 className="mt-3 font-semibold text-sm">{p.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
