import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Github } from "lucide-react";
import { SectionHeader } from "./About";
import sanskarImg from "@/assets/sanskar.jpg";
import shekharImg from "@/assets/shekhar.jfif";
import yashrajImg from "@/assets/yashraj.jfif";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string | null;
  socials: { icon: typeof Linkedin; href: string; label: string }[];
}

const members: TeamMember[] = [
  {
    name: "Sanskar Patwa",
    role: "Co-Founder & CEO",
    bio: "Building India's leading AI + IoT platform for sustainable urban waste management. Driving Polumexa's vision from prototype to nation-scale deployment.",
    img: sanskarImg,
    socials: [
      { icon: Linkedin, href: "#", label: "LinkedIn" },
      { icon: Twitter, href: "#", label: "Twitter" },
      { icon: Github, href: "#", label: "GitHub" },
      { icon: Mail, href: "#contact", label: "Email" },
    ],
  },
  {
    name: "Shekhar Gupta",
    role: "Co-Founder & CTO",
    bio: "Architecting the technical backbone of Polumexa — from edge IoT sensors to real-time cloud analytics powering smarter cities.",
    img: shekharImg,
    socials: [
      { icon: Linkedin, href: "#", label: "LinkedIn" },
      { icon: Github, href: "#", label: "GitHub" },
      { icon: Mail, href: "#contact", label: "Email" },
    ],
  },
  {
    name: "Yashraj Singh",
    role: "Head of Operations",
    bio: "Leading on-ground deployment, city partnerships, and supply-chain logistics to scale Polumexa's smart waste solutions across urban India.",
    img: yashrajImg,
    socials: [
      { icon: Linkedin, href: "#", label: "LinkedIn" },
      { icon: Mail, href: "#contact", label: "Email" },
    ],
  },
  
];

function Avatar({ member, index }: { member: TeamMember; index: number }) {
  const colors = [
    "from-eco to-cyan-accent",
    "from-cyan-accent to-blue-500",
    "from-blue-500 to-eco",
    "from-emerald-400 to-teal-500",
  ];
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  if (member.img) {
    return (
      <img
        src={member.img}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}
    >
      <span className="text-white font-display font-bold text-2xl">{initials}</span>
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Our Team"
          title={
            <>
              The minds behind{" "}
              <span className="text-gradient">Polumexa</span>
            </>
          }
          subtitle="A passionate team of engineers, operators, and visionaries united by one goal — making Indian cities cleaner, smarter, and more sustainable."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-6 text-center relative overflow-hidden group"
            >
              <div className="absolute -top-16 inset-x-0 mx-auto w-48 h-48 rounded-full bg-eco/20 blur-3xl group-hover:bg-eco/30 transition-all duration-500" />
              <div className="relative">
                <div className="mx-auto w-24 h-24 rounded-full ring-4 ring-border overflow-hidden">
                  <Avatar member={member} index={i} />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg leading-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-eco font-semibold uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
                <div className="mt-5 flex items-center justify-center gap-2">
                  {member.socials.map((s, j) => (
                    <a
                      key={j}
                      href={s.href}
                      aria-label={s.label}
                      className="grid place-items-center w-9 h-9 rounded-full glass hover:bg-gradient-to-br hover:from-eco hover:to-cyan-accent hover:text-primary-foreground transition"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 glass rounded-3xl p-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            We're a growing team driven by a shared mission. If you're passionate about
            clean tech, smart cities, or sustainable infrastructure —{" "}
            <a href="#contact" className="text-eco font-medium hover:underline">
              we'd love to hear from you
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
