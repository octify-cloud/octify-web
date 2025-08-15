import {
  passwordConditionNames,
  validatePassword,
} from "@/types/schemas/client/register.schema";
import React from "react";
import { Label } from "../ui/label";
import { CircleX } from "lucide-react";

export default function PasswordStrength({ password }: { password: string }) {
  const { conditions } = validatePassword(password ?? "");
  const passConditions = passwordConditionNames.filter(
    (e) => !conditions[e.key],
  );

  if (passConditions.length == 0) return <></>;

  return (
    <div className="rounded-md p-4 ring ring-zinc-200">
      <Label className="font-medium">Password strength</Label>
      <hr className="my-2.5" />
      <div className="flex flex-col gap-2 transition-all">
        {passConditions.map((e, idx) => {
          return (
            <div
              key={idx}
              className={
                "text-destructive flex items-center gap-1 text-sm transition-all select-none"
              }
            >
              <CircleX className="w-5" />
              <span>{e.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
