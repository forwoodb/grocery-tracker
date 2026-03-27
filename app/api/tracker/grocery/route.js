import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import GroceryItem from "@/app/models/GroceryItem";

connectDB();

export async function PUT(req) {
  const list = await req.json();
  const updates = list.map((item) => {
    const id = item._id;
    return GroceryItem.findByIdAndUpdate(id, { inList: true });
  });

  await Promise.all(updates);

  return NextResponse.json({ msg: "in list" });
}
