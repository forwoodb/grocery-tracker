import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";

connectDB();

export async function POST(req) {
  const body = await req.json();
  const { username, email, password } = body;
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);

  let token;
  if (match) {
    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  }
  const res = NextResponse.json({ msg: "login" });

  res.cookies.set("jwt-grocery-tracker", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });
  console.log(match);

  return res;
}
