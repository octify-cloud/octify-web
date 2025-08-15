"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { navbarItems } from "@/constants/clientNavbarItems";
import { SignedIn, SignedOut } from "./auth-components";
import { NavUserDropdown } from "./nav-user";
import useSession from "../hooks/use-session";

import GithubButton from "./github-button";

function MobileOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size={"icon"}
        variant={"ghost"}
      >
        <Menu />
      </Button>
      {isOpen && (
        <div
          className="bg-background fixed top-16 right-0 left-0 z-50 flex w-full flex-col px-4 py-4"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col">
            {navbarItems.map((e, idx) => (
              <Link
                className="hover:bg-muted w-full border-b px-3 py-3 font-semibold capitalize transition-colors"
                key={idx}
                href={e.href}
              >
                {e.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex w-full flex-col gap-2">
            <SignedOut>
              <Link href={"/login"} className="w-full">
                <Button className="w-full" size={"sm"} variant={"outline"}>
                  Sign in
                </Button>
              </Link>
              <Link href={"/register"} className="w-full">
                <Button className="w-full" size={"sm"}>
                  Start your project
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link className="w-full" href={"/dashboard"}>
                <Button className="w-full">Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  const session = useSession();

  return (
    <div
      className="sticky top-0 z-40"
      style={{ transform: "translate3d(0,0,999px)" }}
    >
      <div className="bg-background/90 dark:bg-background/95 absolute inset-0 h-full w-full !opacity-100 transition-opacity" />
      <nav className="border-default z-40 border-b backdrop-blur-sm transition-opacity">
        <div className="mx-auto flex h-16 justify-between lg:container lg:px-16 xl:px-20">
          <div className="flex flex-1 items-center justify-between px-6 sm:items-stretch lg:px-0">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center">
                <a href="/">
                  <img
                    src={"/assets/general/octify.png"}
                    alt="Octify Logo"
                    className="h-[34px] object-cover"
                  />
                </a>
              </div>
              <nav className="z-10 hidden h-16 flex-1 items-center justify-center pl-8 sm:space-x-4 lg:flex">
                <div className="">
                  <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                    {navbarItems.map((e, idx) => (
                      <li
                        key={idx}
                        className="cursor-pointer text-sm font-medium"
                      >
                        <Link className="cursor-pointer" href={e.href}>
                          <Button variant={"ghost"} size={"sm"}>
                            {e.label}
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-full left-0 flex justify-center" />
              </nav>
            </div>
          </div>

          <div className="inset-y-0 mr-2 flex items-center px-4 lg:hidden">
            <SignedIn>
              <NavUserDropdown
                user={
                  session
                    ? {
                        avatar: session.user.image ?? "",
                        email: session.user.email,
                        name: session.user.name,
                      }
                    : undefined
                }
              />
            </SignedIn>
            <MobileOverlay />
          </div>

          <div className="mr-2 hidden items-center gap-4 px-4 lg:flex">
            <GithubButton />
            <SignedOut>
              <Link href={"/login"}>
                <Button size={"sm"} variant={"outline"}>
                  Sign in
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button size={"sm"}>Start your project</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <Link href={"/dashboard"}>
                  <Button size={"sm"}>Dashboard</Button>
                </Link>
                <NavUserDropdown
                  user={
                    session
                      ? {
                          avatar: session.user.image ?? "",
                          email: session.user.email,
                          name: session.user.name,
                        }
                      : undefined
                  }
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  );
}
