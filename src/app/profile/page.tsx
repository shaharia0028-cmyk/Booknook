import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");

  return (
    <>
      <PageHeader title="My Profile" description="Your BookNook account." />
      <section className="section">
        <div className="container-page">
          <div className="mx-auto flex max-w-md flex-col items-center rounded-lg border bg-card p-8 text-center">
            <Avatar className="size-24 border-2 border-accent">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2 className="mt-5 font-serif text-2xl font-semibold">{user.name}</h2>
            <p className="mt-1 break-all text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
