import Navbar from "@/components/general/navbar";
import React from "react";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-full w-full flex-1 flex-col">
        {children}
        <div className="h-[200px]" />
      </main>
    </>
  );
}
