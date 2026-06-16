import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, Zap, Eye, EyeOff } from "lucide-react";
import { loginWithCredentials, loginAsDemo, getStoredUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (getStoredUser()) throw redirect({ to: "/dashboard" });
  },
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const user = loginWithCredentials(email, password);
      if (!user) {
        setError("Invalid credentials. Try demo@polumexa.com / demo123");
        setLoading(false);
        return;
      }
      router.navigate({ to: "/dashboard" });
    }, 600);
  }

  function handleDemo() {
    setLoading(true);
    setTimeout(() => {
      loginAsDemo();
      router.navigate({ to: "/dashboard" });
    }, 400);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -top-40 -left-20 w-[36rem] h-[36rem] rounded-full bg-eco/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-cyan-accent/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-md"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-eco to-cyan-accent shadow-glow">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-xl tracking-tight">
              Polumexa<span className="text-gradient"> Solutions</span>
            </span>
          </div>

          <h2 className="font-display font-bold text-4xl leading-tight">
            Smart Waste<br />
            <span className="text-gradient">Command Center</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Manage bins, log collections, track vehicles, and measure your city's environmental impact — all from one dashboard.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: "🗑️", label: "Real-time bin monitoring" },
              { icon: "🚛", label: "Collection route tracking" },
              { icon: "📊", label: "ESG & carbon analytics" },
              { icon: "🏆", label: "Citizen rewards management" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="text-lg">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 glass rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Demo credentials</p>
            <p className="text-sm font-mono text-eco">demo@polumexa.com</p>
            <p className="text-sm font-mono text-eco">demo123</p>
          </div>
        </motion.div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-eco to-cyan-accent">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </span>
            <span className="font-display font-bold tracking-tight">
              Polumexa<span className="text-gradient"> Solutions</span>
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to access the dashboard</p>

          {/* Demo CTA */}
          <button
            onClick={handleDemo}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl btn-glow font-semibold text-sm mb-6 disabled:opacity-70"
          >
            <Zap className="w-4 h-4" />
            Try Demo — No signup needed
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or sign in with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@polumexa.com"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-destructive text-xs bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-secondary border border-border hover:bg-muted font-medium text-sm transition disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition">← Back to homepage</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
