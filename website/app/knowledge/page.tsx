"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, User } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"

export default function KnowledgePage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")

  const content = {
    en: {
      title: "Knowledge Hub",
      subtitle: "Learn from agricultural experts and improve your farming practices",
      readTime: "min read",
      categories: {
        soil: "Soil Management",
        fertilizer: "Fertilizer Guide",
        best: "Best Practices",
      },
    },
    hi: {
      title: "ज्ञान केंद्र",
      subtitle: "कृषि विशेषज्ञों से सीखें और अपनी कृषि पद्धतियों में सुधार करें",
      readTime: "मिनट पढ़ें",
      categories: {
        soil: "मिट्टी प्रबंधन",
        fertilizer: "उर्वरक गाइड",
        best: "सर्वोत्तम प्रथाएं",
      },
    },
  }

  const t = content[language]

  const articles = [
    {
      id: 1,
      title: language === "en" ? "How to Collect Soil Samples Correctly" : "मिट्टी के नमूने सही तरीके से कैसे लें",
      excerpt:
        language === "en"
          ? "Learn the proper technique for collecting representative soil samples for accurate testing results."
          : "सटीक परीक्षण परिणामों के लिए प्रतिनिधि मिट्टी के नमूने एकत्र करने की उचित तकनीक सीखें।",
      category: "soil",
      readTime: 5,
      author: language === "en" ? "Dr. Rajesh Kumar" : "डॉ. राजेश कुमार",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: language === "en" ? "Understanding Urea: Benefits and Risks" : "यूरिया को समझना: फायदे और जोखिम",
      excerpt:
        language === "en"
          ? "Comprehensive guide on urea fertilizer - when to use it, how much to apply, and potential risks of overuse."
          : "यूरिया उर्वरक पर व्यापक गाइड - इसका उपयोग कब करें, कितना डालें, और अधिक उपयोग के संभावित जोखिम।",
      category: "fertilizer",
      readTime: 8,
      author: language === "en" ? "Prof. Sunita Sharma" : "प्रो. सुनीता शर्मा",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: language === "en" ? "When NOT to Apply Fertilizers" : "उर्वरक कब न डालें",
      excerpt:
        language === "en"
          ? "Critical timing considerations for fertilizer application to maximize effectiveness and minimize environmental impact."
          : "प्रभावशीलता को अधिकतम करने और पर्यावरणीय प्रभाव को कम करने के लिए उर्वरक प्रयोग के लिए महत्वपूर्ण समय विचार।",
      category: "best",
      readTime: 6,
      author: language === "en" ? "Dr. Amit Patel" : "डॉ. अमित पटेल",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: language === "en" ? "Organic vs Chemical Fertilizers" : "जैविक बनाम रासायनिक उर्वरक",
      excerpt:
        language === "en"
          ? "Compare the benefits and drawbacks of organic and chemical fertilizers for sustainable farming."
          : "टिकाऊ कृषि के लिए जैविक और रासायनिक उर्वरकों के फायदे और नुकसान की तुलना करें।",
      category: "fertilizer",
      readTime: 10,
      author: language === "en" ? "Dr. Priya Singh" : "डॉ. प्रिया सिंह",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: language === "en" ? "Soil pH and Crop Productivity" : "मिट्टी का pH और फसल उत्पादकता",
      excerpt:
        language === "en"
          ? "Understanding how soil pH affects nutrient availability and what you can do to optimize it."
          : "समझें कि मिट्टी का pH पोषक तत्वों की उपलब्धता को कैसे प्रभावित करता है और इसे अनुकूलित करने के लिए आप क्या कर सकते हैं।",
      category: "soil",
      readTime: 7,
      author: language === "en" ? "Dr. Vikram Yadav" : "डॉ. विक्रम यादव",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: language === "en" ? "Water Management in Agriculture" : "कृषि में जल प्रबंधन",
      excerpt:
        language === "en"
          ? "Efficient water usage techniques and irrigation scheduling for better crop yields."
          : "बेहतर फसल उत्पादन के लिए कुशल जल उपयोग तकनीक और सिंचाई समय निर्धारण।",
      category: "best",
      readTime: 9,
      author: language === "en" ? "Dr. Meera Joshi" : "डॉ. मीरा जोशी",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "soil":
        return "bg-brown-100 text-brown-800"
      case "fertilizer":
        return "bg-green-100 text-green-800"
      case "best":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {t.categories[article.category as keyof typeof t.categories]}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime} {t.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Article */}
          <Card className="mt-12 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-6 w-6" />
                <Badge variant="secondary">Featured</Badge>
              </div>
              <CardTitle className="text-2xl">
                {language === "en"
                  ? "Complete Guide to Sustainable Farming Practices"
                  : "टिकाऊ कृषि पद्धतियों की संपूर्ण गाइड"}
              </CardTitle>
              <CardDescription className="text-green-100">
                {language === "en"
                  ? "A comprehensive resource covering soil health, water conservation, and eco-friendly farming techniques."
                  : "मिट्टी स्वास्थ्य, जल संरक्षण, और पर्यावरण-अनुकूल कृषि तकनीकों को कवर करने वाला एक व्यापक संसाधन।"}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer language={language} />
      </div>
    </div>
  )
}
