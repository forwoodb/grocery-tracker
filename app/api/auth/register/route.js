import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectDB();

export async function POST(req) {
  // get form data
  const { username, email, password } = await req.json();
  // hash password
  const hash = await bcrypt.hash(password, 12);
  // create user
  const newUser = await new User({ username, email, password: hash });
  // save user
  await newUser.save();
  // create jwt
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  // create response
  const res = NextResponse.json({ msg: "hi" });
  // create cookie
  res.cookies.set("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });

  return res;
}
