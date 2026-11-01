"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getPasswordError } from "@/lib/validation";
import { AuthShell } from "./auth-shell";
import { FormError } from "./form-error";
import { FormField } from "./form-field";
import { PasswordInput } from "./password-input";
import { PasswordRules } from "./password-rules";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const linkIsBroken = !token || params.get("error") === "INVALID_TOKEN";

  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    const passwordError = getPasswordError(password);
    setFieldError(passwordError ?? "");
    setError("");
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    const { error: resetError } = await authClient.resetPassword({ newPassword: password, token });
    setLoading(false);

    if (resetError) {
      const message = resetError.message || "Could not reset your password. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Password updated. Please log in.");
    router.push("/login");
  };

  return (
    <AuthShell
      title="Reset password"
      description="Choose a new password for your account."
      footer={
        <Link href="/login" className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
          Back to Login
        </Link>
      }
    >
      {linkIsBroken ? (
        <p className="text-sm leading-6 text-muted-foreground">
          This reset link is invalid or has expired.{" "}
          <Link href="/forgot-password" className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
            Request a new one
          </Link>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <FormError message={error} />
          <FormField id="password" label="New password" error={fieldError}>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(fieldError)}
            />
          </FormField>
          <PasswordRules password={password} />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Update password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
