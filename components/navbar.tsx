'use client'

import { User, LogOut, Lollipop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavbarProps {
  userName?: string
}

export function Navbar({ userName = 'HR Admin' }: NavbarProps) {

  
  const handleSignout = () => {
    localStorage.removeItem('data');
    window.location.href = '/';
  }

  const [data, setData] = useState({username:''})

  useEffect(() => {
    const stored = localStorage.getItem('data')
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">HR</span>
          </div>
          <span className="text-xl font-semibold text-foreground">AttritionPredict</span>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <User className="h-4 w-4 text-secondary-foreground" />
              </div>
              <span className="hidden text-sm font-medium text-foreground sm:inline-block">{data?.username || 'Admin'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <button onClick={handleSignout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
