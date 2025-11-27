import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as { role?: string } | null
    const path = req.nextUrl.pathname

    if (path.startsWith("/seller") && token?.role !== "seller") {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    if (path.startsWith("/buyer") && token?.role !== "buyer") {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  },
)

export const config = {
  matcher: ["/seller/:path*", "/buyer/:path*"],
}
