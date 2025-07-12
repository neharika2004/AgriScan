"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Edit3, CloudSun, Leaf, ArrowRight, Play, Star, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

interface EnhancedHeroProps {
  language: "en" | "hi"
}

export function EnhancedHero({ language }: EnhancedHeroProps) {
  const [currentStat, setCurrentStat] = useState(0)
  const [mounted, setMounted] = useState(false)

  const content = {
    en: {
      title: "Transform Your Farming with",
      highlight: "AI-Powered Soil Analysis",
      subtitle: "Get instant, accurate soil recommendations and boost your crop yield by up to 40%",
      cta: "Start Free Analysis",
      watchDemo: "Watch Demo",
      uploadBtn: "Upload Soil Report",
      manualBtn: "Manual Entry",
      liveInfoBtn: "Live Weather & Crop Info",
      stats: [
        { number: "50,000+", label: "Farmers Helped" },
        { number: "95%", label: "Accuracy Rate" },
        { number: "40%", label: "Yield Increase" },
        { number: "24/7", label: "Support Available" },
      ],
      features: [
        "Instant AI-powered soil analysis",
        "Personalized fertilizer recommendations",
        "Multi-language support (English & Hindi)",
        "Real-time weather integration",
        "Expert agricultural guidance",
        "Mobile-optimized for field use",
      ],
    },
    hi: {
      title: "अपनी खेती को बदलें",
      highlight: "AI-संचालित मिट्टी विश्लेषण के साथ",
      subtitle: "तत्काल, सटीक मिट्टी सिफारिशें प्राप्त करें और अपनी फसल की उपज 40% तक बढ़ाएं",
      cta: "मुफ्त विश्लेषण शुरू करें",
      watchDemo: "डेमो देखें",
      uploadBtn: "मिट्टी रिपोर्ट अपलोड करें",
      manualBtn: "मैन्युअल एंट्री",
      liveInfoBtn: "लाइव मौसम और फसल जानकारी",
      stats: [
        { number: "50,000+", label: "किसानों की मदद की" },
        { number: "95%", label: "सटीकता दर" },
        { number: "40%", label: "उपज वृद्धि" },
        { number: "24/7", label: "सहायता उपलब्ध" },
      ],
      features: [
        "तत्काल AI-संचालित मिट्टी विश्लेषण",
        "व्यक्तिगत उर्वरक सिफारिशें",
        "बहु-भाषा समर्थन (अंग्रेजी और हिंदी)",
        "वास्तविक समय मौसम एकीकरण",
        "विशेषज्ञ कृषि मार्गदर्शन",
        "फील्ड उपयोग के लिए मोबाइल-अनुकूलित",
      ],
    },
  }

  const t = content[language]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % t.stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [t.stats.length])

    if (!mounted) return null
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g fill="#059669" fillOpacity="0.1"><circle cx="30" cy="30" r="4"/></g></g></svg>',
            )}")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="h-4 w-4" />
                #1 Agricultural AI Platform in India
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">{t.title}</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t.highlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t.subtitle}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                {t.watchDemo}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {t.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-500 ${
                    mounted && currentStat === index ? "scale-110 opacity-100" : "opacity-70"
                  }`}
                >
                  <div className="text-3xl font-bold text-green-600">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Action Cards */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <Link href="/upload">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.uploadBtn}</h3>
                      <p className="text-green-100">JPG, PDF supported • AI Analysis</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/upload?manual=true">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Edit3 className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.manualBtn}</h3>
                      <p className="text-blue-100">Enter data manually • Quick Results</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/updates">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <CloudSun className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.liveInfoBtn}</h3>
                      <p className="text-orange-100">Real-time updates • Weather alerts</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Features List */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {t.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <Leaf className="h-32 w-32 text-green-500 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <TrendingUp className="h-24 w-24 text-emerald-500 animate-bounce" />
      </div>
    </div>
  )
}
