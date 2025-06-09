import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SMARTPATHTOKEN } from "./constants";

export function middleware(request: NextRequest) {
  let token =
    request.cookies.get(SMARTPATHTOKEN)?.value ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODQwM2NlNTcxZDY4NDI0NmI4MTI1ODEiLCJlbWFpbCI6Im1zNzUwMDc0NkBnbWFpbC5jb20iLCJpYXQiOjE3NDk0OTYyODksImV4cCI6MTc4MTA1Mzg4OX0.o8UM9OImXEWN9yDyjEypvDfAA0ZAugdStrGUWMpAIsQ";
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
