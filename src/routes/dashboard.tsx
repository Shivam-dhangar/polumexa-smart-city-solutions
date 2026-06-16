import { createFileRoute, redirect, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, LayoutDashboard, Trash2, TrendingUp, Truck,
  Users, BarChart3, LogOut, Menu, X, ChevronRight,
} from "lucide-react";
import { getStoredUser, logout } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const user = getStoredUser();
    if (!user) throw redirect({ to: "/login" });
    return { user };
  },
  component: DashboardLayout,
});

const NAV = [
  { to: "/dashboard",             label: "Overview",    icon: LayoutDashboard, exact: true },
  { to: "/dashboard/bins",        label: "Smart Bins",  icon: Trash2           },
  { to: "/dashboard/collections", label: "Collections", icon: TrendingUp       },
  { to: "/dashboard/vehicles",    label: "Vehicles",    icon: Truck            },
  { to: "/dashboard/citizens",    label: "Citizens",    icon: Users            },
  { to: "/dashboard/analytics",   label: "Analytics",   icon: BarChart3        },
];

function DashboardLayout() {
  const { user } = Route.useRouteContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useRouterState({ select: (s) => s.location.pathname });

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border/50">
        <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-eco to-cyan-accent shrink-0">
          <Leaf className="w-4 h-4 text-primary-foreground" />
        </span>
        <span className="font-display font-bold text-sm tracking-tight leading-tight">
          Polumexa<span className="text-gradient"> Dashboard</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active = item.exact
            ? location === item.to
            : location.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-eco/15 text-eco"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-eco/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 border-t border-border/50 pt-4 space-y-3">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-eco to-cyan-accent grid place-items-center text-xs font-bold text-primary-foreground shrink-0">
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.organization}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 glass-strong border-r border-border/50">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-56 glass-strong border-r border-border/50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center gap-4 px-4 border-b border-border/50 glass-strong shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-secondary/60 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{user.organization} · {user.city}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-eco bg-eco/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-eco animate-pulse" />
              Live
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-eco to-cyan-accent grid place-items-center text-xs font-bold text-primary-foreground">
              {user.initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
