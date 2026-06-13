import { motion } from "framer-motion";
import { Check, Zap, Building2, Globe } from "lucide-react";
import { SectionHeader } from "./About";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    desc: "For RWAs, housing societies & small campuses",
    price: "₹49,999",
    period: "/month",
    tag: null,
    features: [
      "Up to 50 smart IoT bins",
      "AI waste segregation (98% accuracy)",
      "Citizen rewards mobile app",
      "Monthly ESG impact reports",
      "Real-time fill-level dashboard",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Municipal",
    icon: Building2,
    desc: "For cities, municipalities & industrial zones",
    price: "₹1,50,000",
    period: "/month",
    tag: "Most Popular",
    features: [
      "Up to 500 smart IoT bins",
      "AI route optimization (−35% fuel cost)",
      "Live carbon & CO₂ dashboard",
      "API & SCADA integrations",
      "Fleet vehicle management",
      "Custom ESG compliance reports",
      "24/7 priority support",
    ],
    cta: "Request Pilot",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Globe,
    desc: "For large-scale smart city & govt. projects",
    price: "Custom",
    period: "",
    tag: null,
    features: [
      "Unlimited smart bins",
      "Custom AI model training",
      "White-label citizen app",
      "On-premise deployment option",
      "Dedicated success manager",
      "99.9% uptime SLA guarantee",
      "Full source code escrow",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title={<>Plans for every <span className="text-gradient">city size</span></>}
          subtitle="Start with a free 30-day pilot. Scale as your city grows. All plans include onboarding and staff training."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlighted
                  ? "bg-gradient-to-br from-eco/20 via-transparent to-cyan-accent/10 border border-eco/40 shadow-glow"
                  : "glass"
              }`}
            >
              {plan.tag && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-eco to-cyan-accent text-primary-foreground whitespace-nowrap">
                  {plan.tag}
                </span>
              )}

              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`grid place-items-center w-10 h-10 rounded-xl ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-eco to-cyan-accent text-primary-foreground"
                      : "bg-secondary/60"
                  }`}
                >
                  <plan.icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-display font-bold text-lg">{plan.name}</div>
                  <div className="text-xs text-muted-foreground">{plan.desc}</div>
                </div>
              </div>

              <div className="mb-6">
                <span className="font-display font-bold text-3xl">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>}
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-eco mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`inline-flex justify-center items-center px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  plan.highlighted
                    ? "btn-glow"
                    : "glass hover:bg-secondary/60 border border-border"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a <span className="text-eco font-medium">free 30-day pilot</span> · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
