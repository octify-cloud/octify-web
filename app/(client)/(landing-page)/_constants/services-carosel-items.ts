import {
  Cloud,
  LucideIcon,
  Shield,
  CreditCard,
  Users,
  Zap,
} from "lucide-react";

type SectionItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
};

export const servicesCarouselItems: SectionItem[] = [
  {
    icon: Shield,
    title: "Authentication & Security",
    description:
      "Enterprise-grade user authentication, JWT management, and security frameworks. Complete user lifecycle management with social login integration and multi-factor authentication support.",
    image: "/images/auth-service.png",
  },
  {
    icon: CreditCard,
    title: "Payment & Billing Infrastructure",
    description:
      "Comprehensive payment processing with subscription management, automated billing cycles, and revenue optimization. Handle complex pricing models with built-in dunning and revenue recovery.",
    image: "/images/payment-service.png",
  },
  {
    icon: Users,
    title: "User Management Platform",
    description:
      "Complete customer lifecycle management with profile systems, team collaboration tools, and advanced user segmentation. Built-in analytics and engagement tracking for better retention.",
    image: "/images/user-management.png",
  },
  {
    icon: Zap,
    title: "Communication & Integration Hub",
    description:
      "Multi-channel notification system with email, SMS, and push capabilities. Advanced templating, A/B testing, and seamless third-party integrations for enhanced user experience.",
    image: "/images/communication-hub.png",
  },
];
