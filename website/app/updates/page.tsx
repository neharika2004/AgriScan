"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CloudSun, Thermometer, Droplets, Wind, RefreshCw, AlertTriangle, MapPin, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"
import { getWeatherData, getCropAdvisories, type WeatherData } from "@/lib/weather-api"

export default function UpdatesPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [advisories, setAdvisories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const content = {
    en: {
      title: "Live Agricultural Updates",
      subtitle: "Real-time weather and crop advisory information powered by advanced APIs",
      weather: "Weather Forecast",
      advisories: "AI-Generated Crop Advisories",
      alerts: "Weather Alerts",
      refresh: "Refresh Data",
      lastUpdated: "Last updated",
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      rainfall: "Rainfall",
      location: "Location",
      loading: "Loading weather data...",
    },
    hi: {
      title: "लाइव कृषि अपडेट",
      subtitle: "उन्नत APIs द्वारा संचालित वास्तविक समय मौसम और फसल सलाह जानकारी",
      weather: "मौसम पूर्वानुमान",
      advisories: "AI-जनरेटेड फसल सलाह",
      alerts: "मौसम चेतावनी",
      refresh: "डेटा रीफ्रेश करें",
      lastUpdated: "अंतिम अपडेट",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      windSpeed: "हवा की गति",
      rainfall: "वर्षा",
      location: "स्थान",
      loading: "मौसम डेटा लोड हो रहा है...",
    },
  }

  const t = content[language]

  useEffect(() => {
    loadWeatherData()
  }, [])

  const loadWeatherData = async () => {
    setLoading(true)
    try {
      const data = await getWeatherData("New Delhi")
      setWeatherData(data)
      const cropAdvisories = await getCropAdvisories(data, language)
      setAdvisories(cropAdvisories)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to load weather data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    loadWeatherData()
  }

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return "☀️"
      case "cloudy":
      case "clouds":
        return "☁️"
      case "rainy":
      case "rain":
        return "🌧️"
      case "partly cloudy":
        return "⛅"
      default:
        return "🌤️"
    }
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation language={language} />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">{t.loading}</p>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation language={language} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {t.title}
              </h1>
              <p className="text-gray-600 text-lg">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              <Button onClick={handleRefresh} variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.refresh}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
            </div>
            {weatherData && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {weatherData.location.city}, {weatherData.location.country}
              </div>
            )}
          </div>

          {/* Weather Alerts */}
          {advisories.filter((a) => a.type === "warning" || a.type === "alert").length > 0 && (
            <div className="mb-8">
              {advisories
                .filter((a) => a.type === "warning" || a.type === "alert")
                .map((alert, index) => (
                  <Card key={index} className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 mb-4">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-orange-600" />
                        <div>
                          <h3 className="font-semibold text-orange-800">{alert.crop}</h3>
                          <p className="text-orange-700">{alert.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Weather */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CloudSun className="h-8 w-8 text-blue-600" />
                    {t.weather}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {weatherData?.current.description} • Feels like {weatherData?.current.temperature}°C
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {weatherData && (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="text-center p-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl">
                          <Thermometer className="h-10 w-10 text-red-500 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 font-medium">{t.temperature}</p>
                          <p className="text-3xl font-bold text-red-600">{weatherData.current.temperature}°C</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                          <Droplets className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 font-medium">{t.humidity}</p>
                          <p className="text-3xl font-bold text-blue-600">{weatherData.current.humidity}%</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl">
                          <Wind className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 font-medium">{t.windSpeed}</p>
                          <p className="text-3xl font-bold text-gray-600">{weatherData.current.windSpeed} km/h</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                          <CloudSun className="h-10 w-10 text-indigo-500 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 font-medium">{t.rainfall}</p>
                          <p className="text-3xl font-bold text-indigo-600">{weatherData.current.rainfall} mm</p>
                        </div>
                      </div>

                      {/* 5-Day Forecast */}
                      <div className="grid grid-cols-5 gap-3">
                        {weatherData.forecast.map((day, index) => (
                          <div
                            key={index}
                            className="text-center p-4 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
                          >
                            <p className="text-xs font-semibold text-gray-600 mb-2">{day.day}</p>
                            <img
                              src={getWeatherIcon(day.icon) || "/placeholder.svg"}
                              alt={day.condition}
                              className="w-12 h-12 mx-auto mb-2"
                            />
                            <p className="text-lg font-bold text-gray-800 mb-1">{day.temp}</p>
                            <p className="text-xs text-blue-600 font-medium">{day.rain}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Crop Advisories */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl">{t.advisories}</CardTitle>
                  <CardDescription>Based on current weather conditions and AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {advisories.map((advisory, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-green-800">{advisory.crop}</h3>
                        <Badge variant={advisory.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {advisory.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{advisory.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <Card className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                {language === "en" ? "Smart Agricultural Recommendations" : "स्मार्ट कृषि सिफारिशें"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-green-100 mb-4 text-lg">
                    {language === "en" ? "Recommended Actions" : "अनुशंसित कार्य"}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-300 text-xl">•</span>
                      <span className="text-green-50">
                        {language === "en"
                          ? "Monitor soil moisture levels with current humidity at " +
                            (weatherData?.current.humidity || 0) +
                            "%"
                          : "वर्तमान आर्द्रता " +
                            (weatherData?.current.humidity || 0) +
                            "% के साथ मिट्टी की नमी के स्तर की निगरानी करें"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-300 text-xl">•</span>
                      <span className="text-green-50">
                        {language === "en"
                          ? "Adjust irrigation based on " +
                            (weatherData?.forecast[0].rain || "0%") +
                            " rain probability"
                          : (weatherData?.forecast[0].rain || "0%") + " बारिश की संभावना के आधार पर सिंचाई को समायोजित करें"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-300 text-xl">•</span>
                      <span className="text-green-50">
                        {language === "en"
                          ? "Plan field activities considering wind speed of " +
                            (weatherData?.current.windSpeed || 0) +
                            " km/h"
                          : (weatherData?.current.windSpeed || 0) +
                            " किमी/घंटा की हवा की गति को देखते हुए खेत की गतिविधियों की योजना बनाएं"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-200 mb-4 text-lg">
                    {language === "en" ? "Weather-Based Precautions" : "मौसम आधारित सावधानियां"}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-300 text-xl">•</span>
                      <span className="text-red-100">
                        {language === "en"
                          ? "Temperature is " +
                            (weatherData?.current.temperature || 0) +
                            "°C - adjust crop protection accordingly"
                          : "तापमान " +
                            (weatherData?.current.temperature || 0) +
                            "°C है - तदनुसार फसल सुरक्षा को समायोजित करें"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-300 text-xl">•</span>
                      <span className="text-red-100">
                        {language === "en"
                          ? "Avoid spraying during high wind conditions"
                          : "तेज हवा की स्थिति में छिड़काव से बचें"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-300 text-xl">•</span>
                      <span className="text-red-100">
                        {language === "en"
                          ? "Check drainage systems before expected rainfall"
                          : "अपेक्षित वर्षा से पहले जल निकासी प्रणाली की जांच करें"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}
