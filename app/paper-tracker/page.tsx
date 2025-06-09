"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, FolderPlus } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface Subject {
  id: string
  name: string
  papers: Paper[]
}

interface Paper {
  id: string
  code: string
  completed: boolean
}

export default function PaperTrackerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [newPaperCode, setNewPaperCode] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const addSubject = () => {
    if (newSubject.trim() === "") return

    const newSubjectObj: Subject = {
      id: Date.now().toString(),
      name: newSubject.trim(),
      papers: [],
    }

    setSubjects([...subjects, newSubjectObj])
    setNewSubject("")
    setSelectedSubject(newSubjectObj.id)
  }

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
    if (selectedSubject === id) {
      setSelectedSubject(null)
    }
  }

  const addPaper = () => {
    if (!selectedSubject || newPaperCode.trim() === "") return

    const newPaper: Paper = {
      id: Date.now().toString(),
      code: newPaperCode.trim(),
      completed: false,
    }

    setSubjects(
      subjects.map((subject) =>
        subject.id === selectedSubject ? { ...subject, papers: [...subject.papers, newPaper] } : subject,
      ),
    )

    setNewPaperCode("")
  }

  const removePaper = (subjectId: string, paperId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? { ...subject, papers: subject.papers.filter((paper) => paper.id !== paperId) }
          : subject,
      ),
    )
  }

  const togglePaperCompletion = (subjectId: string, paperId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              papers: subject.papers.map((paper) =>
                paper.id === paperId ? { ...paper, completed: !paper.completed } : paper,
              ),
            }
          : subject,
      ),
    )
  }

  const selectedSubjectData = subjects.find((subject) => subject.id === selectedSubject)

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Past Paper Tracker" description="Track your progress on past exam papers" />

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
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                      selectedSubject === subject.id
                        ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
                        : "border-slate-200 hover:border-blue-100 hover:bg-blue-50/50 dark:border-slate-800 dark:hover:border-blue-900 dark:hover:bg-blue-950/50"
                    }`}
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    <div>
                      <span className="font-medium">{subject.name}</span>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {subject.papers.length} papers | {subject.papers.filter((p) => p.completed).length} completed
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSubject(subject.id)
                      }}
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

        <div>
          {selectedSubject ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">{selectedSubjectData?.name} - Past Papers</h2>
                  <div className="flex space-x-2">
                    <Input
                      value={newPaperCode}
                      onChange={(e) => setNewPaperCode(e.target.value)}
                      placeholder="e.g., May/June 2023 P2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addPaper()
                      }}
                    />
                    <Button onClick={addPaper}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h2 className="mb-4 text-xl font-semibold">Paper List</h2>
                {selectedSubjectData?.papers.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400">No papers added yet for this subject.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedSubjectData?.papers.map((paper) => (
                      <div
                        key={paper.id}
                        className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={paper.id}
                            checked={paper.completed}
                            onCheckedChange={() => togglePaperCompletion(selectedSubject, paper.id)}
                          />
                          <label
                            htmlFor={paper.id}
                            className={`cursor-pointer ${
                              paper.completed ? "text-slate-500 line-through dark:text-slate-400" : ""
                            }`}
                          >
                            {paper.code}
                          </label>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePaper(selectedSubject, paper.id)}
                          aria-label="Remove paper"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <FolderPlus className="mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium">No Subject Selected</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Select a subject from the list or add a new one to track past papers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
