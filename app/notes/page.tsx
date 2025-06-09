"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Edit, Check } from "lucide-react"
import { PageHeader } from "@/components/page-header"

interface Note {
  id: string
  title: string
  content: string
  color: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedColor, setSelectedColor] = useState("#f8fafc") // Default light color
  const [editingId, setEditingId] = useState<string | null>(null)

  const colors = [
    { value: "#ffffff", label: "White" },
    { value: "#dbeafe", label: "Blue" },
    { value: "#dcfce7", label: "Green" },
    { value: "#fee2e2", label: "Red" },
    { value: "#fae8ff", label: "Purple" },
    { value: "#fef3c7", label: "Yellow" },
  ]

  const addNote = () => {
    if (title.trim() === "" && content.trim() === "") return

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim() || "Untitled",
      content: content.trim(),
      color: selectedColor,
    }

    setNotes([...notes, newNote])
    setTitle("")
    setContent("")
  }

  const removeNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (editingId === id) {
      setEditingId(null)
    }
  }

  const startEditing = (note: Note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setSelectedColor(note.color)
  }

  const saveEdit = () => {
    if (!editingId) return

    setNotes(
      notes.map((note) =>
        note.id === editingId ? { ...note, title: title || "Untitled", content, color: selectedColor } : note,
      ),
    )

    setEditingId(null)
    setTitle("")
    setContent("")
    setSelectedColor("#f8fafc")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
    setSelectedColor("#f8fafc")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Sticky Notes" description="Create quick notes and to-do items" />

      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold">{editingId ? "Edit Note" : "Create New Note"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                  Title
                </label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
              </div>
              <div>
                <label htmlFor="content" className="mb-2 block text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Note content"
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`h-8 w-8 rounded-full border ${
                        selectedColor === color.value
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : "border-slate-300 dark:border-slate-700"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      aria-label={`Select ${color.label} color`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {editingId ? (
                  <>
                    <Button onClick={saveEdit} className="flex-1">
                      <Check className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={addNote} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Note
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Your Notes</h2>
          {notes.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No notes yet. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-slate-200 p-4 shadow-sm dark:border-slate-800"
                  style={{
                    backgroundColor: note.color,
                    color: note.color === "#ffffff" ? "#1e293b" : "#1e293b", // Dark text for all backgrounds
                  }}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-medium" style={{ color: note.color === "#ffffff" ? "#1e293b" : "#1e293b" }}>
                      {note.title}
                    </h3>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => startEditing(note)} aria-label="Edit note">
                        <Edit className="h-4 w-4" style={{ color: note.color === "#ffffff" ? "#1e293b" : "#1e293b" }} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeNote(note.id)} aria-label="Remove note">
                        <X className="h-4 w-4" style={{ color: note.color === "#ffffff" ? "#1e293b" : "#1e293b" }} />
                      </Button>
                    </div>
                  </div>
                  <p
                    className="whitespace-pre-wrap text-sm"
                    style={{ color: note.color === "#ffffff" ? "#1e293b" : "#1e293b" }}
                  >
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
