"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignupFormData, signupSchema } from "../validations/auth-schema";
import { AuthCardLayout } from "./auth-card-layout";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, Lock, Mail, Phone, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { OAuthButtons } from "./oauth-button";
import { PhoneInput } from "@/components/common/phone-input";
import { PasswordStrength } from "@/components/common/password-strength";

export default function SignupPageForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TSignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      countryCode: "+1",
    },
  });

  const watchedPhone = watch("phone");
  const watchedCountryCode = watch("countryCode");
  const watchedPassword = watch("password");
  const watchedUsername = watch("username");
  const watchedAcceptTerms = watch("acceptTerms");

  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) return;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsUsernameAvailable(username !== "admin"); // Simulate unavailable username
  };

  const onSubmit = async (data: TSignupFormData) => {
    setIsLoading(true);
    try {
      console.log("Signup data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowToast(true);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthCardLayout title="Create an account" description="Enter your information to get started">
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="pl-10 pr-10 h-11"
                  {...register("username")}
                  onChange={(e) => {
                    register("username").onChange(e);
                    checkUsernameAvailability(e.target.value);
                  }}
                />
                {isUsernameAvailable !== null && watchedUsername && watchedUsername.length >= 3 && (
                  <div className="absolute right-3 top-3">
                    {isUsernameAvailable ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
              {isUsernameAvailable === false && <p className="text-sm text-destructive">Username is already taken</p>}
              {isUsernameAvailable === true && <p className="text-sm text-green-600">Username is available</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="h-11"
                  {...register("firstName")}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" placeholder="Last name" className="h-11" {...register("lastName")} />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <div className="pl-10">
                  <PhoneInput
                    value={watchedPhone || ""}
                    onChange={(value) => setValue("phone", value)}
                    countryCode={watchedCountryCode}
                    onCountryCodeChange={(code) => setValue("countryCode", code)}
                    placeholder="Enter phone number"
                    error={!!errors.phone}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pl-10 pr-10 h-11"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              {watchedPassword && <PasswordStrength password={watchedPassword} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-11"
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={watchedAcceptTerms}
                onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-5">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

            <Button
              type="submit"
              className="w-full h-11 text-white font-semibold bg-gradient-to-r from-rose-800 via-violet-800 to-slate-900
                         hover:from-rose-900 hover:via-violet-900 hover:to-black
                         transition-colors duration-300 rounded-lg shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <OAuthButtons />

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </AuthCardLayout>

      {/* {showToast && (
        <Toast
          title="Account Created!"
          description="Please check your email to verify your account."
          variant="success"
          onClose={() => setShowToast(false)}
        />
      )} */}
    </>
  );
}
