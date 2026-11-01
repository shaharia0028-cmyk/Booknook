import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { passwordRules } from "@/lib/validation";

export function PasswordRules({ password }: { password: string }) {
  return (
    <ul className="space-y-1 text-sm" aria-label="Password requirements">
      {passwordRules.map((rule) => {
        const met = rule.test(password);
        return (
          <li key={rule.id} className={cn("flex items-center gap-2", met ? "text-foreground" : "text-muted-foreground")}>
            {met ? <Check className="size-4 text-accent" /> : <Circle className="size-4" />}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
