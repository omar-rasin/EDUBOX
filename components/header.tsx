import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { BookOpen } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">EDUBOX</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/flashcards" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Flashcards
              </Link>
            </li>
            <li>
              <Link href="/topic-spinner" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Topic Spinner
              </Link>
            </li>
            <li>
              <Link href="/wellness" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Wellness
              </Link>
            </li>
            <li>
              <Link href="/notes" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Notes
              </Link>
            </li>
            <li>
              <Link href="/grade-predictor" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Grades
              </Link>
            </li>
            <li>
              <Link href="/quote" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Quotes
              </Link>
            </li>
            <li>
              <Link href="/focus-tracker" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Focus
              </Link>
            </li>
            <li>
              <Link href="/paper-tracker" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Papers
              </Link>
            </li>
            <li>
              <Link href="/pomodoro" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Pomodoro
              </Link>
            </li>
          </ul>
        </nav>

        <ModeToggle />
      </div>
    </header>
  )
}
