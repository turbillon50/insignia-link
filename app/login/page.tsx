"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { InsigniaLogo } from "@/components/brand/insignia-logo"
import { Mail, Loader2, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("resend", { email, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError("No se pudo enviar el enlace. Intenta de nuevo.")
    } else {
      setSent(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <InsigniaLogo />
        </div>

        {sent ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-xl font-bold">Revisa tu correo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviamos un enlace de acceso a <strong>{email}</strong>.
              El enlace expira en 24 horas.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8">
            <h1 className="text-2xl font-bold tracking-tight">Acceder</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Te enviamos un enlace mágico al correo. Sin contraseña.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
                ) : (
                  "Enviar enlace de acceso"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
