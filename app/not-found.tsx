import NotFoundComponent from "@/components/general/not-found";
import React from "react";

export default async function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <NotFoundComponent
        message="We couldn't find that page."
        subTitle="It may have been moved, removed, or you might not have access in this organization."
        link="/"
        linkText="Go to home page"
      />
    </div>
  );
}
