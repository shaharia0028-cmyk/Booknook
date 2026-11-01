"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

export function ReturnButton({ borrowId }: { borrowId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    setLoading(true);
    try {
      await apiRequest(`/borrows/${borrowId}`, { method: "DELETE" });
      toast.success("Book returned. Thank you!");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not return this book.");
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleReturn} disabled={loading}>
      {loading ? "Returning..." : "Return Book"}
    </Button>
  );
}
