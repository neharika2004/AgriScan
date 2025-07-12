"use client"

import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

interface FooterProps {
  language: "en" | "hi"
}

export function Footer({ language }: FooterProps) {
  const content = {
    en: {
      tagline: "Empowering farmers with AI-driven soil analysis and crop guidance",
      quickLinks: "Quick Links",
      services: "Services",
      support: "Support",
      connect: "Connect With Us",
      newsletter: "Newsletter",
      newsletterText: "Subscribe to get the latest agricultural updates and tips",
      subscribe: "Subscribe",
      copyright: "© 2024 AgriScan Technologies. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      links: {
        home: "Home",
        about: "About Us",
        upload: "Upload Report",
        guide: "Crop Guide",
        knowledge: "Knowledge Hub",
        updates: "Live Updates",
        contact: "Contact",
        soilAnalysis: "Soil Analysis",
        fertilizer: "Fertilizer Guide",
        weather: "Weather Updates",
        cropAdvisory: "Crop Advisory",
        help: "Help Center",
        faq: "FAQ",
        support: "Support",
        tutorials: "Tutorials",
      },
    },
    hi: {
      tagline: "AI-संचालित मिट्टी विश्लेषण और फसल मार्गदर्शन के साथ किसानों को सशक्त बनाना",
      quickLinks: "त्वरित लिंक",
      services: "सेवाएं",
      support: "सहायता",
      connect: "हमसे जुड़ें",
      newsletter: "न्यूज़लेटर",
      newsletterText: "नवीनतम कृषि अपडेट और सुझाव प्राप्त करने के लिए सब्सक्राइब करें",
      subscribe: "सब्सक्राइब करें",
      copyright: "© 2024 एग्रीस्कैन टेक्नोलॉजीज। सभी अधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      links: {
        home: "होम",
        about: "हमारे बारे में",
        upload: "रिपोर्ट अपलोड करें",
        guide: "फसल गाइड",
        knowledge: "ज्ञान केंद्र",
        updates: "लाइव अपडेट",
        contact: "संपर्क",
        soilAnalysis: "मिट्टी विश्लेषण",
        fertilizer: "उर्वरक गाइड",
        weather: "मौसम अपडेट",
        cropAdvisory: "फसल सलाह",
        help: "सहायता केंद्र",
        faq: "FAQ",
        support: "सहायता",
        tutorials: "ट्यूटोरियल",
      },
    },
  }

  const t = content[language]

  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-600 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AgriScan</h3>
                <p className="text-green-200 text-sm">Smart Farming Solutions</p>
              </div>
            </div>
            <p className="text-green-100 text-sm mb-6 leading-relaxed">{t.tagline}</p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-green-700 hover:bg-green-600 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 hover:bg-green-600 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 hover:bg-green-600 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 hover:bg-green-600 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-100">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {Object.entries(t.links)
                .slice(0, 7)
                .map(([key, value]) => (
                  <li key={key}>
                    <Link
                      href={key === "home" ? "/" : `/${key}`}
                      className="text-green-200 hover:text-white transition-colors text-sm"
                    >
                      {value}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-100">{t.services}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.soilAnalysis}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.fertilizer}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.weather}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.cropAdvisory}
                </a>
              </li>
            </ul>

            <h4 className="text-lg font-semibold mb-4 mt-6 text-green-100">{t.support}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.help}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.faq}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  {t.links.tutorials}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-100">{t.connect}</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-300" />
                <span className="text-green-200 text-sm">+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-300" />
                <span className="text-green-200 text-sm">support@agriscan.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-green-300 mt-1" />
                <span className="text-green-200 text-sm">New Delhi, India</span>
              </div>
            </div>

            <div className="bg-green-800 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-green-100">{t.newsletter}</h5>
              <p className="text-green-200 text-xs mb-3">{t.newsletterText}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-3 py-2 bg-green-700 border border-green-600 rounded text-white placeholder-green-300 text-sm focus:outline-none focus:border-green-400"
                />
                <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white text-sm font-medium transition-colors">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm">{t.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-green-200 hover:text-white text-sm transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="text-green-200 hover:text-white text-sm transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
