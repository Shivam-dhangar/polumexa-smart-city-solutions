import { Leaf, Linkedin, Twitter, Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-border mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-eco to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-eco to-cyan-accent">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </span>
              <span className="font-display font-bold text-lg">
                Polumexa<span className="text-gradient"> Solutions</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Smart Recycling for Modern Cities — AI &amp; IoT powered waste management
              that turns every bin into intelligent infrastructure.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Linkedin, href: "https://linkedin.com/company/polumexa", label: "LinkedIn" },
                { Icon: Twitter, href: "https://twitter.com/polumexa", label: "Twitter / X" },
                { Icon: Github, href: "https://github.com/polumexa", label: "GitHub" },
                { Icon: Instagram, href: "https://instagram.com/polumexa", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="grid place-items-center w-9 h-9 rounded-lg glass hover:bg-gradient-to-br hover:from-eco hover:to-cyan-accent hover:text-primary-foreground transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-eco transition">Features</a></li>
              <li><a href="#dashboard" className="hover:text-eco transition">Live Demo</a></li>
              <li><a href="#bins" className="hover:text-eco transition">Smart Bins</a></li>
              <li><a href="#carbon" className="hover:text-eco transition">Carbon Impact</a></li>
              <li><a href="#pricing" className="hover:text-eco transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-eco transition">About</a></li>
              <li><a href="#team" className="hover:text-eco transition">Team</a></li>
              <li><a href="#government" className="hover:text-eco transition">Government</a></li>
              <li><a href="#contact" className="hover:text-eco transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Polumexa Solutions. All rights reserved.</p>
          <p>Crafted in Madhya Pradesh, India · Built for the planet 🌱</p>
        </div>
      </div>
    </footer>
  );
}
