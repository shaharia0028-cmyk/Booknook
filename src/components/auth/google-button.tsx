"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import { authClient } from "@/lib/auth-client";

export function GoogleButton({ callbackUrl, label }: { callbackUrl: string; label: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: callbackUrl });
    // On success the browser leaves for Google, so we only get here on failure.
    if (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleClick} disabled={loading}>
      <GoogleIcon />
      {loading ? "Redirecting..." : label}
    </Button>
  );
}
