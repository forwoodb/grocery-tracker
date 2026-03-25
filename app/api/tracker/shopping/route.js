import { connectDB } from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";

connectDB();

// export async function GET() {
//   const cookieStore = await cookies();
//   const cookie = cookieStore.get("jwt-grocery-tracker");

//   let token = null;
//   if (cookie.value) {
//     token = cookie.value;
//   }
//   const verify = jwt.verify(token, process.env.JWT_SECRET);
//   const items = await GroceryItem.find({ inList: true, userId: verify._id });
//   // const user = await User.findOne({ _id: verify._id });
//   // console.log(user);

//   return NextResponse.json(items);
// }

export async function PUT(req) {
  const list = await req.json();
  console.log("hello");
  console.log(list);

  const updates = list.map((item) => {
    return GroceryItem.findByIdAndUpdate(item._id, item);
  });
  const results = await Promise.all(updates);
  console.log(results);

  return NextResponse.json({ msg: "in kitchen" });
}
