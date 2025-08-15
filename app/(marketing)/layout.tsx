import Navbar from "@/components/general/navbar";

import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-h-full w-full flex-1 flex-col">
        <Navbar />
        {children}
      </main>
    </>
  );
}
