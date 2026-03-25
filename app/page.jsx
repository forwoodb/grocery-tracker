import StoreItems from "./components/StoreItems";
import { getUserId } from "./lib/functions";
import GroceryItem from "./models/GroceryItem";
import User from "./models/User";

const Page = async () => {
  // await getUserId();
  const userId = await getUserId();

  const user = await User.findById(userId).lean();
  const userName = user.username;
  console.log(userName);

  const data = await GroceryItem.find().lean();
  const groceryItems = JSON.parse(JSON.stringify(data));

  return (
    <>
      {/* <StoreItems /> */}
      <StoreItems groceryItems={groceryItems} userName={userName} />
    </>
  );
};

export default Page;
