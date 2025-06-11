"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const countries = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder = "Enter phone number",
  error = false,
}: PhoneInputProps) {
  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`rounded-r-none border-r-0 px-3 ${error ? "border-destructive" : ""}`}>
            <span className="mr-1">{selectedCountry.flag}</span>
            <span className="mr-1">{selectedCountry.code}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {countries.map((country) => (
            <DropdownMenuItem key={country.code} onClick={() => onCountryCodeChange(country.code)}>
              <span className="mr-2">{country.flag}</span>
              <span className="mr-2">{country.country}</span>
              <span>{country.code}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`rounded-l-none ${error ? "border-destructive" : ""}`}
      />
    </div>
  );
}
