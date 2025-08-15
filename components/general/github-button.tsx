"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import GithubSVG from "../svgs/github";
import Link from "next/link";
import { appConstants } from "@/constants/app-constants";

async function getGitHubStars() {
  const res = await fetch(appConstants.githubInfoUrl);
  if (!res.ok) return 0;
  const data = await res.json();
  return data.stargazers_count as number;
}

export default function GithubButton() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getGitHubStars().then((stars) => setCount(stars));
  }, []);
  if (count == null) return null;
  return (
    <Link target="_blank" href={appConstants.githubUrl}>
      <Button size={"sm"} variant="ghost" className="flex items-center gap-2">
        <GithubSVG className="size-4 fill-zinc-700" />
        <span className="text-sm text-zinc-700">{formatStars(count)}</span>
      </Button>
    </Link>
  );
}

function formatStars(num: number) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}
