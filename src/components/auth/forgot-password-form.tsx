"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { AuthShell } from "./auth-shell";
import { FormError } from "./form-error";
import { FormField } from "./form-field";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    setError("");
    setLoading(true);
    const { error: requestError } = await authClient.requestPasswordReset({ email, redirectTo: "/reset-password" });
    setLoading(false);

    if (requestError) {
      const message = requestError.message || "Could not send the reset link. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    setSent(true);
    toast.success("Check your email for the reset link.");
  };

  return (
    <AuthShell
      title="Forgot password"
      description="Enter your email and we will send you a link to choose a new password."
      footer={
        <Link href="/login" className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
          Back to Login
        </Link>
      }
    >
      {sent ? (
        <p className="rounded-md border bg-muted/60 px-4 py-3 text-sm leading-6">
          If an account exists for that email, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormError message={error} />
          <FormField id="email" label="Email">
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </FormField>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
