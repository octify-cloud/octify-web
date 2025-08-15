"use client";

import { cn } from "@/lib/utils";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NotFoundComponent({
  message,
  subTitle,
  link,
  linkText,
  backgroundText,
  fullScreen,
}: {
  message?: string;
  subTitle?: string;
  link?: string;
  linkText?: string;
  backgroundText?: string;
  fullScreen?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-full w-full flex-col items-center justify-center text-center",
        {
          "min-h-screen": fullScreen,
        },
      )}
    >
      <div className="pointer-events-none absolute">
        <h1 className="text-foreground text-[10rem] opacity-[5%] blur-sm filter transition duration-200 select-none sm:text-[10rem] md:text-[12rem] lg:text-[20rem]">
          {backgroundText ?? 404}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 opacity-100 transition">
        <div className="text-foreground flex w-[320px] flex-col items-center justify-center space-y-3">
          <h1 className="m-2 text-2xl">{message}</h1>
          <p className="text-center text-sm">{subTitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={link ?? "/dashboard/home"}>
            <Button>
              <span className="truncate">{linkText}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
