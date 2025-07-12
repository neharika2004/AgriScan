"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Droplets, Thermometer, Beaker, CheckCircle, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"

export default function GuidePage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)

  const content = {
    en: {
      title: "Crop & Fertilizer Guide",
      subtitle: "Complete farming guidance for major crops",
      searchPlaceholder: "Search crops (Rice, Wheat, Sugarcane...)",
      idealConditions: "Ideal Growing Conditions",
      fertilizer: "Fertilizer Requirements",
      dosDonts: "Do's and Don'ts",
      dos: "Do's",
      donts: "Don'ts",
      ph: "pH Range",
      water: "Water Requirement",
      urea: "Urea Dose",
    },
    hi: {
      title: "फसल और उर्वरक गाइड",
      subtitle: "प्रमुख फसलों के लिए संपूर्ण कृषि मार्गदर्शन",
      searchPlaceholder: "फसल खोजें (धान, गेहूं, गन्ना...)",
      idealConditions: "आदर्श उगाने की स्थितियां",
      fertilizer: "उर्वरक आवश्यकताएं",
      dosDonts: "करें और न करें",
      dos: "करें",
      donts: "न करें",
      ph: "pH सीमा",
      water: "पानी की आवश्यकता",
      urea: "यूरिया की मात्रा",
    },
  }

  const t = content[language]

  const crops = [
    {
      id: "rice",
      name: language === "en" ? "Rice" : "धान",
      image: "/placeholder.svg?height=200&width=300",
      ph: "5.5 - 6.5",
      water: "1200-1800 mm",
      urea: "120-150 kg/ha",
      dos:
        language === "en"
          ? ["Maintain water level 2-5 cm", "Apply nitrogen in splits", "Use certified seeds"]
          : ["2-5 सेमी पानी का स्तर बनाए रखें", "नाइट्रोजन को भागों में डालें", "प्रमाणित बीज का उपयोग करें"],
      donts:
        language === "en"
          ? ["Avoid over-flooding", "Don't apply urea in standing water", "Avoid late transplanting"]
          : ["अधिक जल भराव से बचें", "खड़े पानी में यूरिया न डालें", "देर से रोपाई से बचें"],
    },
    {
      id: "wheat",
      name: language === "en" ? "Wheat" : "गेहूं",
      image: "/placeholder.svg?height=200&width=300",
      ph: "6.0 - 7.5",
      water: "450-650 mm",
      urea: "100-120 kg/ha",
      dos:
        language === "en"
          ? ["Sow at optimal time", "Apply phosphorus at sowing", "Maintain proper spacing"]
          : ["उचित समय पर बुवाई करें", "बुवाई के समय फास्फोरस डालें", "उचित दूरी बनाए रखें"],
      donts:
        language === "en"
          ? ["Avoid late sowing", "Don't over-irrigate", "Avoid excess nitrogen"]
          : ["देर से बुवाई से बचें", "अधिक सिंचाई न करें", "अधिक नाइट्रोजन से बचें"],
    },
    {
      id: "sugarcane",
      name: language === "en" ? "Sugarcane" : "गन्ना",
      image: "/placeholder.svg?height=200&width=300",
      ph: "6.0 - 8.0",
      water: "1800-2500 mm",
      urea: "200-250 kg/ha",
      dos:
        language === "en"
          ? ["Plant healthy setts", "Apply organic manure", "Maintain soil moisture"]
          : ["स्वस्थ कलमों की रोपाई करें", "जैविक खाद डालें", "मिट्टी की नमी बनाए रखें"],
      donts:
        language === "en"
          ? ["Avoid waterlogging", "Don't use diseased setts", "Avoid burning trash"]
          : ["जल भराव से बचें", "रोगग्रस्त कलमों का उपयोग न करें", "कचरा जलाने से बचें"],
    },
  ]

  const filteredCrops = crops.filter((crop) => crop.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation language={language} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Crop Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCrops.map((crop) => (
              <Card
                key={crop.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCrop === crop.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedCrop(selectedCrop === crop.id ? null : crop.id)}
              >
                <CardHeader className="pb-3">
                  <img
                    src={crop.image || "/placeholder.svg"}
                    alt={crop.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <CardTitle className="text-center">{crop.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Beaker className="h-4 w-4 text-blue-500" />
                        {t.ph}
                      </span>
                      <Badge variant="outline">{crop.ph}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        {t.water}
                      </span>
                      <Badge variant="outline">{crop.water}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Thermometer className="h-4 w-4 text-green-500" />
                        {t.urea}
                      </span>
                      <Badge variant="outline">{crop.urea}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed View */}
          {selectedCrop && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {crops.find((c) => c.id === selectedCrop)?.name} - {t.dosDonts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      {t.dos}
                    </h3>
                    <ul className="space-y-2">
                      {crops
                        .find((c) => c.id === selectedCrop)
                        ?.dos.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                      <X className="h-5 w-5" />
                      {t.donts}
                    </h3>
                    <ul className="space-y-2">
                      {crops
                        .find((c) => c.id === selectedCrop)
                        ?.donts.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <Footer language={language} />
      </div>
    </div>
  )
}
