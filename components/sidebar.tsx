'use client'

import { LayoutDashboard, UserSearch, FileSpreadsheet, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  {
    title: 'Dashboard Home',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Predict Attrition',
    href: '/dashboard/predict',
    icon: UserSearch,
  },
  {
    title: 'Bulk Prediction (CSV)',
    href: '/dashboard/bulk',
    icon: FileSpreadsheet,
  },
]

export function Sidebar() {
  const pathname = usePathname()

   const handleSignout = () => {
    localStorage.removeItem('data');
    window.location.href = '/';
  }

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-card lg:block">
      <nav className="flex h-full flex-col gap-2 p-4">
        <div className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </div>
        
        <div className="border-t border-border pt-4">
          <button
            onClick={handleSignout}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}
