import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "./About";

const testimonials = [
  {
    name: "Rohit Verma",
    role: "Municipal Officer, Bhopal",
    text: "Polumexa cut our collection truck fuel costs by 38% in the first quarter. Their dashboards now project on the screen at our ICCC every morning.",
  },
  {
    name: "Anita Sharma",
    role: "Society Manager, Greenfield Apartments",
    text: "Residents love the rewards — we went from 24% to 71% segregation compliance in three months. The app is genuinely a delight to use.",
  },
  {
    name: "Devendra Singh",
    role: "Owner, Nirmal Textile Mills",
    text: "The hazardous-waste audit trail Polumexa generates saved us during a state pollution board inspection. Worth every rupee.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Trusted by <span className="text-gradient">forward-thinking</span> partners</>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-7 relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-eco/30" />
              <div className="flex gap-1 text-eco">
                {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-sm text-foreground/90 leading-relaxed">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-eco to-cyan-accent text-primary-foreground font-bold">
                  {t.name[0]}
                </span>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
