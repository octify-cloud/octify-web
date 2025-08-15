import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden lg:pt-32">
      <div className="text-muted-foreground z-10 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
        <Sparkles className="h-3.5 w-3.5" />
        Your Dedicated Backend Infrastructure Platform
      </div>
      <div className="container mt-5 flex flex-col text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-medium lg:text-6xl">
            Launch Your <span className="text-primary">SaaS in Days</span>, Not
            Months
          </h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            Get enterprise-grade backend infrastructure on your own private
            server. Focus on building your product while we handle the
            essentials.
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg">Start new project</Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant={"outline"}>
              See How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
