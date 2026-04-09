import { revalidatePath } from "next/cache";
import StoreItems from "./components/StoreItems";
// import { getUserId } from "./lib/functions";
import GroceryItem from "./models/GroceryItem";
import User from "./models/User";

const Home = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-grocery-tracker");
  // console.log(cookie);

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
  // await getUserId();
  // const userId = await getUserId();
  console.log(userId);

  const user = await User.findById(userId).lean();
  const userName = user.username;

  const data = await GroceryItem.find().lean();
  const groceryItems = JSON.parse(JSON.stringify(data));

  const createGroceryItem = async (formData) => {
    "use server";

    const data = Object.fromEntries(formData);

    const newItem = await new GroceryItem({ ...data, userId });
    await newItem.save();
    revalidatePath("/");
  };

  const deleteItem = async (id) => {
    "use server";

    await GroceryItem.findByIdAndDelete(id);

    revalidatePath("/");
  };

  return (
    <>
      <StoreItems
        groceryItems={groceryItems}
        userName={userName}
        createGroceryItem={createGroceryItem}
        deleteItem={deleteItem}
      />
    </>
  );
};

export default Home;
