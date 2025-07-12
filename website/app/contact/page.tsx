"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle, Send, HelpCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"
import { SmartTranslator } from "@/components/smart-translator"

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")

  const content = {
    en: {
      title: "Contact & Help",
      subtitle: "Get support and connect with our agricultural experts",
      contactForm: "Contact Form",
      faq: "Frequently Asked Questions",
      chatbot: "Chat Support",
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      messageLabel: "Message",
      send: "Send Message",
      phone: "Phone Support",
      emailSupport: "Email Support",
      address: "Office Address",
      chatPlaceholder: "Type your question here...",
      faqs: [
        {
          question: "How accurate is the soil analysis?",
          answer:
            "Our AI-powered analysis provides 95% accuracy when compared to laboratory results. However, we recommend periodic lab testing for critical decisions.",
        },
        {
          question: "Can I use the app offline?",
          answer:
            "Basic features work offline, but soil analysis and live updates require internet connection for real-time processing.",
        },
        {
          question: "Is the service free?",
          answer:
            "Basic soil analysis and recommendations are free. Premium features like detailed reports and expert consultation require subscription.",
        },
        {
          question: "How often should I test my soil?",
          answer: "We recommend testing soil at least twice a year - before major planting seasons and after harvest.",
        },
      ],
    },
    hi: {
      title: "संपर्क और सहायता",
      subtitle: "सहायता प्राप्त करें और हमारे कृषि विशेषज्ञों से जुड़ें",
      contactForm: "संपर्क फॉर्म",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      chatbot: "चैट सहायता",
      name: "पूरा नाम",
      email: "ईमेल पता",
      subject: "विषय",
      messageLabel: "संदेश",
      send: "संदेश भेजें",
      phone: "फोन सहायता",
      emailSupport: "ईमेल सहायता",
      address: "कार्यालय पता",
      chatPlaceholder: "यहाँ अपना प्रश्न टाइप करें...",
      faqs: [
        {
          question: "मिट्टी विश्लेषण कितना सटीक है?",
          answer:
            "हमारा AI-संचालित विश्लेषण प्रयोगशाला परिणामों की तुलना में 95% सटीकता प्रदान करता है। हालांकि, महत्वपूर्ण निर्णयों के लिए हम आवधिक प्रयोगशाला परीक्षण की सिफारिश करते हैं।",
        },
        {
          question: "क्या मैं ऐप को ऑफलाइन उपयोग कर सकता हूं?",
          answer:
            "बुनियादी सुविधाएं ऑफलाइन काम करती हैं, लेकिन मिट्टी विश्लेषण और लाइव अपडेट के लिए वास्तविक समय प्रसंस्करण हेतु इंटरनेट कनेक्शन आवश्यक है।",
        },
        {
          question: "क्या यह सेवा मुफ्त है?",
          answer:
            "बुनियादी मिट्टी विश्लेषण और सिफारिशें मुफ्त हैं। विस्तृत रिपोर्ट और विशेषज्ञ परामर्श जैसी प्रीमियम सुविधाओं के लिए सब्सक्रिप्शन आवश्यक है।",
        },
        {
          question: "मुझे कितनी बार अपनी मिट्टी का परीक्षण करना चाहिए?",
          answer: "हम साल में कम से कम दो बार मिट्टी परीक्षण की सिफारिश करते हैं - प्रमुख रोपण सीजन से पहले और फसल के बाद।",
        },
      ],
    },
  }

  const t = content[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert(language === "en" ? "Message sent successfully!" : "संदेश सफलतापूर्वक भेजा गया!")
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Simulate bot response
      setTimeout(() => {
        const botResponse =
          language === "en"
            ? "Thank you for your question. Our expert will respond shortly."
            : "आपके प्रश्न के लिए धन्यवाद। हमारे विशेषज्ञ शीघ्र ही उत्तर देंगे।"
        alert(botResponse)
      }, 1000)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t.contactForm}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Send us a message and we'll get back to you within 24 hours"
                      : "हमें एक संदेश भेजें और हम 24 घंटे के भीतर आपसे संपर्क करेंगे"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t.name}</Label>
                        <Input id="name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.email}</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject">{t.subject}</Label>
                      <Input id="subject" required />
                    </div>
                    <div>
                      <Label htmlFor="message">{t.messageLabel}</Label>
                      <Textarea id="message" rows={5} required />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      {t.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-6 w-6" />
                    {t.faq}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {t.faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.phone}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">+91 1800-XXX-XXXX</p>
                      <p className="text-sm text-gray-600">
                        {language === "en" ? "Mon-Fri, 9 AM - 6 PM" : "सोम-शुक्र, सुबह 9 - शाम 6"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.emailSupport}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">support@agriscan.com</p>
                      <p className="text-sm text-gray-600">
                        {language === "en" ? "Response within 24 hours" : "24 घंटे के भीतर उत्तर"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium">AgriScan Technologies</p>
                      <p className="text-sm text-gray-600">
                        123 Agriculture Hub
                        <br />
                        New Delhi, India 110001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {t.chatbot}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setChatOpen(!chatOpen)} variant="outline" className="w-full">
                    {language === "en" ? "Start Chat" : "चैट शुरू करें"}
                  </Button>

                  {chatOpen && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                      <div className="mb-4 p-3 bg-white rounded border">
                        <p className="text-sm">
                          {language === "en"
                            ? "Hello! How can I help you today?"
                            : "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूं?"}
                        </p>
                      </div>
                      <form onSubmit={handleChatSubmit} className="flex gap-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t.chatPlaceholder}
                          className="flex-1"
                        />
                        <Button type="submit" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Smart Translator Section */}
      <div className="mt-12">
        <SmartTranslator language={language} />
      </div>
      <Footer language={language} />
    </div>
  )
}
