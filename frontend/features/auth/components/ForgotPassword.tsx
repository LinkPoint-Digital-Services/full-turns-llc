import React from "react";
import AuthInputField from "./AuthInputField";
import {Button} from "@/components/ui/button";

interface ForgotPasswordProps {
  email?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  setEmail?: (email: string) => void;
  isSubmitting: boolean;
}

export default function ForgotPassword({
  email,
  setEmail,
  onSubmit,
  isSubmitting,
}: ForgotPasswordProps) {
  return (
    <form onSubmit={onSubmit}>
      <AuthInputField
        label="Email"
        htmlFor="email"
        id="email"
        type="email"
        required
        value={email || ""}
        onChange={(e) => setEmail?.(e.target.value)}
        placeholder="your.email@example.com"
      />

      <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
