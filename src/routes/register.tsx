import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — EmachineBD" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Join 12,400+ verified buyers and sellers">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Account created — verify your email"); }}>
        <RadioGroup defaultValue="buyer" className="grid grid-cols-2 gap-2">
          <label className="rounded-xl border border-border p-3 cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
            <RadioGroupItem value="buyer" className="sr-only" />
            <div className="font-semibold">Buyer</div>
            <div className="text-xs text-muted-foreground">Find machines</div>
          </label>
          <label className="rounded-xl border border-border p-3 cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
            <RadioGroupItem value="seller" className="sr-only" />
            <div className="font-semibold">Seller</div>
            <div className="text-xs text-muted-foreground">List & sell</div>
          </label>
        </RadioGroup>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5"><label className="text-sm font-medium">First name</label><Input /></div>
          <div className="space-y-1.5"><label className="text-sm font-medium">Last name</label><Input /></div>
        </div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Company</label><Input placeholder="Optional" /></div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Email</label><Input type="email" /></div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Phone</label><Input /></div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Password</label><Input type="password" /></div>
        <Button type="submit" className="w-full" size="lg">Create account</Button>
        <p className="text-center text-sm text-muted-foreground">Already registered? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></p>
      </form>
    </AuthLayout>
  );
}