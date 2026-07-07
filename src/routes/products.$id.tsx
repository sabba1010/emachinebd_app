import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Calendar,
  Gavel,
  Heart,
  MapPin,
  MessageSquare,
  Play,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { MachineCard } from "@/components/machine-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { machines } from "@/lib/mock-data";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const machine = machines.find((m) => m.id === params.id);
    if (!machine) throw notFound();
    return { machine };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.machine.name} — EmachineBD` : "Machine — EmachineBD" },
      { name: "description", content: loaderData?.machine.description ?? "" },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { machine: m } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const gallery = [m.image, ...machines.slice(0, 4).map((x) => x.image)];
  const related = machines.filter((x) => x.category === m.category && x.id !== m.id).slice(0, 4);

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/products" className="hover:text-foreground">Marketplace</Link> /{" "}
          <span className="text-foreground">{m.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <img src={gallery[active]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <button className="absolute inset-0 grid place-items-center bg-black/0 hover:bg-black/20 transition-all">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-6 w-6 text-primary ml-1" />
                </div>
              </button>
              <div className="absolute top-4 left-4 flex gap-2">
                {m.verified && <Badge className="bg-emerald-500 gap-1"><ShieldCheck className="h-3 w-3" /> Verified</Badge>}
                {m.auction && <Badge className="gap-1"><Gavel className="h-3 w-3" /> Auction</Badge>}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} className={`aspect-[4/3] overflow-hidden rounded-xl border-2 ${i === active ? "border-primary" : "border-transparent"}`}>
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {m.brand} • {m.condition} • {m.year}
              </div>
              <h1 className="mt-1 text-3xl font-bold leading-tight">{m.name}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {m.location}, Bangladesh</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Inspected Mar 2026</span>
              </div>
            </div>

            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Asking Price</div>
                  <div className="text-4xl font-bold text-primary">${m.price.toLocaleString()}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Excl. shipping & VAT</div>
                </div>
                <Badge variant="secondary" className="gap-1"><Truck className="h-3 w-3" /> Ships in 5-7 days</Badge>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-2">
                <Button size="lg" onClick={() => toast.success("Inquiry sent to seller")}>
                  <MessageSquare className="h-4 w-4 mr-1" /> Send Inquiry
                </Button>
                {m.auction ? (
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/auctions/$id" params={{ id: m.id }}><Gavel className="h-4 w-4 mr-1" /> Place Bid</Link>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline">Buy Now</Button>
                )}
                <Button variant="ghost" onClick={() => toast("Added to wishlist")}><Heart className="h-4 w-4 mr-1" /> Save</Button>
                <Button variant="ghost" onClick={() => toast("Link copied")}><Share2 className="h-4 w-4 mr-1" /> Share</Button>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary font-bold">
                  {m.seller.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{m.seller}</div>
                    {m.sellerVerified && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> 4.8</span>
                    • 240 products • Since 2019
                  </div>
                </div>
                <Button variant="outline" size="sm">Visit Store</Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="desc">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <Card className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    {(Object.entries(m.specs) as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="desc" className="mt-6">
              <Card className="p-6 text-muted-foreground leading-relaxed">
                <p>{m.description}</p>
                <p className="mt-3">{m.description}</p>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-muted font-semibold">R{i}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Reviewer {i}</div>
                        <div className="flex gap-0.5 text-amber-400 mt-0.5">
                          {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">2 weeks ago</div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Excellent seller, machine arrived exactly as described. Full documentation included.</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card className="p-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Origin</span><span>{m.location}, Bangladesh</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Estimated transit</span><span>5-7 business days (within BD)</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">International shipping</span><span>Available on request</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Insurance</span><span>Included up to $10,000</span></div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Machines</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <MachineCard key={r.id} m={r} />)}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}