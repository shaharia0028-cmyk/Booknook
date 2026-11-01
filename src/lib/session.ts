import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** Returns the signed-in user, or sends the visitor to Login and back to `path` afterwards. */
export async function requireUser(path: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect(`/login?callbackUrl=${encodeURIComponent(path)}`);
  return session.user;
}
