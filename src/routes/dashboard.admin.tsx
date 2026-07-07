import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BadgeCheck,
  BarChart3,
  Bell,
  DollarSign,
  FileText,
  Gavel,
  Image,
  LayoutDashboard,
  ListChecks,
  Mail,
  MessageSquare,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  Tags,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  auctionRows,
  categoryData,
  inquiryRows,
  machines,
  recentOrders,
  salesData,
  users,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — EmachineBD" }] }),
  component: AdminDashboard,
});

const groups = [
  { title: "Overview", items: [
    { to: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/admin", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/admin", label: "Activity Logs", icon: Activity },
  ]},
  { title: "Users", items: [
    { to: "/dashboard/admin", label: "Buyers", icon: Users, badge: 8492 },
    { to: "/dashboard/admin", label: "Sellers", icon: BadgeCheck, badge: 2814 },
    { to: "/dashboard/admin", label: "Admins", icon: Shield },
  ]},
  { title: "Catalog", items: [
    { to: "/dashboard/admin", label: "Products", icon: Package, badge: 12400 },
    { to: "/dashboard/admin", label: "Categories", icon: Tags },
    { to: "/dashboard/admin", label: "Verification", icon: BadgeCheck },
    { to: "/dashboard/admin", label: "Auctions", icon: Gavel, badge: 28 },
    { to: "/dashboard/admin", label: "Inquiries", icon: MessageSquare, badge: 47 },
    { to: "/dashboard/admin", label: "Orders", icon: ShoppingBag },
  ]},
  { title: "Marketing", items: [
    { to: "/dashboard/admin", label: "Banners", icon: Image },
    { to: "/dashboard/admin", label: "CMS Pages", icon: FileText },
    { to: "/dashboard/admin", label: "Email Templates", icon: Mail },
  ]},
  { title: "System", items: [
    { to: "/dashboard/admin", label: "Notifications", icon: Bell },
    { to: "/dashboard/admin", label: "Support Tickets", icon: Ticket, badge: 12 },
    { to: "/dashboard/admin", label: "Roles", icon: ListChecks },
    { to: "/dashboard/admin", label: "Settings", icon: Settings },
  ]},
];

const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function AdminDashboard() {
  return (
    <DashboardShell role="Admin" groups={groups}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Platform Overview</h1>
          <p className="text-sm text-muted-foreground">EmachineBD control center</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <StatCard label="Total Revenue" value="$1.4M" delta="+18.2%" icon={DollarSign} tone="emerald" />
        <StatCard label="Total Users" value="11,306" delta="+412" icon={Users} tone="primary" />
        <StatCard label="Verified Products" value="12,400" delta="+142 today" icon={Package} tone="amber" />
        <StatCard label="Live Auctions" value="28" delta="9 ending today" icon={Gavel} tone="rose" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div><div className="font-semibold">Revenue trend</div><div className="text-xs text-muted-foreground">Rolling 12 months</div></div>
            <Badge className="gap-1 bg-emerald-500"><TrendingUp className="h-3 w-3" /> +18.2%</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#adminRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-semibold mb-3">Listings by category</div>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={95} paddingAngle={4}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="p-0 overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-border">
                <div className="flex gap-2">
                  <Badge variant="secondary">All 12,400</Badge>
                  <Badge variant="outline">Pending 84</Badge>
                  <Badge variant="outline">Rejected 12</Badge>
                </div>
                <Button size="sm">Bulk Approve</Button>
              </div>
              <DataTable
                headers={["Product","Seller","Category","Price","Status","Action"]}
                rows={machines.slice(0, 8).map((p, i) => [
                  <div key="p" className="flex items-center gap-3"><img src={p.image} className="h-9 w-9 rounded object-cover" alt="" /><div><div className="font-medium truncate max-w-56">{p.name}</div><div className="text-xs text-muted-foreground">{p.brand}</div></div></div>,
                  p.seller,
                  <span key="c" className="capitalize">{p.category}</span>,
                  `$${p.price.toLocaleString()}`,
                  <Badge key="s" variant={i%3===0?"default":"secondary"}>{i%3===0?"Approved":i%3===1?"Pending":"Rejected"}</Badge>,
                  <div key="a" className="flex gap-1"><Button size="sm" variant="ghost">Approve</Button><Button size="sm" variant="ghost">Reject</Button></div>,
                ])}
              />
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-0 overflow-hidden">
              <DataTable
                headers={["User","Email","Role","Status","Joined","Action"]}
                rows={users.map((u) => [
                  <div key="n" className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">{u.name.split(" ").map((w) => w[0]).slice(0,2).join("")}</div><div className="font-medium">{u.name}</div></div>,
                  u.email,
                  <Badge key="r" variant="outline">{u.role}</Badge>,
                  <Badge key="s" variant={u.status==="Active"?"default":u.status==="Suspended"?"destructive":"secondary"}>{u.status}</Badge>,
                  u.joined,
                  <Button key="a" size="sm" variant="ghost">Manage</Button>,
                ])}
              />
            </Card>
          </TabsContent>

          <TabsContent value="auctions">
            <Card className="p-0 overflow-hidden">
              <DataTable
                headers={["Auction","Current Bid","Highest Bidder","Remaining","Status"]}
                rows={auctionRows.map((r) => [
                  r.machine,
                  `$${r.currentBid.toLocaleString()}`,
                  r.highestBidder,
                  r.remaining,
                  <Badge key="s" variant={r.status==="Live"?"default":r.status==="Upcoming"?"secondary":"outline"}>{r.status}</Badge>,
                ])}
              />
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="p-0 overflow-hidden">
              <DataTable
                headers={["ID","Buyer","Machine","Category","Responses","Status"]}
                rows={inquiryRows.map((r) => [
                  r.id, r.buyer, r.machine, <span key="c" className="capitalize">{r.category}</span>, `${r.responses} quotes`,
                  <Badge key="s" variant={r.status==="Open"?"default":r.status==="Quoted"?"secondary":"outline"}>{r.status}</Badge>,
                ])}
              />
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-0 overflow-hidden">
              <DataTable
                headers={["Order","Buyer","Machine","Amount","Date","Status"]}
                rows={recentOrders.map((o) => [
                  o.id, o.buyer, <span key="m" className="truncate max-w-48 block">{o.machine}</span>,
                  `$${o.amount.toLocaleString()}`, o.date,
                  <Badge key="s" variant="secondary">{o.status}</Badge>,
                ])}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="font-semibold mb-4">User growth</div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-semibold mb-3">System alerts</div>
          <ul className="space-y-3 text-sm">
            {[
              { t: "12 products awaiting verification", tone: "amber" },
              { t: "3 support tickets escalated", tone: "rose" },
              { t: "Payment gateway healthy", tone: "emerald" },
              { t: "9 auctions ending in 1h", tone: "primary" },
            ].map((a, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${a.tone==="amber"?"bg-amber-500":a.tone==="rose"?"bg-rose-500":a.tone==="emerald"?"bg-emerald-500":"bg-primary"}`} />
                <span className="flex-1">{a.t}</span>
                <Button size="sm" variant="ghost">View</Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs text-muted-foreground bg-muted/40">
          <tr>{headers.map((h) => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border hover:bg-muted/30">
              {r.map((c, j) => <td key={j} className="px-5 py-3">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}