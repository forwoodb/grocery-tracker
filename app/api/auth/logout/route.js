import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const res = NextResponse.json({ msg: "log out" });
  // Delete cookie
  res.cookies.set("jwt", "", { maxAge: new Date(0) });
  console.log("log out");

  return res;
}
