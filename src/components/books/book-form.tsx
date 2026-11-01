"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { bookCategories } from "@/lib/site";
import { uploadImage } from "@/lib/upload";
import type { Book } from "@/types";
import { BookImage } from "./book-image";

type BookFormProps = {
  mode: "add" | "edit";
  book?: Book;
  user?: { name: string; email: string };
  onSuccess?: () => void;
};

type Errors = Partial<Record<"title" | "author" | "copies" | "image" | "description", string>>;

export function BookForm({ mode, book, user, onSuccess }: BookFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const minCopies = mode === "add" ? 1 : 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const author = String(data.get("author") ?? "").trim();
    const category = String(data.get("category") ?? "");
    const copies = Number(data.get("copies"));
    const description = String(data.get("description") ?? "").trim();
    const file = data.get("image");
    const newFile = file instanceof File && file.size > 0 ? file : null;

    const nextErrors: Errors = {};
    if (!title) nextErrors.title = "Please enter the book title.";
    if (!author) nextErrors.author = "Please enter the author name.";
    if (!Number.isInteger(copies) || copies < minCopies) nextErrors.copies = `Enter a whole number, ${minCopies} or more.`;
    if (!description) nextErrors.description = "Please add a short description.";
    if (mode === "add" && !newFile) nextErrors.image = "Please choose a cover image.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const image = newFile ? await uploadImage(newFile) : (book?.image ?? "");
      const payload = { title, author, category, copies, description, image };

      if (mode === "add") {
        await apiRequest("/books", { method: "POST", body: payload });
        toast.success("Book added to the library.");
        router.push("/my-books");
      } else {
        await apiRequest(`/books/${book?._id}`, { method: "PATCH", body: payload });
        toast.success("Book updated.");
        onSuccess?.();
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="title" label="Book Title" error={errors.title}>
          <Input id="title" name="title" defaultValue={book?.title} aria-invalid={Boolean(errors.title)} />
        </FormField>
        <FormField id="author" label="Author Name" error={errors.author}>
          <Input id="author" name="author" defaultValue={book?.author} aria-invalid={Boolean(errors.author)} />
        </FormField>
        <FormField id="category" label="Category">
          <Select id="category" name="category" defaultValue={book?.category ?? bookCategories[0]}>
            {bookCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField id="copies" label="Total Copies" error={errors.copies}>
          <Input
            id="copies"
            name="copies"
            type="number"
            min={minCopies}
            max={999}
            defaultValue={book?.copies ?? 1}
            aria-invalid={Boolean(errors.copies)}
          />
        </FormField>
      </div>

      <FormField id="image" label={mode === "add" ? "Book Image" : "Replace cover image (optional)"} error={errors.image}>
        {mode === "edit" && book?.image && <BookImage src={book.image} alt={book.title} className="mb-2 h-24 w-[4.5rem] rounded-sm" />}
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="h-auto cursor-pointer py-2 file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
          aria-invalid={Boolean(errors.image)}
        />
      </FormField>

      <FormField id="description" label="Short Description" error={errors.description}>
        <Textarea id="description" name="description" defaultValue={book?.description} aria-invalid={Boolean(errors.description)} />
      </FormField>

      {user && (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="userName" label="User Name">
            <Input id="userName" value={user.name} readOnly className="bg-muted/60" />
          </FormField>
          <FormField id="userEmail" label="User Email">
            <Input id="userEmail" value={user.email} readOnly className="bg-muted/60" />
          </FormField>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Saving..." : mode === "add" ? "Add Book" : "Save Changes"}
      </Button>
    </form>
  );
}
