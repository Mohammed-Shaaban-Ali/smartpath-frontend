import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SMARTPATHTOKEN } from "./constants";

export function middleware(request: NextRequest) {
  let token = request.cookies.get(SMARTPATHTOKEN)?.value;
  // pathname
  const pathname = request.nextUrl.pathname;

  // not have token => any pathname go to /login
  if (!token && pathname != "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // have token => any pathname go to /
  if (token && pathname == "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
