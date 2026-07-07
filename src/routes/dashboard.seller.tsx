import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Bell,
  DollarSign,
  FileText,
  Gavel,
  LayoutDashboard,
  MessageSquare,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Star,
} from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { machines, recentOrders, salesData } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/seller")({
  head: () => ({ meta: [{ title: "Seller Dashboard — EmachineBD" }] }),
  component: SellerDashboard,
});

const groups = [
  { title: "Overview", items: [
    { to: "/dashboard/seller", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/seller", label: "Products", icon: Package, badge: 42 },
    { to: "/dashboard/seller", label: "Auctions", icon: Gavel, badge: 6 },
    { to: "/dashboard/seller", label: "Orders", icon: ShoppingBag, badge: 12 },
  ]},
  { title: "Sales", items: [
    { to: "/dashboard/seller", label: "Inquiries", icon: MessageSquare, badge: 9 },
    { to: "/dashboard/seller", label: "Quotes", icon: FileText },
    { to: "/dashboard/seller", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/seller", label: "Reviews", icon: Star },
  ]},
  { title: "Account", items: [
    { to: "/dashboard/seller", label: "Notifications", icon: Bell },
    { to: "/dashboard/seller", label: "Settings", icon: Settings },
  ]},
];

function SellerDashboard() {
  const products = machines.slice(0, 8);
  return (
    <DashboardShell role="Seller" groups={groups}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Prime Industrial Ltd</h1>
          <p className="text-sm text-muted-foreground">Track your listings, auctions, and revenue</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-1" /> Add Product</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Products" value="42" delta="+3 this week" icon={Package} tone="primary" />
        <StatCard label="Revenue (30d)" value="$284k" delta="+18%" icon={DollarSign} tone="emerald" />
        <StatCard label="Active Auctions" value="6" delta="2 ending soon" icon={Gavel} tone="amber" />
        <StatCard label="Open Inquiries" value="9" delta="4 unread" icon={MessageSquare} tone="rose" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Revenue & Orders</div>
              <div className="text-xs text-muted-foreground">Last 12 months</div>
            </div>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Revenue</div>
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Orders</div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.52 0.19 255)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="orders" stroke="oklch(0.72 0.16 165)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-semibold mb-3">Top performers</div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="text-xs font-mono w-5 text-muted-foreground">#{i+1}</div>
                <img src={p.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">${p.price.toLocaleString()} • {12 - i} sold</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Your Products</div>
            <div className="flex gap-2"><Button variant="outline" size="sm">Bulk Action</Button><Button size="sm"><Plus className="h-4 w-4 mr-1" /> New</Button></div>
          </div>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground bg-muted/30">
                <tr>{["Product","Category","Price","Stock","Status","Views","Action"].map(h=><th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div className="min-w-0"><div className="font-medium truncate max-w-56">{p.name}</div><div className="text-xs text-muted-foreground">{p.brand}</div></div>
                      </div>
                    </td>
                    <td className="px-5 py-3 capitalize">{p.category}</td>
                    <td className="px-5 py-3 font-semibold">${p.price.toLocaleString()}</td>
                    <td className="px-5 py-3">{2 + (i % 5)}</td>
                    <td className="px-5 py-3"><Badge variant={i % 3 === 0 ? "default" : "secondary"}>{i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Draft"}</Badge></td>
                    <td className="px-5 py-3 text-muted-foreground">{240 + i * 37}</td>
                    <td className="px-5 py-3"><Button variant="ghost" size="sm">Edit</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="font-semibold mb-3">Recent Orders</div>
          <div className="space-y-3">
            {recentOrders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">{o.buyer.split(" ").map((w) => w[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{o.machine}</div>
                  <div className="text-xs text-muted-foreground">{o.id} • {o.buyer}</div>
                </div>
                <div className="text-sm font-semibold">${o.amount.toLocaleString()}</div>
                <Badge variant="secondary" className="text-[10px]">{o.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-semibold mb-3">Auctions overview</div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={salesData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="auctions" fill="oklch(0.72 0.16 165)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}