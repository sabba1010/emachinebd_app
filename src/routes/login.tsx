import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — EmachineBD" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your EmachineBD account">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Signed in"); }}>
        <div className="space-y-1.5"><label className="text-sm font-medium">Email</label><Input type="email" placeholder="you@company.com" /></div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Password</label><Input type="password" placeholder="••••••••" /></div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><Checkbox /> Remember me</label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" size="lg">Sign in</Button>
        <div className="relative py-2"><Separator /><span className="absolute left-1/2 -translate-x-1/2 top-0 bg-background px-2 text-xs text-muted-foreground">or continue with</span></div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button">Google</Button>
          <Button variant="outline" type="button">Phone</Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">No account? <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link></p>
      </form>
    </AuthLayout>
  );
}