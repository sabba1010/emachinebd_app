import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Clock, Gavel, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { machines } from "@/lib/mock-data";

export const Route = createFileRoute("/auctions/$id")({
  loader: ({ params }) => {
    const m = machines.find((x) => x.id === params.id);
    if (!m) throw notFound();
    return { m };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Auction: ${loaderData?.m.name ?? ""} — EmachineBD` }],
  }),
  component: AuctionDetail,
});

function AuctionDetail() {
  const { m } = Route.useLoaderData();
  const [bid, setBid] = useState<string>(String(m.price + 500));
  const [time, setTime] = useState({ d: 2, h: 14, m: 36, s: 20 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => {
        let s = p.s - 1, mm = p.m, h = p.h, d = p.d;
        if (s < 0) { s = 59; mm--; }
        if (mm < 0) { mm = 59; h--; }
        if (h < 0) { h = 23; d--; }
        return { d, h, m: mm, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const history = Array.from({ length: 8 }, (_, i) => ({
    bidder: `Buyer_${String.fromCharCode(65 + i)}${(i * 7) % 99}`,
    amount: m.price - i * 500,
    time: `${i + 1}m ago`,
  }));

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <img src={m.image} alt="" className="h-full w-full object-cover" />
            </div>
            <Card className="mt-6 p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Bid History</h3>
              </div>
              <div className="divide-y divide-border">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold">{h.bidder.slice(-2)}</div>
                      <div>
                        <div className="font-medium">{h.bidder}</div>
                        <div className="text-xs text-muted-foreground">{h.time}</div>
                      </div>
                    </div>
                    <div className="font-bold text-primary">${h.amount.toLocaleString()}</div>
                    {i === 0 && <Badge className="bg-emerald-500 border-0">Winning</Badge>}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <div>
              <Badge className="gap-1"><Gavel className="h-3 w-3" /> Live Auction</Badge>
              <h1 className="mt-2 text-3xl font-bold">{m.name}</h1>
              <div className="mt-2 text-sm text-muted-foreground">Lot #{m.id} • {m.location}</div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Auction ends in</div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[["Days", time.d],["Hrs", time.h],["Min", time.m],["Sec", time.s]].map(([l, v]) => (
                  <div key={l as string} className="rounded-xl bg-background border border-border py-3 text-center">
                    <div className="text-2xl font-bold tabular-nums">{String(v).padStart(2, "0")}</div>
                    <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
              <Separator className="my-5" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Highest bid</div>
                  <div className="text-2xl font-bold text-primary">${m.price.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Bidders</div>
                  <div className="text-2xl font-bold">27</div>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <label className="text-xs font-medium">Your bid (USD)</label>
                <div className="flex gap-2">
                  <Input value={bid} onChange={(e) => setBid(e.target.value)} className="text-lg font-semibold" />
                  <Button size="lg" onClick={() => toast.success(`Bid $${bid} placed!`)}>Place Bid</Button>
                </div>
                <div className="text-[11px] text-muted-foreground">Min. increment $500. A $2,000 deposit is refundable.</div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold mb-3">Auction Rules</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> Verified inspection report included</li>
                <li className="flex gap-2"><Users className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Only verified buyers may bid</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Anti-sniping: bids in the last 5 min extend the auction 5 min</li>
                <li className="flex gap-2"><Gavel className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Winner has 48h to complete escrow payment</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}