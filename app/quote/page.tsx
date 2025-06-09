"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Quote } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface QuoteData {
  text: string
  author: string
}

export default function QuotePage() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [loading, setLoading] = useState(true)

  const quotes: QuoteData[] = [
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
    },
    {
      text: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
    },
    {
      text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
    },
    {
      text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: "Dr. Seuss",
    },
    {
      text: "Education is not the filling of a pail, but the lighting of a fire.",
      author: "W.B. Yeats",
    },
    {
      text: "The only person who is educated is the one who has learned how to learn and change.",
      author: "Carl Rogers",
    },
    {
      text: "You don't have to be great to start, but you have to start to be great.",
      author: "Zig Ziglar",
    },
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      text: "You don’t have to be perfect. You just have to keep going.",
      author: "Unknown",
    },
    {
      text: "Every expert was once a beginner.",
      author: "Helen Hayes",
    },
    {
      text: "Your future is created by what you do today, not tomorrow.",
      author: "Robert Kiyosaki",
    },
    {
      text: "It's not about how fast you go. It’s about not stopping.",
      author: "Unknown",
    },
  ]

  const getQuoteForToday = () => {
    // Get a quote based on the day of the year
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    // Use the day of year to select a quote
    const index = dayOfYear % quotes.length
    return quotes[index]
  }

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return quotes[randomIndex]
  }

  useEffect(() => {
    // Get quote for today on initial load
    setQuote(getQuoteForToday())
    setLoading(false)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Motivational Quote of the Day" description="Daily inspiration for your studies" />

      <div className="mx-auto mt-8 max-w-2xl">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:from-blue-950 dark:to-indigo-950">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <p>Loading quote...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Quote className="mx-auto mb-4 h-10 w-10 text-blue-500" />
                  <blockquote className="mb-4 text-xl font-medium italic text-slate-700 dark:text-slate-300">
                    "{quote?.text}"
                  </blockquote>
                  <cite className="text-sm text-slate-500 dark:text-slate-400">— {quote?.author}</cite>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setQuote(getRandomQuote())} className="mx-auto">
            <RefreshCw className="mr-2 h-4 w-4" /> Get Another Quote
          </Button>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            A new quote is automatically selected each day.
          </p>
        </div>
      </div>
    </div>
  )
}
