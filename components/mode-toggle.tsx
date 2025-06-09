"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Force toggle between light and dark
  const toggleTheme = () => {
    // Check if document exists (client-side)
    if (typeof document !== "undefined") {
      // Check if the document has the dark class
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "light" : "dark")
    } else {
      // Fallback toggle based on theme state
      setTheme(theme === "dark" ? "light" : "dark")
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  // Determine icon based on actual HTML class rather than theme state
  const isDarkMode = typeof document !== "undefined" && document.documentElement.classList.contains("dark")

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
