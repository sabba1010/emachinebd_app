import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageSquare, Send, ShieldCheck, Users } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { categories } from "@/lib/mock-data";

const schema = z.object({
  machineName: z.string().min(3, "Machine name too short"),
  category: z.string().min(1),
  description: z.string().min(20, "Please add more detail"),
  quantity: z.string().min(1),
  budget: z.string().min(1),
  location: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Post an Inquiry — EmachineBD" },
      { name: "description", content: "Post an inquiry and get quotes from verified industrial machine sellers." },
    ],
  }),
  component: InquiryPage,
});

function InquiryPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { machineName: "", category: "", description: "", quantity: "1", budget: "", location: "", name: "", email: "", phone: "" },
  });

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <MessageSquare className="h-3 w-3 text-primary" /> Inquiry System
          </div>
          <h1 className="mt-4 text-4xl font-bold">Tell us what machine you need</h1>
          <p className="mt-3 text-muted-foreground">Post a single inquiry and receive quotes from up to 12 verified sellers within 48 hours.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Card className="p-8">
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(() => {
                toast.success("Inquiry posted. Sellers will respond within 48h.");
                form.reset();
              })}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Machine name" error={form.formState.errors.machineName?.message}>
                  <Input placeholder="e.g. Mazak CNC Lathe QT-350" {...form.register("machineName")} />
                </Field>
                <Field label="Category" error={form.formState.errors.category?.message}>
                  <Select onValueChange={(v) => form.setValue("category", v)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Description" error={form.formState.errors.description?.message}>
                <Textarea rows={5} placeholder="Specs, condition, urgency…" {...form.register("description")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Quantity"><Input type="number" {...form.register("quantity")} /></Field>
                <Field label="Budget (USD)"><Input placeholder="e.g. 40,000" {...form.register("budget")} /></Field>
                <Field label="Location"><Input placeholder="City" {...form.register("location")} /></Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Your name"><Input {...form.register("name")} /></Field>
                <Field label="Email"><Input type="email" {...form.register("email")} /></Field>
                <Field label="Phone"><Input {...form.register("phone")} /></Field>
              </div>
              <Button type="submit" size="lg" className="w-full"><Send className="h-4 w-4 mr-1" /> Submit Inquiry</Button>
            </form>
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">How it works</h3>
              <ol className="space-y-4 text-sm">
                {[
                  { i: Send, t: "Post your requirement", d: "Fill in specs, budget and location." },
                  { i: Users, t: "Sellers respond", d: "Verified sellers send quotes and options." },
                  { i: CheckCircle2, t: "Compare & choose", d: "Compare quotes and pick the best offer." },
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><s.i className="h-4 w-4" /></div>
                    <div><div className="font-semibold">{s.t}</div><div className="text-muted-foreground text-xs mt-0.5">{s.d}</div></div>
                  </li>
                ))}
              </ol>
            </Card>
            <Card className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
                <ShieldCheck className="h-4 w-4" /> Buyer protected
              </div>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-300/80">Every seller is KYC-verified. Escrow payments and dispute mediation included on every deal.</p>
            </Card>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}