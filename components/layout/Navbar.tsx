"use client"

import Link from "next/link"
import { Building2, UserCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl inline-block tracking-tight">
              Urbaniq
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link
              href="/properties"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Properties
            </Link>
            <Link
              href="/dashboard/agent"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              For Agents
            </Link>
            <Link
              href="/dashboard/owner"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              For Owners
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <UserCircle className="h-5 w-5" />
                {user.firstName}
              </span>
              {user.role !== 'Buyer' && (
                <Link href={`/dashboard/${user.role.toLowerCase()}`} className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                Sign In
              </Link>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
