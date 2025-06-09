"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Coffee } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function PomodoroPage() {
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up
            if (mode === "focus") {
              // Switch to break mode
              setMode("break")
              setCycles(cycles + 1)
              return 5 * 60 // 5 minute break
            } else {
              // Switch to focus mode
              setMode("focus")
              return 25 * 60 // 25 minute focus
            }
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, mode, cycles])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode("focus")
    setTimeLeft(25 * 60)
    setCycles(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const calculateProgress = () => {
    const totalTime = mode === "focus" ? 25 * 60 : 5 * 60
    const elapsed = totalTime - timeLeft
    return (elapsed / totalTime) * 100
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Pomodoro Timer" description="Stay focused with 25/5 minute work and break cycles" />

      <div className="mx-auto mt-8 max-w-md">
        <Card>
          <CardContent className="p-6">
            <div className="mb-8 text-center">
              <div className="relative mx-auto mb-4 h-64 w-64">
                {/* Progress circle */}
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={mode === "focus" ? "#e2e8f0" : "#e2e8f0"}
                    strokeWidth="8"
                    className="dark:stroke-slate-800"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={mode === "focus" ? "#3b82f6" : "#10b981"}
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * calculateProgress()) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                {/* Timer text */}
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                  <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
                  <div className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {mode === "focus" ? "Focus Time" : "Break Time"}
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTimer}
                  aria-label={isActive ? "Pause timer" : "Start timer"}
                >
                  {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={resetTimer} aria-label="Reset timer">
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Cycles Completed
                  </h3>
                  <p className="text-2xl font-bold">{cycles}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  {mode === "focus" ? (
                    <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Coffee className="h-6 w-6 text-green-600 dark:text-green-400" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
          <h3 className="mb-2 font-medium">How to use the Pomodoro Technique</h3>
          <ol className="ml-5 list-decimal space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>Work for 25 minutes (Focus Time)</li>
            <li>Take a 5-minute break (Break Time)</li>
            <li>Repeat the cycle</li>
            <li>After 4 cycles, consider taking a longer break (15-30 minutes)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
