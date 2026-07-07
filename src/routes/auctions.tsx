import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Gavel, Users } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auctionMachines, auctionRows } from "@/lib/mock-data";

export const Route = createFileRoute("/auctions")({
  head: () => ({
    meta: [
      { title: "Live Auctions — EmachineBD" },
      { name: "description", content: "Bid on verified industrial machines in live and upcoming auctions." },
    ],
  }),
  component: AuctionsPage,
});

function AuctionsPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-10 text-primary-foreground">
          <Badge className="bg-white/20 border-white/20 text-white gap-1"><Gavel className="h-3 w-3" /> Auction Center</Badge>
          <h1 className="mt-4 text-4xl font-bold">Live Machine Auctions</h1>
          <p className="mt-2 text-white/80 max-w-xl">Bid on verified industrial machines. Transparent, escrow protected, and inspected before every sale.</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <Stat label="Live now" value="28" />
            <Stat label="Upcoming" value="14" />
            <Stat label="Ending today" value="9" />
            <Stat label="Won this month" value="$4.2M" />
          </div>
        </div>

        <Tabs defaultValue="live" className="mt-10">
          <TabsList>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
          </TabsList>
          <TabsContent value="live" className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {auctionMachines.map((m, i) => (
                <AuctionCard key={m.id} m={m} bidders={12 + i} timeLeft={`${1 + (i % 4)}d ${i * 3 % 24}h`} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {auctionMachines.slice(0, 6).map((m, i) => (
                <AuctionCard key={m.id} m={m} bidders={0} timeLeft={`Starts in ${i + 1}d`} upcoming />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ended" className="mt-6">
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr className="text-left">
                      {["Auction", "Winning Bid", "Winner", "Ended", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auctionRows.map((r) => (
                      <tr key={r.id} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{r.machine}</td>
                        <td className="px-4 py-3">${r.currentBid.toLocaleString()}</td>
                        <td className="px-4 py-3">{r.highestBidder}</td>
                        <td className="px-4 py-3 text-muted-foreground">2 days ago</td>
                        <td className="px-4 py-3"><Badge variant="secondary">Completed</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MarketingLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-widest opacity-80">{label}</div>
    </div>
  );
}

function AuctionCard({ m, bidders, timeLeft, upcoming }: { m: typeof auctionMachines[number]; bidders: number; timeLeft: string; upcoming?: boolean }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl transition-all">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={m.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <Badge className={`absolute top-3 left-3 gap-1 border-0 ${upcoming ? "bg-amber-500" : "bg-emerald-500"} text-white`}>
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {upcoming ? "Upcoming" : "Live"}
        </Badge>
        <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/60 backdrop-blur px-3 py-2 text-white flex items-center justify-between text-xs">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {timeLeft}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {bidders} bidders</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="font-semibold line-clamp-2">{m.name}</div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">Current bid</div>
            <div className="text-xl font-bold text-primary">${m.price.toLocaleString()}</div>
          </div>
          <Button size="sm" asChild><Link to="/auctions/$id" params={{ id: m.id }}>{upcoming ? "Details" : "Place Bid"}</Link></Button>
        </div>
      </div>
    </div>
  );
}