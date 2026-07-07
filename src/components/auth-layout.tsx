import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({ children, title, subtitle, side }: { children: ReactNode; title: string; subtitle: string; side?: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col p-8 lg:p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="font-bold">EmachineBD</span>
        </Link>
        <div className="flex-1 grid place-items-center">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative h-full p-12 text-white flex flex-col justify-end">
          {side ?? (
            <>
              <div className="text-2xl font-semibold leading-snug max-w-md">
                "EmachineBD saved us months of sourcing. Verified inventory and transparent auctions—game changer for procurement."
              </div>
              <div className="mt-6 text-sm opacity-80">Rakib Ahmed • Plant Manager, Textile Co.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}