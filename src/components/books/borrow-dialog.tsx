"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ApiError, apiRequest } from "@/lib/api";

type BorrowDialogProps = {
  bookId: string;
  title: string;
  copies: number;
  userName: string;
  userEmail: string;
};

export function BorrowDialog({ bookId, title, copies, userName, userEmail }: BorrowDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (copies <= 0) {
    return (
      <Button size="lg" disabled>
        Not Available
      </Button>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await apiRequest(`/books/${bookId}/borrow`, { method: "POST" });
      toast.success("Book borrowed! Return it within 7 days.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }
      toast.error(error instanceof Error ? error.message : "Could not borrow this book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Borrow This Book</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-1.5 pr-8">
          <DialogTitle>Borrow &ldquo;{title}&rdquo;</DialogTitle>
          <DialogDescription>You can keep this book for 7 days.</DialogDescription>
        </div>
        <FormField id="borrow-name" label="User Name">
          <Input id="borrow-name" value={userName} readOnly className="bg-muted/60" />
        </FormField>
        <FormField id="borrow-email" label="User Email">
          <Input id="borrow-email" value={userEmail} readOnly className="bg-muted/60" />
        </FormField>
        <Button size="lg" onClick={handleConfirm} disabled={loading}>
          {loading ? "Borrowing..." : "Confirm Borrow"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
