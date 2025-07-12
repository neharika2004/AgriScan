"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"

export default function UploadPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const searchParams = useSearchParams()
  const isManual = searchParams.get("manual") === "true"

  const content = {
    en: {
      title: isManual ? "Manual Soil Data Entry" : "Upload Soil Report",
      description: isManual ? "Enter your soil test data manually" : "Upload your soil test report (JPG, PDF)",
      dragText: "Drag and drop your soil report here, or click to browse",
      processing: "Processing your soil report...",
      submit: "Analyze Soil",
      manualFields: {
        ph: "Soil pH Level",
        nitrogen: "Nitrogen (N) - kg/ha",
        phosphorus: "Phosphorus (P) - kg/ha",
        potassium: "Potassium (K) - kg/ha",
        organic: "Organic Carbon %",
        location: "Farm Location",
      },
    },
    hi: {
      title: isManual ? "मैन्युअल मिट्टी डेटा एंट्री" : "मिट्टी रिपोर्ट अपलोड करें",
      description: isManual
        ? "अपना मिट्टी परीक्षण डेटा मैन्युअल रूप से दर्ज करें"
        : "अपनी मिट्टी परीक्षण रिपोर्ट अपलोड करें (JPG, PDF)",
      dragText: "अपनी मिट्टी रिपोर्ट यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
      processing: "आपकी मिट्टी रिपोर्ट प्रोसेस की जा रही है...",
      submit: "मिट्टी का विश्लेषण करें",
      manualFields: {
        ph: "मिट्टी का pH स्तर",
        nitrogen: "नाइट्रोजन (N) - किग्रा/हेक्टेयर",
        phosphorus: "फास्फोरस (P) - किग्रा/हेक्टेयर",
        potassium: "पोटेशियम (K) - किग्रा/हेक्टेयर",
        organic: "जैविक कार्बन %",
        location: "खेत का स्थान",
      },
    },
  }

  const t = content[language]

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      window.location.href = "/results"
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation language={language} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.description}</p>
            </div>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isManual ? <FileText className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
                {t.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isManual ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? "border-green-400 bg-green-50" : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">{t.dragText}</p>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.pdf,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload">
                      <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                        Choose File
                      </Button>
                    </Label>
                    {file && <p className="mt-4 text-sm text-green-600">Selected: {file.name}</p>}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ph">{t.manualFields.ph}</Label>
                      <Input id="ph" type="number" step="0.1" placeholder="6.5" />
                    </div>
                    <div>
                      <Label htmlFor="nitrogen">{t.manualFields.nitrogen}</Label>
                      <Input id="nitrogen" type="number" placeholder="120" />
                    </div>
                    <div>
                      <Label htmlFor="phosphorus">{t.manualFields.phosphorus}</Label>
                      <Input id="phosphorus" type="number" placeholder="25" />
                    </div>
                    <div>
                      <Label htmlFor="potassium">{t.manualFields.potassium}</Label>
                      <Input id="potassium" type="number" placeholder="180" />
                    </div>
                    <div>
                      <Label htmlFor="organic">{t.manualFields.organic}</Label>
                      <Input id="organic" type="number" step="0.1" placeholder="0.8" />
                    </div>
                    <div>
                      <Label htmlFor="location">{t.manualFields.location}</Label>
                      <Input id="location" placeholder="Village, District" />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isProcessing || (!isManual && !file)}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    t.submit
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer language={language} />
    </div>
  )
}
