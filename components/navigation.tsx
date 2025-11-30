"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/signin")
  }

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">
          SHUKUMA
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
            Dashboard
          </Link>
          <Link href="/browse" className="hover:opacity-80 transition-opacity">
            Browse
          </Link>
          <Link href="/progress" className="hover:opacity-80 transition-opacity">
            Progress
          </Link>
          <Link href="/challenges" className="hover:opacity-80 transition-opacity">
            Challenges
          </Link>
          <Link href="/profile" className="hover:opacity-80 transition-opacity">
            Profile
          </Link>
          <Link href="/settings" className="hover:opacity-80 transition-opacity">
            Settings
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            Logout
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-primary-foreground/20 bg-primary-foreground/5">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
              Dashboard
            </Link>
            <Link href="/browse" className="hover:opacity-80 transition-opacity">
              Browse
            </Link>
            <Link href="/progress" className="hover:opacity-80 transition-opacity">
              Progress
            </Link>
            <Link href="/challenges" className="hover:opacity-80 transition-opacity">
              Challenges
            </Link>
            <Link href="/profile" className="hover:opacity-80 transition-opacity">
              Profile
            </Link>
            <Link href="/settings" className="hover:opacity-80 transition-opacity">
              Settings
            </Link>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/20 justify-start"
            >
              Logout
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
