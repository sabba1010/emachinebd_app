import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  Gavel,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Trophy,
  User,
} from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auctionRows, machines, recentOrders, salesData } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/buyer")({
  head: () => ({ meta: [{ title: "Buyer Dashboard — EmachineBD" }] }),
  component: BuyerDashboard,
});

const groups = [
  { title: "Overview", items: [
    { to: "/dashboard/buyer", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/buyer", label: "Orders", icon: ShoppingCart, badge: 3 },
    { to: "/dashboard/buyer", label: "Winning Auctions", icon: Trophy, badge: 2 },
    { to: "/dashboard/buyer", label: "Bid History", icon: Gavel },
  ]},
  { title: "Activity", items: [
    { to: "/dashboard/buyer", label: "Favorites", icon: Heart },
    { to: "/dashboard/buyer", label: "Inquiries", icon: MessageSquare, badge: 5 },
    { to: "/dashboard/buyer", label: "Notifications", icon: Bell },
  ]},
  { title: "Account", items: [
    { to: "/dashboard/buyer", label: "Profile", icon: User },
    { to: "/dashboard/buyer", label: "Settings", icon: Settings },
  ]},
];

function BuyerDashboard() {
  return (
    <DashboardShell role="Buyer" groups={groups}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, Rakib</h1>
        <p className="text-sm text-muted-foreground">Here's what's happening with your machine purchases</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value="24" delta="+12%" icon={ShoppingCart} tone="primary" />
        <StatCard label="Won Auctions" value="7" delta="+2 this month" icon={Trophy} tone="emerald" />
        <StatCard label="Favorites" value="18" icon={Heart} tone="rose" />
        <StatCard label="Pending Inquiries" value="5" delta="3 quoted" icon={MessageSquare} tone="amber" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Spending Overview</div>
              <div className="text-xs text-muted-foreground">Monthly purchases and auction wins</div>
            </div>
            <Badge variant="secondary">Last 12 months</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.19 255)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.52 0.19 255)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.52 0.19 255)" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-semibold mb-3">Recent Activity</div>
          <ul className="space-y-3 text-sm">
            {[
              { t: "Won auction: Mazak QT-350", tag: "Auction", tone: "emerald" },
              { t: "New quote from BD Machine House", tag: "Inquiry", tone: "primary" },
              { t: "Order ORD-2841 shipped", tag: "Order", tone: "amber" },
              { t: "Saved 4 machines to favorites", tag: "Wishlist", tone: "rose" },
              { t: "Bid placed on Trumpf Press", tag: "Auction", tone: "primary" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{i + 1}h ago</div>
                </div>
                <Badge variant="outline" className="text-[10px]">{a.tag}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Recent Orders</div>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="text-left">{["Order","Machine","Amount","Status"].map(h=><th key={h} className="px-5 py-2 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {recentOrders.slice(0,5).map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-5 py-3 font-medium">{o.id}</td>
                    <td className="px-5 py-3 truncate max-w-40">{o.machine}</td>
                    <td className="px-5 py-3">${o.amount.toLocaleString()}</td>
                    <td className="px-5 py-3"><Badge variant="secondary">{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Active Bids</div>
            <Badge className="bg-emerald-500 gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Live</Badge>
          </div>
          <div className="space-y-3">
            {auctionRows.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <img src={machines.find((m) => m.id === r.id)?.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{r.machine}</div>
                  <div className="text-xs text-muted-foreground">Bid ${r.currentBid.toLocaleString()} • {r.remaining}</div>
                </div>
                <Button size="sm" variant="outline">Raise</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-5">
          <div className="font-semibold mb-4">Purchases by category</div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="oklch(0.52 0.19 255)" radius={[6,6,0,0]} />
                <Bar dataKey="auctions" fill="oklch(0.72 0.16 165)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}