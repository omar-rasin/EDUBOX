"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { PageHeader } from "@/components/page-header"

export default function WellnessPage() {
  const [sleepHours, setSleepHours] = useState<number>(7)
  const [studyHours, setStudyHours] = useState<number>(4)
  const [stressLevel, setStressLevel] = useState<number>(5)
  const [result, setResult] = useState<string | null>(null)

  const calculateWellness = () => {
    // Simple algorithm to determine wellness feedback
    let feedback = ""

    // Sleep assessment
    if (sleepHours < 6) {
      feedback += "You're not getting enough sleep. Try to aim for 7-9 hours for optimal cognitive function. "
    } else if (sleepHours > 9) {
      feedback += "You might be oversleeping. While rest is important, too much sleep can make you feel groggy. "
    } else {
      feedback += "Your sleep schedule looks good! Keep maintaining this healthy pattern. "
    }

    // Study assessment
    if (studyHours > 8) {
      feedback += "You're studying a lot. Remember to take breaks to prevent burnout. "
    } else if (studyHours < 2) {
      feedback += "Consider increasing your study time slightly for better retention. "
    } else {
      feedback += "Your study hours seem balanced. "
    }

    // Stress assessment
    if (stressLevel > 7) {
      feedback += "Your stress levels are high. Try meditation, deep breathing, or a short walk to reduce stress. "
    } else if (stressLevel < 3) {
      feedback += "Your stress levels are low, which is great! "
    } else {
      feedback +=
        "Your stress level is moderate. Regular breaks and relaxation techniques can help maintain this balance. "
    }

    // Overall assessment
    if (sleepHours < 6 && studyHours > 7 && stressLevel > 7) {
      feedback += "Overall, you seem to be pushing yourself too hard. Consider prioritizing rest and self-care."
    } else if (sleepHours >= 7 && studyHours <= 6 && stressLevel <= 5) {
      feedback += "Overall, you have a good balance of rest, study, and stress management. Keep it up!"
    } else {
      feedback +=
        "Overall, with some small adjustments to your routine, you can improve your wellbeing and productivity."
    }

    setResult(feedback)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Sleep & Stress Meter" description="Track your wellbeing and get personalized feedback" />

      <div className="mx-auto mt-8 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Hours of sleep last night: {sleepHours}</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">0</span>
                  <Slider
                    value={[sleepHours]}
                    min={0}
                    max={12}
                    step={0.5}
                    onValueChange={(value) => setSleepHours(value[0])}
                  />
                  <span className="text-sm">12</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Hours spent studying today: {studyHours}</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">0</span>
                  <Slider
                    value={[studyHours]}
                    min={0}
                    max={12}
                    step={0.5}
                    onValueChange={(value) => setStudyHours(value[0])}
                  />
                  <span className="text-sm">12</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Current stress level: {stressLevel}/10</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">1</span>
                  <Slider
                    value={[stressLevel]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => setStressLevel(value[0])}
                  />
                  <span className="text-sm">10</span>
                </div>
              </div>

              <Button onClick={calculateWellness} className="w-full">
                Get Feedback
              </Button>

              {result && (
                <div className="mt-6 rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  <h3 className="mb-2 font-semibold">Your Wellness Assessment</h3>
                  <p>{result}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
