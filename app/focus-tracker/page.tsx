"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Play, Pause, Plus, X, Clock, BarChart } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface Subject {
  id: string
  name: string
  color: string
  timeSpent: number // in seconds
}

export default function FocusTrackerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [activeSubject, setActiveSubject] = useState<string | null>(null)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#ef4444", // red
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#ec4899", // pink
  ]

  const addSubject = () => {
    if (newSubject.trim() === "") return

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newSubjectObj: Subject = {
      id: Date.now().toString(),
      name: newSubject.trim(),
      color: randomColor,
      timeSpent: 0,
    }

    setSubjects([...subjects, newSubjectObj])
    setNewSubject("")
  }

  const removeSubject = (id: string) => {
    if (activeSubject === id) {
      stopTracking()
    }
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const startTracking = (id: string) => {
    // Stop tracking the current subject if any
    if (activeSubject) {
      stopTracking()
    }

    setActiveSubject(id)
    setElapsedTime(0)

    // Start the timer
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)

      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) => (subject.id === id ? { ...subject, timeSpent: subject.timeSpent + 1 } : subject)),
      )
    }, 1000)

    setTimer(interval)
  }

  const stopTracking = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
    setActiveSubject(null)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate the maximum time spent for scaling the chart
  const maxTimeSpent = Math.max(...subjects.map((s) => s.timeSpent), 1)

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Subject Focus Tracker" description="Track how long you've focused on each subject" />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Add Subject</h2>
              <div className="flex space-x-2">
                <Input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Enter subject name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addSubject()
                  }}
                />
                <Button onClick={addSubject}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Your Subjects</h2>
            {subjects.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No subjects added yet.</p>
            ) : (
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <div className="flex items-center">
                      <div className="mr-3 h-4 w-4 rounded-full" style={{ backgroundColor: subject.color }}></div>
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Time: {formatTime(subject.timeSpent)}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {activeSubject === subject.id ? (
                        <Button variant="outline" size="sm" onClick={() => stopTracking()}>
                          <Pause className="mr-1 h-3 w-3" /> Stop
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startTracking(subject.id)}
                          disabled={activeSubject !== null}
                        >
                          <Play className="mr-1 h-3 w-3" /> Start
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubject(subject.id)}
                        aria-label="Remove subject"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center text-xl font-semibold">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                Current Session
              </h2>

              {activeSubject ? (
                <div>
                  <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Currently tracking:</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {subjects.find((s) => s.id === activeSubject)?.name}
                    </p>
                    <p className="mt-2 text-2xl font-bold">{formatTime(elapsedTime)}</p>
                  </div>
                  <Button variant="outline" onClick={stopTracking} className="w-full">
                    <Pause className="mr-2 h-4 w-4" /> Stop Tracking
                  </Button>
                </div>
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400">
                  <p>No active subject.</p>
                  <p className="text-sm">Select a subject and click "Start" to begin tracking.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center text-xl font-semibold">
                <BarChart className="mr-2 h-5 w-5 text-blue-500" />
                Focus Distribution
              </h2>

              {subjects.length === 0 ? (
                <p className="text-center text-slate-500 dark:text-slate-400">
                  Add subjects to see your focus distribution.
                </p>
              ) : (
                <div className="space-y-3">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                          <span className="text-sm">{subject.name}</span>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {formatTime(subject.timeSpent)}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(subject.timeSpent / maxTimeSpent) * 100}%`,
                            backgroundColor: subject.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
