import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./About";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", org: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Get in touch"
          title={<>Let's build a <span className="text-gradient">cleaner city</span> together</>}
          subtitle="Tell us about your municipality, society, or campus — we'll respond within one business day."
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-eco to-cyan-accent text-primary-foreground">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-semibold">Polumexa Solutions</div>
                  <address className="not-italic text-sm text-muted-foreground mt-1 leading-relaxed">
                    266/7 Gadarwara, Narsinghpur,<br />Madhya Pradesh – 487881
                  </address>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-secondary/60">
                  <Mail className="w-5 h-5 text-eco" />
                </span>
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:hello@polumexa.com" className="text-sm text-muted-foreground hover:text-eco transition">
                    hello@polumexa.com
                  </a>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-secondary/60">
                  <Phone className="w-5 h-5 text-eco" />
                </span>
                <div>
                  <div className="font-semibold">Partnerships</div>
                  <p className="text-sm text-muted-foreground">Mon–Sat · 9:00 – 19:00 IST</p>
                </div>
              </div>
            </div>

            {/* Mini map */}
            <div className="glass rounded-2xl p-2 overflow-hidden">
              <div className="relative h-44 rounded-xl overflow-hidden bg-secondary/40">
                <MapVisual />
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="lg:col-span-3 glass rounded-2xl p-7 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input/40 border border-border focus:border-eco focus:ring-2 focus:ring-eco/30 outline-none transition"
                  placeholder="Sanskar Patwa"
                />
              </Field>
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input/40 border border-border focus:border-eco focus:ring-2 focus:ring-eco/30 outline-none transition"
                  placeholder="you@city.gov.in"
                />
              </Field>
            </div>
            <Field label="Organization">
              <input
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input/40 border border-border focus:border-eco focus:ring-2 focus:ring-eco/30 outline-none transition"
                placeholder="Municipality / Society / Factory"
              />
            </Field>
            <Field label="Message" required>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input/40 border border-border focus:border-eco focus:ring-2 focus:ring-eco/30 outline-none transition resize-none"
                placeholder="Tell us about your waste management challenge..."
              />
            </Field>

            <button
              type="submit"
              disabled={sent}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold btn-glow disabled:opacity-70"
            >
              {sent ? (<><CheckCircle2 className="w-4 h-4" /> Message sent</>) : (<>Send Message <Send className="w-4 h-4" /></>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}{required && <span className="text-eco"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function MapVisual() {
  return (
    <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.35 0.04 170)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#mapgrid)" />
      <path d="M0 130 Q 100 90 200 110 T 400 90" stroke="oklch(0.78 0.19 152 / 0.6)" strokeWidth="2" fill="none" />
      <path d="M30 60 L 380 160" stroke="oklch(0.82 0.17 195 / 0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <g transform="translate(200, 100)">
        <circle r="20" fill="oklch(0.78 0.19 152 / 0.2)">
          <animate attributeName="r" values="14;26;14" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="6" fill="oklch(0.85 0.22 148)" />
        <text x="14" y="4" fill="oklch(0.97 0.01 160)" fontSize="10" fontFamily="sans-serif" fontWeight="600">
          Gadarwara, MP
        </text>
      </g>
    </svg>
  );
}
