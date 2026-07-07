import { createFileRoute, Link } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/mock-data";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — EmachineBD" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold">Browse by Category</h1>
        <p className="mt-2 text-muted-foreground">12 categories, 12,400+ verified industrial machines</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/products">
              <Card className="p-6 hover:border-primary hover:shadow-lg transition-all h-full">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <Boxes className="h-6 w-6" />
                </div>
                <div className="mt-4 text-lg font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.count} verified listings</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}