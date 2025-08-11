"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Non-linear ease (expo-like)
const EASE = [0.22, 1, 0.36, 1] as const;

type IconSpec = {
  src: string;
  alt: string;
  tint?: string;
};

// Large center hexagon that shows when items "combine" in stage 2
function CenterHex({ stage, size }: { stage: 0 | 1 | 2; size: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      initial={false}
      animate={{
        opacity: stage === 2 ? 1 : 0,
        scale: stage === 2 ? 1 : 0.9,
        rotate: stage === 2 ? 12 : 0,
      }}
      transition={{ duration: 0.9, ease: EASE, delay: stage === 2 ? 0.05 : 0 }}
      aria-hidden="true"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
            background:
              "radial-gradient(60% 60% at 50% 45%, rgba(15,23,42,0.06), rgba(15,23,42,0.02))",
            boxShadow: "0 18px 60px rgba(2,6,23,0.14)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              "polygon(27% 10%, 73% 10%, 96% 50%, 73% 90%, 27% 90%, 4% 50%)",
            background: "#ffffff",
            transform: "scale(0.92)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SecondHeroSection() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const reduce = useReducedMotion();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const clusterRef = useRef<HTMLDivElement | null>(null);
  const ICON_SIZE = 72;
  const [innerRadius, setInnerRadius] = useState<number>(180);
  const [maxRadius, setMaxRadius] = useState<number>(180);

  // Six icons only (using provided sources)
  const icons: IconSpec[] = useMemo(
    () => [
      {
        alt: "Next.js",
        src: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
      },
      {
        alt: "OpenAI",
        src: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/openai.png",
      },
      {
        alt: "Supabase",
        src: "https://img.icons8.com/color/512/supabase.png",
      },
      {
        alt: "Tailwind CSS",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
      },
      {
        alt: "Stripe",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
      },
      {
        alt: "Anthropic",
        src: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/anthropic-icon-wii9u8ifrjrd99btrqfgi.png/anthropic-icon-tdvkiqisswbrmtkiygb0ia.png?_a=DATAg1AAZAA0",
      },
    ],
    [],
  );

  // Stage 1 radial spread targets (polar to cartesian)
  const radialTargets = useMemo(() => {
    const r = Math.min(innerRadius, maxRadius);
    const n = icons.length;
    return new Array(n).fill(0).map((_, i) => {
      const angle = (i / n) * Math.PI * 2;
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
      };
    });
  }, [icons.length, innerRadius, maxRadius]);

  // Stage 2: combine into a hexagon (flat-top orientation)
  const hexCombineTargets = useMemo(() => {
    const n = icons.length; // 6
    const base = Math.min(innerRadius, maxRadius);
    const r = base + 16; // slightly looser on combine
    return new Array(n).fill(0).map((_, i) => {
      const angle = ((i + 0.5) / n) * Math.PI * 2; // offset to align flat sides
      return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
    });
  }, [icons.length, innerRadius, maxRadius]);

  useEffect(() => {
    if (reduce) {
      setStage(2);
      return;
    }
    const t0 = setTimeout(() => setStage(1), 30);
    const t1 = setTimeout(() => setStage(2), 2000); // stage 1 lasts ~1s
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [reduce]);

  // Measure central content to compute the needed inner radius for spacing
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const diagonalHalf = Math.hypot(rect.width, rect.height) / 2;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
      const margin = vw < 640 ? 64 : 96; // tighter on mobile
      const needed = diagonalHalf + margin + ICON_SIZE / 2;
      const clamped = Math.max(180, Math.min(520, Math.round(needed)));
      setInnerRadius(clamped);
    };
    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Measure cluster bounds to cap the radius so icons don't overflow the viewport
  useEffect(() => {
    const el = clusterRef.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const available =
        Math.min(rect.width, rect.height) / 2 - ICON_SIZE / 2 - 8;
      setMaxRadius(Math.max(80, Math.floor(available)));
    };
    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-white text-neutral-900">
      <section className="relative mx-auto flex h-[100svh] max-h-[100svh] w-full items-center justify-center px-4">
        {/* Rotating cluster */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: stage >= 1 ? 180 : 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div
            ref={clusterRef}
            className="relative h-[70vmin] max-h-[760px] min-h-[260px] w-[70vmin] max-w-[760px] min-w-[260px] sm:min-h-[320px] sm:min-w-[320px]"
          >
            {icons.map((ico, i) => {
              const r1 = radialTargets[i];
              const r2 = hexCombineTargets[i];
              return (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "flex items-center justify-center",
                  )}
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={{
                    x: stage === 0 ? 0 : stage === 1 ? r1.x : r2.x,
                    y: stage === 0 ? 0 : stage === 1 ? r1.y : r2.y,
                    scale: stage === 2 ? 1 : 0.98,
                  }}
                  transition={{
                    duration: stage === 1 ? 1 : 0.9,
                    ease: EASE,
                    delay: stage === 2 ? i * 0.015 : i * 0.09,
                  }}
                  aria-hidden="false"
                >
                  {/* Icon */}
                  <motion.div
                    className="relative rounded-full p-[2px] shadow-[0_10px_30px_rgba(2,6,23,0.12)]"
                    style={{
                      backgroundColor: "#1a1917",
                    }}
                    animate={{
                      boxShadow:
                        stage === 2
                          ? "0 16px 40px rgba(2,6,23,0.16)"
                          : "0 10px 30px rgba(2,6,23,0.12)",
                      // Rotate icons during stage 1
                      rotate: stage === 1 ? 180 : 0,
                    }}
                    transition={{ duration: stage === 1 ? 1 : 0.8, ease: EASE }}
                  >
                    <div
                      className="overflow-hidden rounded-full"
                      style={{
                        width: ICON_SIZE,
                        height: ICON_SIZE,
                        backgroundColor: "#1a1917",
                      }}
                    >
                      <motion.img
                        src={ico.src}
                        alt={ico.alt}
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                        className="h-full w-full object-contain select-none"
                        style={{
                          imageRendering: "auto",
                          padding: 10,
                        }}
                        initial={{
                          filter: "none",
                        }}
                        animate={{
                          filter: "none",
                        }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Central content (measured for spacing) */}
        <motion.div
          ref={contentRef}
          className="relative z-10 mx-auto flex max-w-[90vw] flex-col items-center text-center"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{
            opacity: stage === 2 ? 1 : 0,
            y: stage === 2 ? 0 : 8,
            scale: stage === 2 ? 1 : 0.98,
          }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
        >
          <p className="mb-3 rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600 shadow-sm">
            New • Two-stage animated hero
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-7xl">
            Fullstack Shadcn Templates
          </h1>
          <p className="mt-4 max-w-[60ch] text-base text-pretty text-neutral-600 sm:text-lg">
            Start fast on a clean, light theme with motion that feels alive.
          </p>

          <div className="pointer-events-auto mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-full bg-neutral-900 px-6 text-base text-white hover:bg-black"
            >
              <Link href="#get-started">{"Let's get started"}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-neutral-300 bg-white px-6 text-base text-neutral-900 hover:bg-neutral-100"
            >
              <Link href="#demo">Ask for demo</Link>
            </Button>
          </div>
        </motion.div>

        {/* Subtle vignette for depth on white */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0.0)_60%)]" />
      </section>
    </main>
  );
}
