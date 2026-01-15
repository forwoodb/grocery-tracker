import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import GroceryItem from "@/app/models/GroceryItem";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";

connectDB();

export async function GET() {
  // get cookies from browser
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    return NextResponse.json(null);
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById({ _id: verify._id });
  const username = user.username;
  // get grocery items by user ID
  const items = await GroceryItem.find({ userId: user._id });

  console.log(NextResponse.json({ username, items }));

  return NextResponse.json({ username, items });
}

export async function POST(req) {
  const body = await req.json();
  // get cookies
  const cookieStore = await cookies();
  // get cookie from cookies
  const cookie = cookieStore.get("jwt");
  // get token from cookie
  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }
  // verify token
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const newItem = await new GroceryItem({ ...body, userId: verify._id });
  // console.log(newItem);

  await newItem.save();
  return NextResponse.json({ msg: "Item Added" });
}

export async function PUT(req) {
  const list = await req.json();
  const updates = list.map((item) => {
    const id = item._id;
    return GroceryItem.findByIdAndUpdate(id, { inList: true });
  });

  // Promise.all() updates everything simultaneously vs sequentially like loops
  // const results = await Promise.all(updates);
  // console.log(results);
  await Promise.all(updates);

  return NextResponse.json({ msg: "in list" });
}
