import { Link } from "@tanstack/react-router";
import { Heart, MapPin, ShieldCheck, Gavel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Machine } from "@/lib/mock-data";

export function MachineCard({ m }: { m: Machine }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5">
      <Link to="/products/$id" params={{ id: m.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={m.image}
            alt={m.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-3 top-3 flex justify-between">
            <div className="flex gap-1.5">
              {m.verified && (
                <Badge className="bg-emerald-500/95 hover:bg-emerald-500 text-white gap-1 border-0">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </Badge>
              )}
              {m.auction && (
                <Badge className="bg-primary/95 text-primary-foreground border-0 gap-1">
                  <Gavel className="h-3 w-3" /> Auction
                </Badge>
              )}
            </div>
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full backdrop-blur bg-white/80">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{m.brand}</span>
          <span>•</span>
          <span>{m.condition}</span>
          <span>•</span>
          <span>{m.year}</span>
        </div>
        <Link to="/products/$id" params={{ id: m.id }}>
          <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {m.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {m.location}, Bangladesh
        </div>
        <div className="flex items-end justify-between pt-2 border-t border-border/60">
          <div>
            <div className="text-[11px] text-muted-foreground">Starting at</div>
            <div className="text-lg font-bold text-primary">
              ${m.price.toLocaleString()}
            </div>
          </div>
          <Button size="sm" variant="outline">View</Button>
        </div>
      </div>
    </div>
  );
}
