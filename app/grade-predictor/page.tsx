"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, X, Calculator } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface Subject {
  id: string
  name: string
  grade: string
  credits: number
}

export default function GradePredictorPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subjectName, setSubjectName] = useState("")
  const [subjectGrade, setSubjectGrade] = useState("")
  const [subjectCredits, setSubjectCredits] = useState(3)
  const [gpa, setGpa] = useState<number | null>(null)

  const addSubject = () => {
    if (subjectName.trim() === "" || subjectGrade.trim() === "") return

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: subjectName.trim(),
      grade: subjectGrade.trim().toUpperCase(),
      credits: subjectCredits,
    }

    setSubjects([...subjects, newSubject])
    setSubjectName("")
    setSubjectGrade("")
  }

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
    setGpa(null)
  }

  const calculateGPA = () => {
    if (subjects.length === 0) return

    // Common GPA scale
    const gradePoints: Record<string, number> = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    }

    let totalPoints = 0
    let totalCredits = 0

    subjects.forEach((subject) => {
      const points = gradePoints[subject.grade] || 0
      totalPoints += points * subject.credits
      totalCredits += subject.credits
    })

    const calculatedGPA = totalCredits > 0 ? totalPoints / totalCredits : 0
    setGpa(calculatedGPA)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Grade Predictor" description="Calculate your GPA or predict your grades" />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Add Subject</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="subjectName" className="mb-2 block text-sm font-medium">
                    Subject Name
                  </label>
                  <Input
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subjectGrade" className="mb-2 block text-sm font-medium">
                      Grade (A, B, C, etc.)
                    </label>
                    <Input
                      id="subjectGrade"
                      value={subjectGrade}
                      onChange={(e) => setSubjectGrade(e.target.value)}
                      placeholder="e.g., A"
                    />
                  </div>
                  <div>
                    <label htmlFor="subjectCredits" className="mb-2 block text-sm font-medium">
                      Credits
                    </label>
                    <Input
                      id="subjectCredits"
                      type="number"
                      min={1}
                      max={6}
                      value={subjectCredits}
                      onChange={(e) => setSubjectCredits(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
                <Button onClick={addSubject} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Subject
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button onClick={calculateGPA} className="w-full" disabled={subjects.length === 0}>
              <Calculator className="mr-2 h-4 w-4" /> Calculate GPA
            </Button>

            {gpa !== null && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Your GPA</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{gpa.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Your Subjects</h2>
          {subjects.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No subjects added yet.</p>
          ) : (
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                >
                  <div>
                    <span className="font-medium">{subject.name}</span>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Grade: {subject.grade} | Credits: {subject.credits}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSubject(subject.id)}
                    aria-label="Remove subject"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
