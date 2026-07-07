import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — EmachineBD" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <AuthLayout title="Reset your password" subtitle="We'll send a 6-digit code to your email">
      {step === 1 ? (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Code sent"); setStep(2); }}>
          <div className="space-y-1.5"><label className="text-sm font-medium">Email</label><Input type="email" required /></div>
          <Button type="submit" className="w-full" size="lg">Send code</Button>
          <p className="text-center text-sm text-muted-foreground"><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></p>
        </form>
      ) : (
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); toast.success("Password reset"); }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter the 6-digit code</label>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="space-y-1.5"><label className="text-sm font-medium">New password</label><Input type="password" /></div>
          <Button type="submit" className="w-full" size="lg">Reset password</Button>
        </form>
      )}
    </AuthLayout>
  );
}