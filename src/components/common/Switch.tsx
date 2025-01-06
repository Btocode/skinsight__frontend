"use client";

import { cn } from "@/lib/utils";

type SwitchProps = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export function Switch({ enabled, onToggle }: SwitchProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300",
        enabled ? "bg-primary" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300",
          enabled ? "translate-x-4" : "translate-x-1"
        )}
      />
    </button>
  );
}
