import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserId = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-grocery-tracker");

  if (!cookie) {
    redirect("/login");
  }

  const token = cookie.value;
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const userId = verify._id;

  console.log(userId);
  return userId;
};
