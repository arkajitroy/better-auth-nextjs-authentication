"use client";

import type React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface AuthCardLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  showLogo?: boolean;
}

export function AuthCardLayout({ title, description, children, showLogo = true }: AuthCardLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl border border-slate-200 bg-white/90 backdrop-blur-md rounded-2xl">
        <CardHeader className="space-y-4 pb-6">
          {showLogo && (
            <div className="flex justify-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  SecureAuth
                </span>
              </div>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center text-slate-900">{title}</CardTitle>
          <CardDescription className="text-center text-slate-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </div>
  );
}
