"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl, withCallback } from "@/lib/redirect";
import { AuthShell } from "./auth-shell";
import { FormError } from "./form-error";
import { FormField } from "./form-field";
import { GoogleButton } from "./google-button";
import { OrDivider } from "./or-divider";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const router = useRouter();
  const callbackUrl = getSafeCallbackUrl(useSearchParams().get("callbackUrl"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setError("");
    setLoading(true);
    const { error: signInError } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (signInError) {
      const message = signInError.message || "Invalid email or password.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Welcome back!");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <AuthShell
      title="Login"
      description="Welcome back. Log in to borrow books and manage your shelf."
      footer={
        <>
          New to BookNook?{" "}
          <Link href={withCallback("/register", callbackUrl)} className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
            Register
          </Link>
        </>
      }
    >
      <GoogleButton callbackUrl={callbackUrl} label="Continue with Google" />
      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
        <FormError message={error} />
        <FormField id="email" label="Email">
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </FormField>
        <FormField
          id="password"
          label="Password"
          action={
            <button
              type="button"
              onClick={() => toast.info("Password reset is not available yet.")}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
            >
              Forgot password?
            </button>
          }
        >
          <PasswordInput id="password" name="password" autoComplete="current-password" placeholder="Your password" required />
        </FormField>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
}
