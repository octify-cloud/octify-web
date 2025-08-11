import React from "react";
import LoginForm from "./_components/login-form";
import { Quote } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid h-full flex-1 lg:grid-cols-3">
      <div className="col-span-2 flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      <div className="bg-primary relative col-span-1 hidden flex-col items-center justify-center px-6 lg:flex">
        <img
          src="/assets/general/logo.png"
          alt="Octify Logo"
          className="w-[130px]"
        />
        <div className="mt-5 flex w-fit gap-2">
          <Quote className="rotate-180" />
          <span className="w-fit text-center text-lg font-medium">
            Access your dedicated infrastructure and manage your services with
            ease.
          </span>
          <Quote className="" />
        </div>
      </div>
    </div>
  );
}
