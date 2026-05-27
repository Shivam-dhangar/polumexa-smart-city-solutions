import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Github } from "lucide-react";
import { SectionHeader } from "./About";
import sanskarImg from "@/assets/sanskar.jpg";

export function Team() {
  return (
    <section id="team" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Leadership"
          title={<>The minds behind <span className="text-gradient">Polumexa</span></>}
        />
        <div className="mt-14 grid place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute -top-20 inset-x-0 mx-auto w-56 h-56 rounded-full bg-eco/25 blur-3xl" />
            <div className="relative">
              <div className="mx-auto w-28 h-28 rounded-full ring-4 ring-border overflow-hidden">
                <img
                  src={sanskarImg}
                  alt="Sanskar Patwa"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-display font-bold text-2xl">Sanskar Patwa</h3>
              <p className="mt-1 text-sm text-eco font-medium">Co-Founder &amp; CEO</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Building India's leading AI + IoT platform for sustainable urban waste management.
                Driving Polumexa's vision from prototype to nation-scale deployment.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#contact"
                    className="grid place-items-center w-10 h-10 rounded-full glass hover:bg-gradient-to-br hover:from-eco hover:to-cyan-accent hover:text-primary-foreground transition"
                    aria-label="Social link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
