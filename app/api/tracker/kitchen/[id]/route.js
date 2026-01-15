import { connectDB } from "@/app/lib/db";
import GroceryItem from "@/app/models/GroceryItem";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const { id } = await params;
  await GroceryItem.findByIdAndUpdate(id, { inKitchen: false });
  console.log(id);

  return NextResponse.json({ msg: "removed" });
}
