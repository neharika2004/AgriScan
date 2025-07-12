"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Languages, ArrowRightLeft, Copy, Volume2 } from "lucide-react"
import { detectLanguage, smartTranslate } from "@/lib/translation-api"

interface SmartTranslatorProps {
  language: "en" | "hi"
}

export function SmartTranslator({ language }: SmartTranslatorProps) {
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState<string>("")
  const [targetLang, setTargetLang] = useState<"en" | "hi">(language === "en" ? "hi" : "en")

  const content = {
    en: {
      title: "Smart Agricultural Translator",
      subtitle: "Translate farming terms and advice between English and Hindi",
      inputPlaceholder: "Enter text to translate (e.g., soil analysis, crop recommendations...)",
      translate: "Translate",
      translating: "Translating...",
      copy: "Copy",
      speak: "Speak",
      detected: "Detected",
      examples: [
        "Soil pH is too acidic",
        "Apply nitrogen fertilizer",
        "Check irrigation system",
        "Monitor crop growth",
        "Weather forecast shows rain",
      ],
    },
    hi: {
      title: "स्मार्ट कृषि अनुवादक",
      subtitle: "अंग्रेजी और हिंदी के बीच कृषि शब्दों और सलाह का अनुवाद करें",
      inputPlaceholder: "अनुवाद के लिए टेक्स्ट दर्ज करें (जैसे मिट्टी विश्लेषण, फसल सिफारिशें...)",
      translate: "अनुवाद करें",
      translating: "अनुवाद हो रहा है...",
      copy: "कॉपी करें",
      speak: "बोलें",
      detected: "पहचाना गया",
      examples: [
        "मिट्टी का pH बहुत अम्लीय है",
        "नाइट्रोजन उर्वरक डालें",
        "सिंचाई प्रणाली की जांच करें",
        "फसल की वृद्धि की निगरानी करें",
        "मौसम पूर्वानुमान में बारिश दिखाई गई है",
      ],
    },
  }

  const t = content[language]

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    try {
      const detected = await detectLanguage(inputText)
      setDetectedLanguage(detected)

      const result = await smartTranslate(inputText, targetLang)
      setTranslatedText(result)
    } catch (error) {
      console.error("Translation error:", error)
      setTranslatedText("Translation failed. Please try again.")
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  const handleSpeak = (text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === "hi" ? "hi-IN" : "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  const swapLanguages = () => {
    setTargetLang(targetLang === "en" ? "hi" : "en")
    if (translatedText) {
      setInputText(translatedText)
      setTranslatedText(inputText)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Languages className="h-8 w-8 text-blue-600" />
          {t.title}
        </CardTitle>
        <p className="text-gray-600">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language Selector */}
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="px-4 py-2">
            {language === "en" ? "English" : "हिंदी"}
          </Badge>
          <Button variant="ghost" size="sm" onClick={swapLanguages} className="p-2 hover:bg-blue-50">
            <ArrowRightLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <Badge variant="outline" className="px-4 py-2">
            {targetLang === "en" ? "English" : "हिंदी"}
          </Badge>
        </div>

        {/* Translation Interface */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Input</label>
              {detectedLanguage && (
                <Badge variant="secondary" className="text-xs">
                  {t.detected}: {detectedLanguage.toUpperCase()}
                </Badge>
              )}
            </div>
            <Textarea
              placeholder={t.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleTranslate} disabled={!inputText.trim() || isTranslating} className="flex-1">
                {isTranslating ? t.translating : t.translate}
              </Button>
              {inputText && (
                <Button variant="outline" size="sm" onClick={() => handleSpeak(inputText, language)}>
                  <Volume2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Translation</label>
            <div className="min-h-32 p-3 bg-gray-50 border rounded-md">
              {translatedText ? (
                <p className="text-gray-800">{translatedText}</p>
              ) : (
                <p className="text-gray-400 italic">Translation will appear here...</p>
              )}
            </div>
            {translatedText && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleCopy(translatedText)} className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  {t.copy}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSpeak(translatedText, targetLang)}>
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Example Phrases */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Examples:</h3>
          <div className="flex flex-wrap gap-2">
            {t.examples.map((example, index) => (
              <Button key={index} variant="outline" size="sm" onClick={() => setInputText(example)} className="text-xs">
                {example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
