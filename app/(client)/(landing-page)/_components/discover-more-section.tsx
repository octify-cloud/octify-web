"use client";
import React, { useState, useRef, useEffect } from "react";
import { servicesCarouselItems } from "../_constants/services-carosel-items";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type EmblaCarouselType } from "embla-carousel";
export default function ServicesSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const carouselApiRef = useRef<EmblaCarouselType>(null);

  // Function to handle item selection and carousel sync
  const handleItemSelect = (idx: number) => {
    setSelectedIdx(idx);
    // Scroll carousel to selected item
    if (carouselApiRef.current && carouselApiRef.current.scrollTo) {
      carouselApiRef.current.scrollTo(idx);
    }
  };

  // Function to handle carousel scroll and sync selection
  const handleCarouselSelect = (api: EmblaCarouselType | undefined) => {
    if (!api) return;

    // Store API reference for programmatic control
    carouselApiRef.current = api;

    // Update selected index when carousel changes
    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      setSelectedIdx(currentIndex);
    });
  };

  return (
    <section className="">
      <div className="mx-auto px-4">
        <div className="mb-8 text-center md:mb-12">
          <span
            data-slot="badge"
            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground mb-3 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3"
          >
            Powerful Features
          </span>
          <h2 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            Discover What Makes Us Different
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:mt-4 md:text-base">
            Our platform combines powerful features with elegant design to help
            you accomplish more and achieve your goals.
          </p>
        </div>
        <div>
          <div className="mx-auto flex max-w-6xl flex-col-reverse gap-6 md:flex-row md:gap-8 lg:gap-16">
            <div className="md:w-1/2 lg:w-2/5">
              <ul className="grid grid-cols-1 gap-3 md:flex md:flex-col md:gap-2">
                {servicesCarouselItems.map((e, idx) => {
                  const isSelected = idx == selectedIdx;
                  return (
                    <li
                      key={idx}
                      className="group hover:border-border hover:bg-accent/30 relative flex cursor-pointer rounded-xl border border-transparent px-4 py-3 transition-all duration-300 md:px-5 md:py-4"
                      onClick={() => handleItemSelect(idx)}
                    >
                      <div className="flex w-full items-start gap-3 md:gap-4">
                        <div
                          className={cn(
                            "bg-muted text-muted-foreground flex aspect-square w-9 shrink-0 items-center justify-center rounded-lg transition-colors md:w-10",
                            {
                              "bg-primary text-foreground ring": isSelected,
                            },
                          )}
                        >
                          <e.icon
                            className={cn("w-5", {
                              "text-foreground": isSelected,
                            })}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={cn(
                              "text-muted-foreground mb-1 text-sm font-semibold transition-colors md:text-base lg:text-lg",
                              {
                                "text-foreground": isSelected,
                              },
                            )}
                          >
                            {e.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 text-xs transition-all md:text-sm md:group-data-open:opacity-100 lg:text-sm">
                            {e.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="relative md:w-1/2 lg:w-3/5">
              <Carousel
                className="h-full"
                setApi={handleCarouselSelect}
                opts={{
                  align: "start",
                  loop: false,
                }}
              >
                <CarouselContent className="-ml-2 h-full md:-ml-4">
                  {servicesCarouselItems.map((item, idx) => (
                    <CarouselItem
                      key={idx}
                      className="h-full w-full pl-2 md:pl-4"
                    >
                      <div className="border-border h-full w-full overflow-hidden rounded-xl border shadow-sm">
                        <div className="relative aspect-4/5 h-full max-h-[500px] w-full overflow-hidden md:aspect-3/4 lg:aspect-4/5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center transition-transform duration-500"
                          />
                          <div className="from-background/80 via-background/40 absolute right-0 bottom-0 left-0 bg-linear-to-t to-transparent p-6">
                            <div className="flex items-start gap-3">
                              <div className="bg-primary text-primary-foreground flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg">
                                <item.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="text-foreground text-xl font-semibold">
                                  {item.title}
                                </h3>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="mt-1 flex justify-center gap-2">
                {servicesCarouselItems.map((_, idx) => {
                  const isSelected = idx === selectedIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemSelect(idx)}
                      className={cn(
                        "bg-muted hover:bg-muted-foreground/50 size-2 rounded-full transition-all",
                        {
                          "bg-primary w-6": isSelected,
                        },
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
