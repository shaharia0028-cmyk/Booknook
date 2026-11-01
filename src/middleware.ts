import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authPages = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(getSessionCookie(request));
  const isAuthPage = authPages.includes(pathname);

  // Signed-in users do not need the Login or Register pages.
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Private routes: send guests to Login and remember where they wanted to go.
  if (!isAuthPage && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/add-book", "/my-books", "/my-borrows", "/profile", "/books/:path+"],
};
