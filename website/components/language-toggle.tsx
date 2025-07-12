"use client"

import { Button } from "@/components/ui/button"

interface LanguageToggleProps {
  language: "en" | "hi"
  onLanguageChange: (lang: "en" | "hi") => void
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("en")}
        className="rounded-full text-xs"
      >
        EN
      </Button>
      <Button
        variant={language === "hi" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("hi")}
        className="rounded-full text-xs"
      >
        हिं
      </Button>
    </div>
  )
}
