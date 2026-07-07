import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, LayoutList, SlidersHorizontal, X } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { MachineCard } from "@/components/machine-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categories, machines } from "@/lib/mock-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Marketplace — EmachineBD" },
      { name: "description", content: "Browse 12,400+ verified industrial machines from trusted sellers." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [conds, setConds] = useState<string[]>([]);
  const [price, setPrice] = useState([0, 500000]);
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = machines.filter((m) =>
      m.name.toLowerCase().includes(q.toLowerCase()) &&
      (cats.length === 0 || cats.includes(m.category)) &&
      (conds.length === 0 || conds.includes(m.condition)) &&
      m.price >= price[0] && m.price <= price[1],
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [q, cats, conds, price, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Marketplace</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">All Machines</h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} of {machines.length} listings</p>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="w-56" />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden md:flex rounded-md border border-border overflow-hidden">
              <Button variant={view === "grid" ? "default" : "ghost"} size="icon" onClick={() => setView("grid")} className="rounded-none"><Grid3x3 className="h-4 w-4" /></Button>
              <Button variant={view === "list" ? "default" : "ghost"} size="icon" onClick={() => setView("list")} className="rounded-none"><LayoutList className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <FilterSection title="Category">
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {categories.map((c) => (
                  <label key={c.slug} className="flex items-center justify-between text-sm cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={cats.includes(c.slug)} onCheckedChange={() => toggle(cats, setCats, c.slug)} />
                      {c.name}
                    </div>
                    <span className="text-xs text-muted-foreground">{c.count}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
            <FilterSection title="Condition">
              {["New", "Used", "Refurbished"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={conds.includes(c)} onCheckedChange={() => toggle(conds, setConds, c)} /> {c}
                </label>
              ))}
            </FilterSection>
            <FilterSection title={`Price: $${price[0].toLocaleString()} - $${price[1].toLocaleString()}`}>
              <Slider min={0} max={500000} step={5000} value={price} onValueChange={setPrice} />
            </FilterSection>
            <FilterSection title="Attributes">
              {["Verified", "Featured", "Auction", "Free Shipping"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox /> {c}
                </label>
              ))}
            </FilterSection>
            <Button variant="outline" className="w-full" onClick={() => { setCats([]); setConds([]); setPrice([0, 500000]); setQ(""); }}>
              <X className="h-4 w-4 mr-1" /> Reset filters
            </Button>
          </aside>

          <div>
            {(cats.length > 0 || conds.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {[...cats, ...conds].map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1">{t} <X className="h-3 w-3 cursor-pointer" /></Badge>
                ))}
              </div>
            )}
            {view === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((m) => <MachineCard key={m.id} m={m} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((m) => (
                  <Link key={m.id} to="/products/$id" params={{ id: m.id }} className="flex gap-4 rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all">
                    <img src={m.image} alt="" className="h-32 w-44 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                        {m.brand} • {m.condition} • {m.year}
                      </div>
                      <div className="font-semibold mt-1">{m.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{m.description}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold text-primary">${m.price.toLocaleString()}</div>
                      <Button size="sm" className="mt-2">View</Button>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-10 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <Button key={p} variant={p === 1 ? "default" : "outline"} size="icon" className="h-9 w-9">{p}</Button>
              ))}
              <Button variant="outline" size="sm" className="h-9">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}