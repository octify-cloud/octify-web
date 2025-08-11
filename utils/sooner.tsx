import LoadingSpinner from "@/components/general/loading-spinner";
import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import { ExternalToast, toast } from "sonner";

export const sooner = {
  success: (msg: string, props?: ExternalToast) => {
    return toast(msg, {
      ...props,
      icon: <CircleCheck className="text-primary w-5" />,
    });
  },
  error: (msg: string, props?: ExternalToast) => {
    return toast(msg, {
      ...props,
      icon: <CircleX className="text-destructive w-5" />,
      style: {
        color: "var(--color-destructive)",
      },
    });
  },
  warning: (msg: string, props?: ExternalToast) => {
    return toast(msg, {
      ...props,
      icon: <TriangleAlert className="w-5" />,
    });
  },
  loading: (msg: string, props?: ExternalToast) => {
    return toast(msg, {
      ...props,
      icon: <LoadingSpinner className="w-5" />,
    });
  },
};
