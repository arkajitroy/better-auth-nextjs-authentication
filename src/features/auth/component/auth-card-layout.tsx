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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          {showLogo && (
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  SecureAuth
                </span>
              </div>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center text-gray-900">{title}</CardTitle>
          <CardDescription className="text-center text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
