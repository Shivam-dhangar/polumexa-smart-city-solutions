import { motion } from "framer-motion";
import { Building, Building2, Factory, Cpu, Briefcase, GraduationCap } from "lucide-react";
import { SectionHeader } from "./About";

const items = [
  { icon: Building2, title: "Municipalities", text: "End-to-end city waste OS with public dashboards." },
  { icon: Building, title: "Apartments", text: "Resident apps, gamified recycling and society-level reports." },
  { icon: Factory, title: "Factories", text: "Industrial waste compliance, hazardous segregation and audits." },
  { icon: Cpu, title: "Smart Cities", text: "Pluggable into ICCC stacks with secure REST + MQTT APIs." },
  { icon: Briefcase, title: "Corporate Campuses", text: "ESG reporting and zero-waste roadmaps for HQ buildings." },
  { icon: GraduationCap, title: "Educational Institutions", text: "Campus sustainability programs and student leaderboards." },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Industries"
          title={<>Built for every <span className="text-gradient">sustainability stakeholder</span></>}
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group glass rounded-2xl p-6 hover:ring-eco transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-secondary/60 group-hover:bg-gradient-to-br group-hover:from-eco group-hover:to-cyan-accent transition">
                  <it.icon className="w-5 h-5 text-eco group-hover:text-primary-foreground transition" />
                </span>
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{it.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
