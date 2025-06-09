"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shuffle, Plus, X } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function TopicSpinnerPage() {
  const [topics, setTopics] = useState<string[]>([])
  const [newTopic, setNewTopic] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const addTopic = () => {
    if (newTopic.trim() === "") return
    setTopics([...topics, newTopic.trim()])
    setNewTopic("")
  }

  const removeTopic = (index: number) => {
    const newTopics = [...topics]
    newTopics.splice(index, 1)
    setTopics(newTopics)
  }

  const spinTopics = () => {
    if (topics.length === 0) return

    setIsSpinning(true)
    setSelectedTopic(null)

    // Simulate spinning animation
    let counter = 0
    const totalSpins = 20
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * topics.length)
      setSelectedTopic(topics[randomIndex])

      counter++
      if (counter >= totalSpins) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Random Study Topic Spinner"
        description="Can't decide what to study? Let the spinner choose for you!"
      />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Add Your Topics</h2>
          <div className="flex space-x-2">
            <Input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Enter a study topic"
              onKeyDown={(e) => {
                if (e.key === "Enter") addTopic()
              }}
            />
            <Button onClick={addTopic}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium">Your Topics</h3>
            {topics.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No topics added yet.</p>
            ) : (
              <ul className="space-y-2">
                {topics.map((topic, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <span>{topic}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeTopic(index)} aria-label="Remove topic">
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Spin the Wheel</h2>
          <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-slate-200 p-6 dark:border-slate-800">
            {selectedTopic ? (
              <div className="text-center">
                <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Your selected topic:</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedTopic}</p>
              </div>
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400">
                {topics.length === 0 ? "Add topics to spin the wheel" : "Click the button below to spin"}
              </p>
            )}
          </div>

          <Button className="mt-4 w-full" onClick={spinTopics} disabled={topics.length === 0 || isSpinning}>
            <Shuffle className="mr-2 h-4 w-4" />
            {isSpinning ? "Spinning..." : "Spin the Wheel"}
          </Button>
        </div>
      </div>
    </div>
  )
}
