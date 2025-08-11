import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "Octify - All-in-One SaaS Backend Services | Private Server Solutions",
  description:
    "Get pre-built SaaS services like authentication, payments, and user management on your own private server. No vendor lock-in, just plug-and-play backend essentials for faster development.",
  keywords: [
    "SaaS backend services",
    "private server hosting",
    "authentication API",
    "payment processing",
    "user management",
    "microservices platform",
    "developer tools",
    "API services",
    "backend as a service",
    "Docker services",
  ],
  authors: [{ name: "Octify Team" }],
  creator: "Octify",
  publisher: "Octify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://octify.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Octify - All-in-One SaaS Backend Services",
    description:
      "Get pre-built SaaS services like authentication, payments, and user management on your own private server. No vendor lock-in, just plug-and-play backend essentials.",
    url: "https://octify.com",
    siteName: "Octify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Octify - Private SaaS Backend Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octify - All-in-One SaaS Backend Services",
    description:
      "Get pre-built SaaS services like authentication, payments, and user management on your own private server.",
    images: ["/twitter-image.png"],
    creator: "@octifyapp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
};
