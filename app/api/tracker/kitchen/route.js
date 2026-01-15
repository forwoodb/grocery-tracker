import { connectDB } from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectDB();

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt");
  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(verify);

  const items = await GroceryItem.find({ inKitchen: true, userId: verify._id });

  return NextResponse.json(items);
}
