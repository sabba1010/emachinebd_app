import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, ShoppingBag, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">EmachineBD</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              The verified industrial machine marketplace connecting buyers and sellers across South Asia. Buy, sell, auction and inquire — all in one platform.
            </p>
            <div className="pt-2">
              <div className="text-sm font-semibold mb-2">Join the newsletter</div>
              <div className="flex gap-2 max-w-sm">
                <Input placeholder="your@email.com" className="bg-background" />
                <Button><Mail className="h-4 w-4 mr-1" />Subscribe</Button>
              </div>
            </div>
          </div>
          {[
            { title: "Marketplace", links: [["Browse Machines", "/products"], ["Live Auctions", "/auctions"], ["Categories", "/categories"], ["Post Inquiry", "/inquiry"]] },
            { title: "Company", links: [["About", "/"], ["Careers", "/"], ["Press", "/"], ["Contact", "/"]] },
            { title: "Support", links: [["Help Center", "/"], ["Verification", "/"], ["Shipping", "/"], ["Terms", "/"]] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold mb-4">{col.title}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link to={href} className="hover:text-foreground">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <div>© 2026 EmachineBD. All rights reserved.</div>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
