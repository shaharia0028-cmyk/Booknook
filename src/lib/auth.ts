import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { sendEmail } from "./email";
import { db } from "./mongodb";
import { getPasswordError } from "./validation";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // After registering, people go to the Login page instead of being signed in.
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your BookNook password",
        text: `Hi ${user.name},\n\nUse this link to reset your password:\n${url}\n\nIf you did not ask for this, you can ignore this email.`,
      }).catch((error) => console.error("Could not send reset email:", error));
    },
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
      if (ctx.path !== "/sign-up/email" && ctx.path !== "/reset-password") return;
      const body = ctx.body as { password?: string; newPassword?: string } | undefined;
      const message = getPasswordError(body?.password ?? body?.newPassword ?? "");
      if (message) throw new APIError("BAD_REQUEST", { message });
    }),
  },
  plugins: [jwt()],
});
