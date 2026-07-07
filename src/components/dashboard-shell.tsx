import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Moon, Search, ShoppingBag } from "lucide-react";
import type { ReactNode, ComponentType } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type NavItem = { to: string; label: string; icon: ComponentType<{ className?: string }>; badge?: string | number };
export type NavGroup = { title: string; items: NavItem[] };

export function DashboardShell({
  role,
  groups,
  children,
}: {
  role: "Buyer" | "Seller" | "Admin";
  groups: NavGroup[];
  children: ReactNode;
}) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const toggleDark = () => document.documentElement.classList.toggle("dark");

  const Sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <div className="font-bold leading-none">EmachineBD</div>
          <div className="text-[10px] uppercase tracking-widest opacity-70 mt-1">{role} Portal</div>
        </div>
      </Link>
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="px-3 mb-2 text-[10px] uppercase tracking-widest opacity-60">{g.title}</div>
            <div className="space-y-1">
              {g.items.map((item) => {
                const active = path === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow" : "hover:bg-sidebar-accent"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge != null && (
                      <span className="rounded-full bg-sidebar-accent px-2 py-0.5 text-[10px]">{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <Link to="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-sidebar-accent">
          <LogOut className="h-4 w-4" /> Sign out
        </Link>
      </div>
    </div>
  );

  const [q, setQ] = useState("");
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 border-r border-sidebar-border">{Sidebar}</aside>
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-4 lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">{Sidebar}</SheetContent>
            </Sheet>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search anything…" className="pl-9 bg-muted/50 border-transparent" />
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={toggleDark}><Moon className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              </Button>
              <div className="ml-2 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-semibold text-sm">EM</div>
                <div className="hidden md:block leading-tight">
                  <div className="text-sm font-semibold">{role} Account</div>
                  <div className="text-xs text-muted-foreground">emachine@bd.com</div>
                </div>
              </div>
            </div>
          </header>
          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, delta, icon: Icon, tone = "primary" }: { label: string; value: string | number; delta?: string; icon: ComponentType<{ className?: string }>; tone?: "primary" | "emerald" | "amber" | "rose" }) {
  const tones: Record<string, string> = {
    primary: "from-primary/15 to-primary/5 text-primary",
    emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
    amber: "from-amber-500/15 to-amber-500/5 text-amber-600",
    rose: "from-rose-500/15 to-rose-500/5 text-rose-600",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && <span className="text-xs font-medium text-emerald-600">{delta}</span>}
      </div>
      <div className="mt-4 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}