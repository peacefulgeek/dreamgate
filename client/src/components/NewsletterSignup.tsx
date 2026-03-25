import { useState } from "react";
import { storeSubscriber } from "@/lib/bunny";

interface Props {
  source?: string;
  variant?: "inline" | "hero";
}

export default function NewsletterSignup({ source = "footer", variant = "inline" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    const ok = await storeSubscriber(email, source);
    setStatus(ok ? "success" : "error");
    if (ok) setEmail("");
  };

  if (status === "success") {
    return (
      <div className={`${variant === "hero" ? "text-center" : ""}`}>
        <p className="text-primary font-heading text-lg font-semibold">
          You are in.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          The next dispatch arrives when there is something worth saying.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex ${variant === "hero" ? "flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" : "flex-col sm:flex-row gap-2"}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "Sending..." : "Cross the Threshold"}
      </button>
      {status === "error" && (
        <p className="text-destructive text-xs mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
