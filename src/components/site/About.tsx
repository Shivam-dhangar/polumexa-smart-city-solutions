import { motion } from "framer-motion";
import { Building2, Cpu, Recycle } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="About Polumexa"
          title={<>Building the <span className="text-gradient">operating system</span> for cleaner cities</>}
          subtitle="Polumexa Solutions empowers smart cities, municipalities, factories, and apartment communities to manage waste intelligently — using on-bin AI vision, IoT telemetry, and route optimization that cuts collection costs and lifts recycling rates."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Cpu,
              title: "AI Vision at the Bin",
              text: "Real-time segregation classifies plastic, paper, organic and metal with 98% accuracy on edge hardware.",
            },
            {
              icon: Recycle,
              title: "Circular Incentives",
              text: "Citizens earn rewards for correct disposal — gamifying recycling at scale across residential blocks.",
            },
            {
              icon: Building2,
              title: "Municipal Ready",
              text: "Built to plug into Smart City command centers with secure APIs, role-based access, and ESG reporting.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-7 hover:ring-eco transition-all"
            >
              <div className="inline-grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-eco to-cyan-accent text-primary-foreground mb-5">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center px-3 py-1 rounded-full glass text-xs font-medium text-eco uppercase tracking-wider"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
