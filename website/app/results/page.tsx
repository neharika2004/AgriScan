"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Volume2, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"

export default function ResultsPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [isPlaying, setIsPlaying] = useState(false)

  const content = {
    en: {
      title: "Soil Analysis Results",
      subtitle: "Your personalized fertilizer recommendations",
      soilData: "Extracted Soil Data",
      recommendations: "Fertilizer Recommendations",
      downloadPdf: "Download Advice PDF",
      playAudio: "Play Audio Advice",
      soilHealth: "Soil Health Status",
      parameters: {
        ph: "Soil pH",
        nitrogen: "Nitrogen (N)",
        phosphorus: "Phosphorus (P)",
        potassium: "Potassium (K)",
        organic: "Organic Carbon",
      },
      fertilizers: {
        urea: "Urea",
        dap: "DAP (Di-Ammonium Phosphate)",
        mop: "MOP (Muriate of Potash)",
        lime: "Agricultural Lime",
      },
      status: {
        acidic: "Acidic - Needs Lime",
        optimal: "Optimal Range",
        high: "High - Reduce Application",
      },
    },
    hi: {
      title: "मिट्टी विश्लेषण परिणाम",
      subtitle: "आपकी व्यक्तिगत उर्वरक सिफारिशें",
      soilData: "निकाला गया मिट्टी डेटा",
      recommendations: "उर्वरक सिफारिशें",
      downloadPdf: "सलाह PDF डाउनलोड करें",
      playAudio: "ऑडियो सलाह चलाएं",
      soilHealth: "मिट्टी स्वास्थ्य स्थिति",
      parameters: {
        ph: "मिट्टी का pH",
        nitrogen: "नाइट्रोजन (N)",
        phosphorus: "फास्फोरस (P)",
        potassium: "पोटेशियम (K)",
        organic: "जैविक कार्बन",
      },
      fertilizers: {
        urea: "यूरिया",
        dap: "DAP (डाई-अमोनियम फास्फेट)",
        mop: "MOP (म्यूरिएट ऑफ पोटाश)",
        lime: "कृषि चूना",
      },
      status: {
        acidic: "अम्लीय - चूने की आवश्यकता",
        optimal: "इष्टतम सीमा",
        high: "उच्च - प्रयोग कम करें",
      },
    },
  }

  const t = content[language]

  const soilData = {
    ph: { value: 5.8, status: "acidic", unit: "" },
    nitrogen: { value: 145, status: "optimal", unit: "kg/ha" },
    phosphorus: { value: 18, status: "low", unit: "kg/ha" },
    potassium: { value: 220, status: "high", unit: "kg/ha" },
    organic: { value: 0.6, status: "low", unit: "%" },
  }

  const recommendations = [
    { name: t.fertilizers.lime, amount: "500 kg/ha", reason: "To increase soil pH", priority: "high" },
    { name: t.fertilizers.urea, amount: "100 kg/ha", reason: "Maintain nitrogen levels", priority: "medium" },
    { name: t.fertilizers.dap, amount: "150 kg/ha", reason: "Increase phosphorus", priority: "high" },
    { name: t.fertilizers.mop, amount: "50 kg/ha", reason: "Reduce potassium excess", priority: "low" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "acidic":
      case "low":
        return "destructive"
      case "high":
        return "secondary"
      case "optimal":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "acidic":
      case "low":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <Info className="h-4 w-4" />
      case "optimal":
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying)
    // Simulate audio playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation language={language} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Soil Data */}
            <Card>
              <CardHeader>
                <CardTitle>{t.soilData}</CardTitle>
                <CardDescription>{t.soilHealth}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(soilData).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t.parameters[key as keyof typeof t.parameters]}</p>
                      <p className="text-2xl font-bold text-green-700">
                        {data.value}
                        {data.unit}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(data.status)} className="flex items-center gap-1">
                      {getStatusIcon(data.status)}
                      {key === "ph" && data.status === "acidic"
                        ? t.status.acidic
                        : data.status === "optimal"
                          ? t.status.optimal
                          : data.status === "high"
                            ? t.status.high
                            : data.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>{t.recommendations}</CardTitle>
                <CardDescription>Based on your soil analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{rec.name}</h3>
                      <Badge
                        variant={
                          rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "secondary" : "outline"
                        }
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-green-600 mb-1">{rec.amount}</p>
                    <p className="text-sm text-gray-600">{rec.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="flex-1" size="lg">
              <Download className="mr-2 h-5 w-5" />
              {t.downloadPdf}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" size="lg" onClick={handlePlayAudio}>
              <Volume2 className={`mr-2 h-5 w-5 ${isPlaying ? "animate-pulse" : ""}`} />
              {t.playAudio}
            </Button>
          </div>

          {/* Visual Tag */}
          <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800">
                  {language === "en" ? "Soil pH: Acidic" : "मिट्टी का pH: अम्लीय"}
                </h3>
                <p className="text-orange-700">
                  {language === "en"
                    ? "Your soil is acidic (pH 5.8). Apply agricultural lime to improve pH levels for better crop growth."
                    : "आपकी मिट्टी अम्लीय है (pH 5.8)। बेहतर फसल वृद्धि के लिए pH स्तर सुधारने हेतु कृषि चूना डालें।"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer language={language} />
      </div>
    </div>
  )
}
