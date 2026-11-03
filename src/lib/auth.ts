import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { db } from "./mongodb";
import { getPasswordError } from "./validation";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // After registering, people go to the Login page instead of being signed in.
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  hooks: {
    // Server-side copy of the password rules, so they cannot be skipped.
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const body = ctx.body as { password?: string } | undefined;
      const message = getPasswordError(body?.password ?? "");
      if (message) throw new APIError("BAD_REQUEST", { message });
    }),
  },
  plugins: [jwt()],
});
