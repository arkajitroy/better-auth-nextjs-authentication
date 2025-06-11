"use client";

import { Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { label: "One uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: "One number", test: (pwd: string) => /\d/.test(pwd) },
    { label: "One special character", test: (pwd: string) => /[^a-zA-Z0-9]/.test(pwd) },
  ];

  const passedRequirements = requirements.filter((req) => req.test(password)).length;
  const strength = (passedRequirements / requirements.length) * 100;

  const getStrengthLabel = () => {
    if (strength === 0) return "";
    if (strength <= 40) return "Weak";
    if (strength <= 80) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strength <= 40) return "bg-red-500";
    if (strength <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Password strength</span>
        <span
          className={`text-sm font-medium ${
            strength <= 40 ? "text-red-600" : strength <= 80 ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {getStrengthLabel()}
        </span>
      </div>
      <Progress value={strength} className="h-2" />
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            {req.test(password) ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-gray-400" />
            )}
            <span className={req.test(password) ? "text-green-600" : "text-gray-500"}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
