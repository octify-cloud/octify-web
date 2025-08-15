"use client";

import {
  Sparkles,
  Rocket,
  TrendingUp,
  Play,
  CheckCircle2,
  Server,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import BentoCard from "@/components/general/bento-card";

import FingerPringSvg from "@/components/svgs/lock";

function HeroCard() {
  return (
    <div className="md:col-span-6 md:row-span-2">
      <BentoCard
        className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 text-white"
        intensity={12}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/30 via-emerald-500/25 to-emerald-600/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/30 via-blue-500/25 to-blue-600/20 blur-3xl"
        />

        <div className="relative z-10 flex h-full flex-col justify-between pb-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="border-white/10 bg-white/10 text-white"
            >
              Early Access
            </Badge>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              The Backend Marketplace That Builds Itself
            </h2>
            <p className="mt-2 max-w-[44ch] text-white/80">
              Launch faster with plug-and-play backend modules — auth, payments,
              file storage, and more — each deployed to your own isolated
              infrastructure in minutes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-zinc-900 hover:bg-zinc-100"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Get Early Access
            </Button>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <TrendingUp className="h-4 w-4" />
              Cut Launch Time by 60%
            </div>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

function FeaturesCard() {
  return (
    <div className="md:col-span-3 md:row-span-2">
      <BentoCard>
        <div className="flex h-full flex-col">
          <div className="mb-2 font-semibold">
            Why Builders Love Our Platform
          </div>
          <ul className="flex flex-col gap-4 text-sm">
            {[
              "Dedicated, tenant-isolated infrastructure",
              "Security & compliance baked in",
              "Production-ready from day one",
              "Full data ownership and portability",
            ].map((e, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {e}
              </li>
            ))}
          </ul>
        </div>
      </BentoCard>
    </div>
  );
}

function TestimonialCard() {
  return (
    <div className="md:col-span-3 md:row-span-2">
      <BentoCard className="relative">
        <img
          alt="background"
          src="https://library.shadcnblocks.com/images/block/patterns/square-alt-grid.svg"
          className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(75%_75%_at_center,white,transparent)] object-cover opacity-90"
        />
        <div className="flex h-full flex-col justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Authentication</span>
          </div>
          <FingerPringSvg className="m-auto w-[240px] fill-zinc-400 stroke-0" />
          <div className="text-sm">
            <span>
              Integrate your project with professional{" "}
              <span className="text-zinc-600">
                authentication service in a minute.
              </span>
            </span>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

function VideoPreviewCard() {
  return (
    <div className="md:col-span-3 md:row-span-2">
      <BentoCard className="relative overflow-hidden !p-0">
        <div className="relative h-full w-full overflow-hidden rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
          <div className="absolute inset-4">
            <div className="h-full w-full rounded-lg border bg-white shadow-sm dark:bg-zinc-900">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-muted-foreground ml-2 text-xs">
                  Backend Marketplace Dashboard
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">
                    All Services Operational
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Auth Module</span>
                    <span className="text-emerald-600">Running</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payments</span>
                    <span className="text-emerald-600">Running</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Management</span>
                    <span className="text-emerald-600">Running</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <Button
            variant="secondary"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-zinc-900 hover:bg-zinc-100"
            aria-label="Watch platform demo"
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>
      </BentoCard>
    </div>
  );
}

function CTACard() {
  return (
    <div className="md:col-span-3 md:row-span-1 lg:row-span-2">
      <BentoCard className="bg-muted/40">
        <div className="flex h-full flex-col items-start justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Build smarter, launch sooner</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Skip the Setup. Ship the Product.
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Book a live walkthrough and see how our marketplace can cut weeks
              of backend setup into minutes — while keeping full flexibility.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="h-9">
              <Rocket className="mr-2 h-4 w-4" />
              Book a Demo
            </Button>
            <Button className="h-9 bg-transparent" variant="outline">
              Join Waitlist
            </Button>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
      <div
        className={cn(
          "grid auto-rows-[240px] gap-4 sm:auto-rows-[260px] md:auto-rows-[280px] lg:auto-rows-[200px]",
          "grid-cols-1 md:grid-cols-6",
        )}
      >
        <HeroCard />
        <VideoPreviewCard />
        <TestimonialCard />
        <FeaturesCard />
        <CTACard />
      </div>
    </section>
  );
}
