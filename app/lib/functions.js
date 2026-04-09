import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserId = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-grocery-tracker");

  if (!cookie) {
    redirect("/login");
  }

  let token;

  if (cookie.value) {
    token = cookie.value;
  } else {
    redirect("/login");
  }

  let verify;

  try {
    verify = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    redirect("/login");
  }

  const userId = verify._id;

  // console.log(userId);
  return userId;
};
