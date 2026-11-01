"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/api";
import type { Book } from "@/types";
import { BookForm } from "./book-form";

export function EditBookDialog({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="space-y-1.5 pr-8">
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>Update the details of &ldquo;{book.title}&rdquo;.</DialogDescription>
        </div>
        <BookForm mode="edit" book={book} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteBookButton({ book }: { book: Book }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiRequest(`/books/${book._id}`, { method: "DELETE" });
      toast.success("Book deleted.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete this book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-destructive/40 text-destructive hover:bg-destructive hover:text-white">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-1.5 pr-8">
          <DialogTitle>Delete this book?</DialogTitle>
          <DialogDescription>&ldquo;{book.title}&rdquo; will be removed from the library. This cannot be undone.</DialogDescription>
        </div>
        <div className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete} disabled={loading} className="bg-destructive text-white hover:bg-destructive/85">
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
