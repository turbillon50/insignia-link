import { auth } from "@/auth"
import { NextResponse, type NextRequest } from "next/server"
import { ACCESS_COOKIE, ACCESS_MAX_AGE, tokenRole } from "@/lib/access"

const PROTECTED = ["/admin", "/tecnico", "/app"]

function isProtected(pathname: string) {
  return PROTECTED.some((p) => pathname.startsWith(p))
}

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

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl

  // Liga-llave: /<TOKEN> instala cookie y permite acceso
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 1 && tokenRole(segments[0])) {
    const res = NextResponse.next()
    return setKeyCookie(res, segments[0])
  }

  // Cookie liga-llave válida -> pasa
  const cookieVal = req.cookies.get(ACCESS_COOKIE)?.value
  if (tokenRole(cookieVal)) return NextResponse.next()

  // Rutas protegidas: requieren sesión Auth.js
  if (isProtected(pathname)) {
    const session = (req as any).auth
    if (!session?.user) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next|favicon|icon|apple-icon|manifest|sw\.js|.*\.(?:png|svg|jpg|jpeg|webp|ico|css|js|map|txt|woff2?)).*)",
    "/(api|trpc)(.*)",
  ],
}
