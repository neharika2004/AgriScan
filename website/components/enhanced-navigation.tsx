"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

interface EnhancedNavigationProps {
  language: "en" | "hi"
}

export function EnhancedNavigation({ language }: EnhancedNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const navItems = {
    en: [
      { href: "/", label: "Home" },
      {
        href: "/services",
        label: "Services",
        dropdown: [
          { href: "/upload", label: "Soil Analysis" },
          { href: "/guide", label: "Crop Guide" },
          { href: "/updates", label: "Weather Updates" },
        ],
      },
      { href: "/knowledge", label: "Knowledge Hub" },
      { href: "/contact", label: "Contact" },
    ],
    hi: [
      { href: "/", label: "होम" },
      {
        href: "/services",
        label: "सेवाएं",
        dropdown: [
          { href: "/upload", label: "मिट्टी विश्लेषण" },
          { href: "/guide", label: "फसल गाइड" },
          { href: "/updates", label: "मौसम अपडेट" },
        ],
      },
      { href: "/knowledge", label: "ज्ञान केंद्र" },
      { href: "/contact", label: "संपर्क" },
    ],
  }

  const items = navItems[language]

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                AgriScan
              </span>
              <p className="text-xs text-gray-500 -mt-1">Smart Farming AI</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {items.map((item) => (
              <div key={item.href} className="relative group">
                {item.dropdown ? (
                  <div
                    className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />

                    {activeDropdown === item.href && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.href}
                            href={dropItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative ${
                      pathname === item.href ? "text-green-600" : ""
                    }`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}

            <Link href="/upload">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {language === "en" ? "Start Analysis" : "विश्लेषण शुरू करें"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-green-100 bg-white/95 backdrop-blur-md">
            {items.map((item) => (
              <div key={item.href}>
                {item.dropdown ? (
                  <div>
                    <div className="block py-3 text-gray-700 font-medium">{item.label}</div>
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        href={dropItem.href}
                        className="block py-2 pl-4 text-gray-600 hover:text-green-600 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 ${
                      pathname === item.href ? "text-green-600" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/upload" onClick={() => setIsOpen(false)}>
              <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold">
                {language === "en" ? "Start Analysis" : "विश्लेषण शुरू करें"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
