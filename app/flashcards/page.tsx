"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Shuffle, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface Flashcard {
  id: string
  question: string
  answer: string
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const addFlashcard = () => {
    if (question.trim() === "" || answer.trim() === "") return

    const newCard: Flashcard = {
      id: Date.now().toString(),
      question,
      answer,
    }

    setFlashcards([...flashcards, newCard])
    setQuestion("")
    setAnswer("")
  }

  const removeFlashcard = (id: string) => {
    setFlashcards(flashcards.filter((card) => card.id !== id))
    if (currentIndex >= flashcards.length - 1) {
      setCurrentIndex(Math.max(0, flashcards.length - 2))
    }
  }

  const shuffleFlashcards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setFlipped(false)
  }

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Flashcard Generator" description="Create, view, and shuffle flashcards to help you study" />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Create New Flashcard</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="question" className="mb-2 block text-sm font-medium">
                Question
              </label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label htmlFor="answer" className="mb-2 block text-sm font-medium">
                Answer
              </label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={addFlashcard} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Flashcard
            </Button>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Your Flashcards</h2>
            {flashcards.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No flashcards yet. Create one above!</p>
            ) : (
              <div className="space-y-2">
                {flashcards.map((card, index) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <span className="truncate pr-2">
                      {index + 1}. {card.question.substring(0, 30)}
                      {card.question.length > 30 ? "..." : ""}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFlashcard(card.id)}
                      aria-label="Remove flashcard"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={shuffleFlashcards}
                  className="mt-2 w-full"
                  disabled={flashcards.length < 2}
                >
                  <Shuffle className="mr-2 h-4 w-4" /> Shuffle
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Study Flashcards</h2>
          {flashcards.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-center text-slate-500 dark:text-slate-400">Add flashcards to start studying</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="flex h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border border-slate-200 p-6 transition-all dark:border-slate-800"
                onClick={() => setFlipped(!flipped)}
              >
                <div className="text-center">
                  <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                    {flipped ? "Answer" : "Question"} ({currentIndex + 1}/{flashcards.length})
                  </p>
                  <p className="text-lg">
                    {flipped ? flashcards[currentIndex]?.answer : flashcards[currentIndex]?.question}
                  </p>
                  <p className="mt-4 text-sm text-blue-500">Click to flip</p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button variant="outline" onClick={nextCard} disabled={currentIndex === flashcards.length - 1}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
