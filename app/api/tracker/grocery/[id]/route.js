import GroceryItem from "@/app/models/GroceryItem";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  await GroceryItem.findByIdAndDelete(id);
  return NextResponse.json({ msg: "delete" });
}

export async function POST(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  await GroceryItem.findByIdAndUpdate(id, body);
  return NextResponse.json({ msg: "update" });
}
