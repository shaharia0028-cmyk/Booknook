/** Only allow in-app paths so the callback can never send people to another site. */
export function getSafeCallbackUrl(value: string | null | undefined, fallback = "/"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (value.startsWith("/login") || value.startsWith("/register")) return fallback;
  return value;
}

/** Keeps the desired destination while moving between Login and Register. */
export function withCallback(path: string, callbackUrl: string): string {
  return callbackUrl === "/" ? path : `${path}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}
