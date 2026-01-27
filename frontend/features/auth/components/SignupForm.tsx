"use client";

import React, {useState} from "react";
import InputField from "./AuthInputField";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {FormEvent} from "react";
import {useAuthForm} from "../hooks/useAuthForm";
import {usePasswordToggle} from "../hooks/usePasswordToggle";
import {useAppMutation} from "@/features/shared/hooks/useAppMutation";
import {authClient} from "../services/authClient";
import {toast} from "sonner";
import {RegisterRequest} from "../types/auth.types";

export default function SignupForm() {
  const {fields, updateField} = useAuthForm();
  const passwordToggle = usePasswordToggle();
  const [accountType, setAccountType] = useState<"solo" | "company">("solo");

  const mutation = useAppMutation({
    mutationFn: authClient.signup,
    onSuccessRedirect: "/login",
    successMessage: "Signup successful!",
    errorMessage: "Signup failed. Please try again.",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ispasswordMatch =
      fields.password && fields.password === fields.confirm_password;

    if (!ispasswordMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload: RegisterRequest = {
      first_name: fields.first_name || "",
      last_name: fields.last_name || "",
      account_type: accountType,
      email_address: fields.email_address,
      contact_no: fields.contact_no || "",
      password: fields.password,
      role: fields.role,
    };

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          htmlFor="firstName"
          id="firstName"
          type="text"
          value={fields.first_name || ""}
          onChange={(e) => updateField("first_name", e.target.value)}
          placeholder="John"
        />
        <InputField
          label="Last Name"
          htmlFor="lastName"
          id="lastName"
          type="text"
          value={fields.last_name || ""}
          onChange={(e) => updateField("last_name", e.target.value)}
          placeholder="Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Account Type</label>
        <Select
          value={accountType}
          onValueChange={(value: "solo" | "company") => setAccountType(value)}
        >
          <SelectTrigger id="accountType">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solo">Solo</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {accountType === "company" && (
        <InputField
          label="Company Name"
          htmlFor="companyName"
          id="companyName"
          type="text"
          value={fields.company_name || ""}
          onChange={(e) => updateField("company_name", e.target.value)}
          placeholder="LinkPoint Corporation"
        />
      )}

      <InputField
        label="Email Address"
        htmlFor="email"
        id="email"
        type="email"
        value={fields.email_address}
        onChange={(e) => updateField("email_address", e.target.value)}
        placeholder="your.email@example.com"
      />

      <InputField
        label="Contact Number"
        htmlFor="contactNumber"
        id="contactNumber"
        type="tel"
        value={fields.contact_no || ""}
        onChange={(e) => updateField("contact_no", e.target.value)}
        placeholder="+1 (555) 000-0000"
      />

      <InputField
        label="Password"
        htmlFor="password"
        id="password"
        type="password"
        value={fields.password}
        onChange={(e) => updateField("password", e.target.value)}
        placeholder="Enter your password"
        showPassword={passwordToggle.showPassword}
        onTogglePassword={() => passwordToggle.setShowPassword((prev) => !prev)}
      />

      <InputField
        label="Confirm Password"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type="password"
        value={fields.confirm_password || ""}
        onChange={(e) => updateField("confirm_password", e.target.value)}
        placeholder="Confirm your password"
        showPassword={passwordToggle.showPassword}
        onTogglePassword={() => passwordToggle.setShowPassword((prev) => !prev)}
      />

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary hover:bg-primary/90 h-12"
      >
        {mutation.isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
