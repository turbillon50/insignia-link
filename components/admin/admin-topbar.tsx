"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AdminMobileNav } from "./admin-sidebar"
import { InsigniaMark } from "@/components/brand/insignia-logo"

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <AdminMobileNav />
      <div className="flex items-center gap-2 lg:hidden">
        <InsigniaMark className="h-6 w-6" />
        <span className="text-sm font-semibold tracking-tight">
          INSIGNIA <span className="text-primary">LINK</span>
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar en la plataforma…" className="w-48 pl-9 lg:w-72" />
        </div>
        <ThemeToggle />
        <Button variant="outline" size="icon" className="relative" aria-label="Notificaciones">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
      </div>
    </header>
  )
}
