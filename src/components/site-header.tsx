import { Link } from "@tanstack/react-router";
import { Bell, Heart, Menu, Moon, Search, ShoppingBag, User, ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { categories, notifications } from "@/lib/mock-data";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Marketplace" },
  { to: "/auctions", label: "Auctions" },
  { to: "/categories", label: "Categories" },
  { to: "/inquiry", label: "Post Inquiry" },
];

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="hidden md:flex h-9 items-center justify-between border-b border-border/40 px-6 text-xs text-muted-foreground">
        <span>Bangladesh's #1 Verified Industrial Machine Marketplace</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> EN / BN</span>
          <span>Sell on EmachineBD</span>
          <span>Help</span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="mt-8 space-y-2">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="block rounded-lg px-3 py-2 hover:bg-muted">
                  {n.label}
                </Link>
              ))}
              <div className="pt-4 text-xs font-semibold uppercase text-muted-foreground">Categories</div>
              {categories.slice(0, 8).map((c) => (
                <Link key={c.slug} to="/products" className="block rounded-lg px-3 py-2 text-sm hover:bg-muted">
                  {c.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-bold leading-none">EmachineBD</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Industrial Marketplace</div>
          </div>
        </Link>

        <nav className="ml-6 hidden lg:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                Categories <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[560px] p-4" align="start">
              <div className="grid grid-cols-3 gap-1">
                {categories.map((c) => (
                  <DropdownMenuItem key={c.slug} asChild>
                    <Link to="/products" className="flex items-center justify-between rounded-md">
                      <span>{c.name}</span>
                      <Badge variant="secondary" className="text-[10px]">{c.count}</Badge>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 max-w-md items-center">
          <div className="relative flex-1 hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search 12,400+ machines, brands, sellers…"
              className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme">
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Heart className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="flex justify-between">
                Notifications <span className="text-xs text-muted-foreground">{unread} new</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="flex-col items-start gap-1 py-2">
                  <div className="text-sm">{n.title}</div>
                  <div className="text-[11px] text-muted-foreground">{n.time}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/dashboard/buyer">Buyer Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/dashboard/seller">Seller Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/dashboard/admin">Admin Panel</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/login">Sign in</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/register">Create account</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="ml-2 hidden sm:inline-flex">
            <Link to="/register">Sell Machine</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
