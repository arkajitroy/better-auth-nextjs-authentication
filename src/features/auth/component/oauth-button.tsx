"use client";

import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";

export function OAuthButtons() {
  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log("Google login");
  };

  const handleGithubLogin = () => {
    // Implement GitHub OAuth login
    console.log("GitHub login");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" onClick={handleGoogleLogin}>
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" onClick={handleGithubLogin}>
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
