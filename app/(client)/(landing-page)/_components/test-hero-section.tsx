import React from "react";

export default function TestHeroSection() {
  return (
    <div className="relative container overflow-hidden md:py-32">
      <div className="mb-4 flex items-center justify-center gap-4">
        <img
          className="size-6 dark:invert"
          alt="Copy paste icon"
          src="/images/block/block-1.svg"
        />
        <h2 className="text-foreground text-center text-lg font-semibold tracking-tight">
          Just Copy Paste
        </h2>
      </div>
      <h1 className="font-inter text-foreground mx-auto max-w-4xl text-center text-[70px] leading-[65px] font-semibold tracking-tighter md:text-[105px] md:leading-[96px]">
        Amazing components
      </h1>
      <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-center text-xl">
        Discover our collection of beautifully designed, ready-to-use components
        that you can easily integrate into your projects.
      </p>
      <div className="relative mt-8 flex flex-col items-center justify-center">
        <button
          data-slot="button"
          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 w-75 shrink-0 items-center justify-center gap-2 rounded-2xl px-2 py-6 text-sm font-medium whitespace-nowrap shadow-[0px_1px_3px_#0000001a,inset_0px_2px_0px_#ffffff40] transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          Sign up for free
        </button>
        <a
          href="#"
          className="text-muted-foreground group relative z-12 flex w-75 items-center justify-center rounded-2xl py-6 hover:bg-none"
        >
          Book a demo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right ml-1 h-4 w-4 transition-all ease-in-out group-hover:ml-4"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>
      <div
        className="absolute -top-80 -right-80 -z-10 hidden h-full w-240 items-center justify-center md:flex"
        style={{ opacity: 1, transform: "none" }}
      >
        <img
          className="infinite absolute w-full rotate-12 animate-[spin_15s_linear_infinite] dark:invert"
          src="/images/block/illustrations/tokyo-solar-system-around-a-smiley.svg"
          alt=""
        />
      </div>
      <div
        className="-bottom-80 -left-80 -z-10 mt-32 -mb-24 flex h-full w-full items-center justify-center md:absolute md:w-240"
        style={{ opacity: 1, transform: "none" }}
      >
        <img
          className="infinite absolute w-full rotate-12 animate-[spin_15s_linear_infinite] dark:invert"
          src="/images/block/illustrations/tokyo-solar-system-around-a-smiley.svg"
          alt=""
        />
      </div>
    </div>
  );
}
