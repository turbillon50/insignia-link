"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ArrowRight } from "lucide-react"
import { InsigniaLogo } from "@/components/brand/insignia-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet"

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#estadisticas", label: "Resultados" },
  { href: "#testimonios", label: "Clientes" },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="INSIGNIA LINK inicio">
          <InsigniaLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button
            render={<Link href="/app" />}
            variant="ghost"
            className="hidden md:inline-flex"
          >
            Portal cliente
          </Button>
          <Button render={<Link href="/admin" />} className="hidden md:inline-flex">
            Iniciar demo
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Menú"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <InsigniaLogo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 px-4">
                <Button
                  render={<Link href="/app" />}
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Portal cliente
                </Button>
                <Button render={<Link href="/admin" />} onClick={() => setOpen(false)}>
                  Iniciar demo
                </Button>
                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
