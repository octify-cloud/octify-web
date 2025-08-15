import { Footer } from "@/components/general/footer";
import { footerConfigs } from "@/constants/footer-configs";
import React from "react";

export default function FooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer {...footerConfigs} />
    </>
  );
}
