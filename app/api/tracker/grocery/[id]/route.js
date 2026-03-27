import GroceryItem from "@/app/models/GroceryItem";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  await GroceryItem.findByIdAndUpdate(id, body);
  return NextResponse.json({ msg: "update" });
}
