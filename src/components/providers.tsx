"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

function Toasts() {
  const { resolvedTheme } = useTheme();
  return <ToastContainer position="top-right" autoClose={3000} theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
      <Toasts />
    </ThemeProvider>
  );
}
