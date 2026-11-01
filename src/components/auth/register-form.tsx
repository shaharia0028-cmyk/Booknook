"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl, withCallback } from "@/lib/redirect";
import { getPasswordError, isValidHttpUrl } from "@/lib/validation";
import { AuthShell } from "./auth-shell";
import { FormError } from "./form-error";
import { FormField } from "./form-field";
import { GoogleButton } from "./google-button";
import { OrDivider } from "./or-divider";
import { PasswordInput } from "./password-input";
import { PasswordRules } from "./password-rules";

type FieldErrors = Partial<Record<"name" | "email" | "image" | "password", string>>;

export function RegisterForm() {
  const router = useRouter();
  const callbackUrl = getSafeCallbackUrl(useSearchParams().get("callbackUrl"));
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const image = String(form.get("image") ?? "").trim();

    const errors: FieldErrors = {};
    if (!name) errors.name = "Please enter your name.";
    if (!image) errors.image = "Please add a photo URL.";
    else if (!isValidHttpUrl(image)) errors.image = "Enter a valid URL that starts with http:// or https://";
    const passwordError = getPasswordError(password);
    if (passwordError) errors.password = passwordError;

    setFieldErrors(errors);
    setError("");
    if (Object.keys(errors).length > 0) {
      toast.error(errors.password ?? "Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({ name, email, image, password });
    setLoading(false);

    if (signUpError) {
      const message = signUpError.message || "Could not create your account. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Account created. Please log in.");
    router.push(withCallback("/login", callbackUrl));
  };

  return (
    <AuthShell
      title="Register"
      description="Create an account to share books and borrow from other readers."
      footer={
        <>
          Already have an account?{" "}
          <Link href={withCallback("/login", callbackUrl)} className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
            Login
          </Link>
        </>
      }
    >
      <GoogleButton callbackUrl="/" label="Sign up with Google" />
      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormError message={error} />
        <FormField id="name" label="Name" error={fieldErrors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Your full name" aria-invalid={Boolean(fieldErrors.name)} />
        </FormField>
        <FormField id="email" label="Email">
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </FormField>
        <FormField id="image" label="Photo URL" error={fieldErrors.image}>
          <Input id="image" name="image" type="url" placeholder="https://example.com/photo.jpg" aria-invalid={Boolean(fieldErrors.image)} />
        </FormField>
        <FormField id="password" label="Password" error={fieldErrors.password}>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
          />
        </FormField>
        <PasswordRules password={password} />
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </AuthShell>
  );
}
