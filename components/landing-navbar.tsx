'use client'

import React from "react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function LandingNavbar() {
  const data = JSON.parse(localStorage.getItem('data'))
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">HR</span>
            </div>
            <span className="hidden sm:inline text-lg font-bold text-foreground">
              HR Attrition Predictor
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#benefits" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Benefits
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              How It Works
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {
              data ? (
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
              ):(
              <>
              <Button variant="outline" asChild>
                <Link href="/login">
                  Login
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">
                  Sign Up
                </Link>
              </Button>
              </>
              )
            }
            

             
          </div>
        </div>
      </div>
    </nav>
  )
}
