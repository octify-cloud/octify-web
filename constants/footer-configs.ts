import { FooterProps } from "@/components/general/footer";

export const footerConfigs: FooterProps = {
  copyright: "© {year} octify. All rights reserved.",
  description: "Plug and play all your SaaS in minutes.",
  legalLinks: [
    {
      href: "/legal/terms",
      name: "Terms and Conditions",
    },
    {
      href: "/legal/privacy",
      name: "Privacy Policy",
    },
  ],
  logo: {
    url: "/",
    alt: "Octify logo",
    src: "/assets/general/logo.png",
    title: "Octify Cloud",
  },
  sections: [
    {
      links: [],
      title: "",
    },
  ],
};
