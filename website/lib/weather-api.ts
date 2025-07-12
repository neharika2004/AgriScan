"use client"

// Weather API integration using OpenWeatherMap
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "demo_key"
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5"

export interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    rainfall: number
    condition: string
    description: string
    icon: string
  }
  forecast: Array<{
    date: string
    day: string
    temp: string
    condition: string
    rain: string
    icon: string
  }>
  location: {
    city: string
    country: string
    lat: number
    lon: number
  }
}

export async function getWeatherData(city = "New Delhi"): Promise<WeatherData> {
  try {
    // Current weather
    const currentResponse = await fetch(`${WEATHER_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)

    if (!currentResponse.ok) {
      throw new Error("Weather API request failed")
    }

    const currentData = await currentResponse.json()

    // 5-day forecast
    const forecastResponse = await fetch(`${WEATHER_BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastData = await forecastResponse.json()

    // Process forecast data (get daily forecasts)
    const dailyForecasts = forecastData.list
      .filter((_: any, index: number) => index % 8 === 0) // Every 8th item (24 hours)
      .slice(0, 5)
      .map((item: any, index: number) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        day: index === 0 ? "Today" : new Date(item.dt * 1000).toLocaleDateString("en", { weekday: "short" }),
        temp: `${Math.round(item.main.temp)}°C`,
        condition: item.weather[0].main.toLowerCase(),
        rain: `${Math.round((item.pop || 0) * 100)}%`,
        icon: item.weather[0].icon,
      }))

    return {
      current: {
        temperature: Math.round(currentData.main.temp),
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind?.speed * 3.6 || 0), // Convert m/s to km/h
        rainfall: currentData.rain?.["1h"] || 0,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
      },
      forecast: dailyForecasts,
      location: {
        city: currentData.name,
        country: currentData.sys.country,
        lat: currentData.coord.lat,
        lon: currentData.coord.lon,
      },
    }
  } catch (error) {
    console.error("Weather API Error:", error)
    // Return mock data as fallback
    return getMockWeatherData()
  }
}

function getMockWeatherData(): WeatherData {
  return {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      rainfall: 2.5,
      condition: "Partly Cloudy",
      description: "partly cloudy",
      icon: "02d",
    },
    forecast: [
      {
        date: new Date().toLocaleDateString(),
        day: "Today",
        temp: "28°C",
        condition: "sunny",
        rain: "10%",
        icon: "01d",
      },
      {
        date: new Date(Date.now() + 86400000).toLocaleDateString(),
        day: "Tomorrow",
        temp: "26°C",
        condition: "cloudy",
        rain: "40%",
        icon: "03d",
      },
      {
        date: new Date(Date.now() + 172800000).toLocaleDateString(),
        day: "Day 3",
        temp: "24°C",
        condition: "rainy",
        rain: "80%",
        icon: "10d",
      },
      {
        date: new Date(Date.now() + 259200000).toLocaleDateString(),
        day: "Day 4",
        temp: "27°C",
        condition: "sunny",
        rain: "5%",
        icon: "01d",
      },
      {
        date: new Date(Date.now() + 345600000).toLocaleDateString(),
        day: "Day 5",
        temp: "29°C",
        condition: "sunny",
        rain: "15%",
        icon: "02d",
      },
    ],
    location: {
      city: "New Delhi",
      country: "IN",
      lat: 28.6139,
      lon: 77.209,
    },
  }
}

export async function getCropAdvisories(weatherData: WeatherData, language: "en" | "hi" = "en") {
  // Generate crop advisories based on weather conditions
  const advisories = []

  if (weatherData.current.humidity > 70) {
    advisories.push({
      crop: language === "en" ? "Rice" : "धान",
      message:
        language === "en"
          ? "High humidity detected. Monitor for fungal diseases and ensure proper ventilation."
          : "उच्च आर्द्रता का पता चला। फंगल रोगों की निगरानी करें और उचित वेंटिलेशन सुनिश्चित करें।",
      priority: "high" as const,
      type: "warning" as const,
    })
  }

  if (weatherData.current.temperature > 35) {
    advisories.push({
      crop: language === "en" ? "Wheat" : "गेहूं",
      message:
        language === "en"
          ? "High temperature alert. Increase irrigation frequency and provide shade if possible."
          : "उच्च तापमान चेतावनी। सिंचाई की आवृत्ति बढ़ाएं और यदि संभव हो तो छाया प्रदान करें।",
      priority: "high" as const,
      type: "alert" as const,
    })
  }

  if (weatherData.forecast[0].rain.includes("8") || Number.parseInt(weatherData.forecast[0].rain) > 70) {
    advisories.push({
      crop: language === "en" ? "All Crops" : "सभी फसलें",
      message:
        language === "en"
          ? "Heavy rainfall expected. Ensure proper drainage and avoid fertilizer application."
          : "भारी बारिश की उम्मीद। उचित जल निकासी सुनिश्चित करें और उर्वरक प्रयोग से बचें।",
      priority: "high" as const,
      type: "warning" as const,
    })
  }

  return advisories
}
