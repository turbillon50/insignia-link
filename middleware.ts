import { NextResponse, type NextRequest } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { ACCESS_COOKIE, ACCESS_MAX_AGE, tokenRole } from "@/lib/access"

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
)

// Home y catálogo navegables sin cuenta (regla B16). Sólo se exige sesión
// (Clerk o liga-llave) para los paneles operativos: /admin, /tecnico, /app.
const isProtected = createRouteMatcher([
  "/admin(.*)",
  "/tecnico(.*)",
  "/app(.*)",
])

function setKeyCookie(res: NextResponse, token: string): NextResponse {
  res.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  })
  return res
}

// Liga-llave. Devuelve respuesta si maneja el request por completo; null si no.
function ligaLlave(req: NextRequest): NextResponse | null {
  const segments = req.nextUrl.pathname.split("/").filter(Boolean)

  // /<TOKEN> -> instala cookie de 1 año y deja renderizar la página de install.
  if (segments.length === 1 && tokenRole(segments[0])) {
    return setKeyCookie(NextResponse.next(), segments[0])
  }
  // Cookie de llave válida -> acceso total sin Clerk.
  if (tokenRole(req.cookies.get(ACCESS_COOKIE)?.value)) {
    return NextResponse.next()
  }
  return null
}

export default clerkEnabled
  ? clerkMiddleware(async (auth, req) => {
      const handled = ligaLlave(req)
      if (handled) return handled
      if (isProtected(req)) {
        const { userId, redirectToSignIn } = await auth()
        if (!userId) return redirectToSignIn({ returnBackUrl: req.url })
      }
    })
  : function middleware(req: NextRequest) {
      const handled = ligaLlave(req)
      if (handled) return handled
      // Sin Clerk configurado: los paneles exigen liga-llave válida.
      if (isProtected(req)) {
        return NextResponse.redirect(new URL("/", req.url))
      }
      return NextResponse.next()
    }

export const config = {
  matcher: [
    "/((?!_next|favicon|icon|apple-icon|manifest|sw\\.js|.*\\.(?:png|svg|jpg|jpeg|webp|ico|css|js|map|txt|woff2?)).*)",
    "/(api|trpc)(.*)",
  ],
}
