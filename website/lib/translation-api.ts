"use client"

// Free translation API using MyMemory (no API key required)
export interface TranslationResponse {
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
}

export async function translateText(
  text: string,
  targetLanguage: "en" | "hi",
  sourceLanguage: "auto" | "en" | "hi" = "auto",
): Promise<string> {
  try {
    // Using MyMemory free translation API (no API key required)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`,
    )

    if (!response.ok) {
      throw new Error("Translation API request failed")
    }

    const data = await response.json()

    if (data.responseStatus === 200) {
      return data.responseData.translatedText
    } else {
      throw new Error("Translation failed")
    }
  } catch (error) {
    console.error("Translation API Error:", error)
    // Return original text as fallback
    return text
  }
}

export async function detectLanguage(text: string): Promise<string> {
  try {
    // Simple language detection based on character patterns
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /[a-zA-Z]/

    if (hindiPattern.test(text)) {
      return "hi"
    } else if (englishPattern.test(text)) {
      return "en"
    }

    return "en" // default to English
  } catch (error) {
    console.error("Language detection error:", error)
    return "en"
  }
}

// Batch translation for multiple texts
export async function translateBatch(texts: string[], targetLanguage: "en" | "hi"): Promise<string[]> {
  try {
    const translations = await Promise.all(
      texts.map(async (text) => {
        // Add small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
        return translateText(text, targetLanguage)
      }),
    )
    return translations
  } catch (error) {
    console.error("Batch translation error:", error)
    return texts // Return original texts as fallback
  }
}

// Enhanced translation with caching
const translationCache = new Map<string, string>()

export async function translateWithCache(
  text: string,
  targetLanguage: "en" | "hi",
  sourceLanguage: "auto" | "en" | "hi" = "auto",
): Promise<string> {
  const cacheKey = `${text}-${sourceLanguage}-${targetLanguage}`

  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  try {
    const translated = await translateText(text, targetLanguage, sourceLanguage)

    // Cache the result
    translationCache.set(cacheKey, translated)

    return translated
  } catch (error) {
    console.error("Cached translation error:", error)
    return text
  }
}

// Predefined translations for common agricultural terms
const agriculturalTerms = {
  en: {
    soil: "soil",
    crop: "crop",
    fertilizer: "fertilizer",
    weather: "weather",
    analysis: "analysis",
    recommendation: "recommendation",
    nitrogen: "nitrogen",
    phosphorus: "phosphorus",
    potassium: "potassium",
    ph: "pH",
    humidity: "humidity",
    temperature: "temperature",
    rainfall: "rainfall",
    irrigation: "irrigation",
    harvest: "harvest",
    planting: "planting",
    organic: "organic",
    pesticide: "pesticide",
    yield: "yield",
    farming: "farming",
  },
  hi: {
    soil: "मिट्टी",
    crop: "फसल",
    fertilizer: "उर्वरक",
    weather: "मौसम",
    analysis: "विश्लेषण",
    recommendation: "सिफारिश",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटेशियम",
    ph: "पीएच",
    humidity: "आर्द्रता",
    temperature: "तापमान",
    rainfall: "वर्षा",
    irrigation: "सिंचाई",
    harvest: "फसल",
    planting: "रोपण",
    organic: "जैविक",
    pesticide: "कीटनाशक",
    yield: "उत्पादन",
    farming: "कृषि",
  },
}

// Quick translation for agricultural terms
export function translateAgriculturalTerm(term: string, targetLanguage: "en" | "hi"): string {
  const lowerTerm = term.toLowerCase()
  const terms = agriculturalTerms[targetLanguage]

  for (const [key, value] of Object.entries(terms)) {
    if (key === lowerTerm) {
      return value
    }
  }

  return term // Return original if not found
}

// Smart translation that uses predefined terms first, then API
export async function smartTranslate(
  text: string,
  targetLanguage: "en" | "hi",
  sourceLanguage: "auto" | "en" | "hi" = "auto",
): Promise<string> {
  // Check if it's a single agricultural term
  const agriculturalTranslation = translateAgriculturalTerm(text, targetLanguage)
  if (agriculturalTranslation !== text) {
    return agriculturalTranslation
  }

  // Use API for longer texts
  return translateWithCache(text, targetLanguage, sourceLanguage)
}
