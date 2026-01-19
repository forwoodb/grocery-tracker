"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import Counter from "../components/Counter";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [userName, setUserName] = useState("");
  // // Counter
  // const [count, setCount] = useState(1);

  const router = useRouter();

  const fetchData = () => {
    fetch("/api/tracker/shopping", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const list = data.map((item) => {
          return {
            ...item,
            shoppingCount: 1,
          };
        });
        // console.log(list);
        setShoppingItems(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeFromList = (id) => {
    fetch(`/api/tracker/shopping/${id}`, {
      method: "PUT",
    });

    const list = shoppingItems.filter((item) => {
      if (item._id !== id) {
        return item;
      }
    });
    setShoppingItems(list);
  };

  const handleCheckbox = (id) => {
    const list = shoppingItems.map((item) => {
      if (item._id === id) {
        item.inKitchen = !item.inKitchen;
      }
      return item;
    });
    setShoppingItems(list);
  };

  const addToKitchen = () => {
    const list = shoppingItems.filter((item) => {
      if (item.inKitchen === true) {
        item.inList = false;
        item.kitchenAmount = item.size * count;
        item.kitchenPrice = item.price * count;
        console.log(item);

        return item;
      }
    });

    console.log(list);

    fetch("/api/tracker/shopping", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(list),
    });

    router.push("/kitchen");
  };

  const subtract = () => {
    setCount(Math.max(1, count - 1));
  };

  const add = (id) => {
    const list = shoppingItems.map((item) => {
      if (item._id === id) {
        let count = item.shoppingCount + 1;
        const price = item.price;
        const cost = price * count;
        const countItem = {
          ...item,
          shoppingCount: count,
        };
        console.log(item);

        return countItem;
      }
      return item;
    });
    // console.log(list);

    setShoppingItems(list);
  };

  // Get Total Cost
  let total = 0;
  for (let i = 0; i < shoppingItems.length; i++) {
    const item = shoppingItems[i];
    total = total + item.price * item.shoppingCount;
    console.log(item);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* <div className="flex justify-between">
          <p>Hello {userName}</p>
          <Button click={handleLogout}>Log Out</Button>
        </div> */}
        <div className="bg-base-100 rounded-xl shadow-md p-6">
          <h2 className="text-3xl  font-semibold mb-6 text-center">
            Shopping List
          </h2>
          <button onClick={addToKitchen} className="btn btn-warning">
            Add Checked Items to Kitchen
          </button>
          <table className="table table-sm table-pin-rows">
            <thead>
              <tr>
                <th></th>
                <th>Count</th>
                <th>Item</th>
                <th>Price</th>
                <th>Price Type</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shoppingItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox(item._id)}
                      />
                    </td>
                    <td>
                      <Counter
                        count={item.shoppingCount || 1}
                        add={() => add(item._id)}
                        subtract={subtract}
                      />
                    </td>
                    <td>{item.itemName}</td>
                    <td>${(item.price * item.shoppingCount).toFixed(2)}</td>
                    <td>{item.priceType}</td>
                    <td>{item.brand}</td>
                    <td>{item.size * item.shoppingCount}</td>
                    <td>{item.location}</td>
                    <td>
                      <Button
                        click={() => removeFromList(item._id)}
                        className="bg-red-700 text-white"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>${total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
