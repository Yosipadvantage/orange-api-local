import { NextResponse } from "next/server";

export function middleware(request: any) {
  const token = request.cookies.get("token");

  // console.log("INFORMACION DEL PATH", request.nextUrl.pathname);

  if (request.nextUrl.pathname.includes("/dashboard")) {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // console.log(request.nextUrl.pathname)
    return NextResponse.next();
  }

  return NextResponse.next();
}
