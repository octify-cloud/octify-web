"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const rx = (0.5 - py) * intensity;
      const ry = (px - 0.5) * intensity;
      // apply transform and a soft highlight following the cursor
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--px", `${px * 100}%`);
      el.style.setProperty("--py", `${py * 100}%`);
    },
    [intensity, reduce],
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-all duration-300",
          "group-hover/card:ring-1 group-hover/card:ring-zinc-500/70",
          "group-hover/card:ring-inset",
        )}
      />

      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--px, 50%) var(--py, 50%), color-mix(in oklab, white 9%, transparent), transparent 40%)",
          }}
        />
      )}

      <div className="relative z-[1] h-full">{children}</div>
    </motion.div>
  );
}
