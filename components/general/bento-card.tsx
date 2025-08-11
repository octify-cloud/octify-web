"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
  // Max tilt in degrees
  intensity?: number;
};

export default function BentoCard({
  children,
  className,
  intensity = 10,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        "group/card bg-card relative h-full w-full rounded-2xl border p-4 transition-all duration-300 md:p-5",
        "will-change-transform",
        // Enhanced border glow effect
        "border-border/50 hover:border-emerald-500/50",
        "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        "hover:shadow-emerald-500/20",
        className,
      )}
      style={
        reduce
          ? undefined
          : ({
              transform:
                "perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))",
            } as React.CSSProperties)
      }
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-all duration-300",
          "group-hover/card:ring-1 group-hover/card:ring-zinc-500/70",
          "group-hover/card:ring-inset",
        )}
      />

      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
