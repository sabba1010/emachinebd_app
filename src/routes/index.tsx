import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ChevronRight,
  Gavel,
  Package,
  Search,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { MachineCard } from "@/components/machine-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  auctionMachines,
  categories,
  featuredMachines,
  featuredSellers,
  faqs,
  machines,
  stats,
  testimonials,
  verifiedMachines,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EmachineBD — Verified Industrial Machine Marketplace" },
      {
        name: "description",
        content:
          "Bangladesh's premier industrial machine marketplace. Buy, sell and auction verified CNC, lathe, press, packaging and textile machines from trusted sellers.",
      },
      { property: "og:title", content: "EmachineBD — Industrial Machine Marketplace" },
      { property: "og:description", content: "Buy, sell and auction verified industrial machines." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <MarketingLayout>
      <Hero />
      <FeaturedCategories />
      <Section title="Popular Machines" cta={{ href: "/products", label: "Browse all" }}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {machines.slice(0, 8).map((m) => <MachineCard key={m.id} m={m} />)}
        </div>
      </Section>
      <FeaturedSellers />
      <MachineTabs />
      <FeaturedAuction />
      <HowItWorks />
      <StatsBand />
      <Testimonials />
      <FAQ />
      <CTABand />
    </MarketingLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="secondary" className="gap-1 rounded-full py-1.5 px-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Trusted by 12,400+ industrial buyers
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              The verified marketplace for{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                industrial machines
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Buy, sell, auction and inquire on 12,400+ inspected CNC, lathe, press,
              packaging and textile machines from verified sellers across South Asia.
            </p>
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-2 shadow-2xl shadow-primary/5 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search Mazak lathes, CNC mills, presses…"
                    className="pl-9 border-0 bg-transparent focus-visible:ring-0 h-11 text-base"
                  />
                </div>
                <Button size="lg" className="h-11 px-6">Search</Button>
              </div>
              <div className="flex flex-wrap gap-2 px-2 py-2 text-xs text-muted-foreground">
                <span>Popular:</span>
                {["CNC Lathe", "Injection Molding", "Laser Cutter", "Textile Loom"].map((t) => (
                  <button key={t} className="hover:text-primary">#{t}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg"><Link to="/products">Browse Marketplace <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/auctions"><Gavel className="mr-1 h-4 w-4" /> Live Auctions</Link></Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> 32-point inspection</div>
              <div className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Bonded logistics</div>
              <div className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-primary" /> Escrow protected</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img src={featuredMachines[0].image} alt="Featured machine" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <Badge className="bg-emerald-500 mb-3 gap-1"><ShieldCheck className="h-3 w-3" /> Verified Listing</Badge>
                <div className="text-2xl font-bold">{featuredMachines[0].name}</div>
                <div className="mt-1 text-white/80 text-sm">Featured auction • Ends in 2d 14h</div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="text-3xl font-bold">${featuredMachines[0].price.toLocaleString()}</div>
                  <Button size="sm" variant="secondary">Place Bid</Button>
                </div>
              </div>
            </div>
            <div className="absolute -left-6 top-10 hidden md:block rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Verified today</div>
                  <div className="font-semibold text-sm">142 machines</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-16 hidden md:block rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Gavel className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Live auctions</div>
                  <div className="font-semibold text-sm">28 running now</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, subtitle, cta, children }: { title: string; subtitle?: string; cta?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
        {cta && (
          <Button variant="ghost" asChild><Link to={cta.href}>{cta.label} <ChevronRight className="h-4 w-4" /></Link></Button>
        )}
      </div>
      {children}
    </section>
  );
}

function FeaturedCategories() {
  return (
    <Section title="Featured Categories" subtitle="12 categories, 12,400+ verified listings" cta={{ href: "/categories", label: "All categories" }}>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.slice(0, 12).map((c, i) => (
          <motion.div key={c.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <Link to="/products" className="group block rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all">
                <Boxes className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold text-sm">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.count} listings</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function FeaturedSellers() {
  return (
    <Section title="Featured Verified Sellers" subtitle="Long-standing partners with 99%+ satisfaction">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredSellers.slice(0, 6).map((s) => (
          <Card key={s.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <img src={s.logo} alt={s.name} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold truncate">{s.name}</div>
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                </div>
                <div className="text-xs text-muted-foreground">{s.location} • {s.products} products</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{s.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">(320 reviews)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Visit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function MachineTabs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <Tabs defaultValue="latest">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Discover Machines</h2>
            <p className="mt-2 text-muted-foreground">Freshly listed, verified and in auction</p>
          </div>
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="auction">Auction</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="latest">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {machines.slice(8, 16).map((m) => <MachineCard key={m.id} m={m} />)}
          </div>
        </TabsContent>
        <TabsContent value="verified">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {verifiedMachines.map((m) => <MachineCard key={m.id} m={m} />)}
          </div>
        </TabsContent>
        <TabsContent value="auction">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {auctionMachines.map((m) => <MachineCard key={m.id} m={m} />)}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function FeaturedAuction() {
  const m = auctionMachines[0];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="grid lg:grid-cols-2">
          <div className="p-10 lg:p-14 space-y-5">
            <Badge className="bg-white/15 text-white border-white/20 gap-1"><Gavel className="h-3 w-3" /> Featured Auction</Badge>
            <h3 className="text-3xl lg:text-4xl font-bold leading-tight">{m.name}</h3>
            <p className="text-white/80 max-w-md">Fully inspected, low-hours, ready for immediate dispatch. Sealed-bid auction closes in 48 hours.</p>
            <div className="grid grid-cols-4 gap-3 max-w-md">
              {[["02","Days"],["14","Hours"],["36","Min"],["12","Sec"]].map(([n,l]) => (
                <div key={l} className="rounded-xl bg-white/10 border border-white/10 py-3 text-center backdrop-blur">
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-80">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div><div className="text-xs opacity-70">Current bid</div><div className="text-2xl font-bold">${m.price.toLocaleString()}</div></div>
              <div><div className="text-xs opacity-70">Bidders</div><div className="text-2xl font-bold">27</div></div>
            </div>
            <div className="flex gap-3">
              <Button size="lg" variant="secondary" asChild><Link to="/auctions/$id" params={{ id: m.id }}>Place Bid</Link></Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent hover:bg-white/10 text-white" asChild><Link to="/auctions">All Auctions</Link></Button>
            </div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <img src={m.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const buyer = [
    { icon: Search, title: "Discover", desc: "Search 12,400+ verified listings and compare specs side by side." },
    { icon: ShieldCheck, title: "Verify", desc: "Request a physical inspection report or live video walkthrough." },
    { icon: Gavel, title: "Bid or Buy", desc: "Place a fixed offer, submit an inquiry, or bid in a live auction." },
    { icon: Truck, title: "Receive", desc: "Escrow-protected payment and bonded international shipping." },
  ];
  const seller = [
    { icon: Package, title: "List", desc: "Create a listing in 5 minutes with our guided seller flow." },
    { icon: BadgeCheck, title: "Verify", desc: "We inspect and issue the verified badge that buyers trust." },
    { icon: Users, title: "Match", desc: "Receive qualified inquiries and auction bids from real buyers." },
    { icon: Zap, title: "Ship & Earn", desc: "Fast payouts. Zero listing fees. 4% success fee only." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">How EmachineBD works</h2>
        <p className="mt-2 text-muted-foreground">Simple, verified and protected for buyers and sellers</p>
      </div>
      <Tabs defaultValue="buyer" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="buyer">For Buyers</TabsTrigger>
          <TabsTrigger value="seller">For Sellers</TabsTrigger>
        </TabsList>
        {[["buyer", buyer],["seller", seller]].map(([k, arr]) => (
          <TabsContent key={k as string} value={k as string} className="mt-8">
            <div className="grid gap-4 md:grid-cols-4">
              {(arr as typeof buyer).map((s, i) => (
                <div key={s.title} className="relative rounded-2xl border border-border bg-card p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-xs font-mono text-muted-foreground">STEP {i + 1}</div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-3xl border border-border bg-card p-8 lg:p-12">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <Section title="Loved by industrial teams" subtitle="Real feedback from procurement leaders and plant managers">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="p-6 space-y-4">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-sm leading-relaxed">"{t.quote}"</p>
            <div className="pt-2 border-t border-border">
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section title="Frequently asked" subtitle="Everything you need to know about buying and selling on EmachineBD">
      <div className="max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)} className="rounded-xl border border-border bg-card px-5">
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-primary/40 p-10 lg:p-16 text-white text-center overflow-hidden relative">
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to move your next machine?</h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">Join 2,800 verified sellers and 12,400+ buyers already trading on EmachineBD.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="secondary" asChild><Link to="/register">Start Selling</Link></Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent hover:bg-white/10 text-white" asChild><Link to="/products">Browse Marketplace</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
