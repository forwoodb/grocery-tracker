"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Counter from "../components/Counter";

const Kitchen = () => {
  const [kitchenItems, setKitchenItems] = useState([]);
  const [mealItems, setMealItems] = useState([]);

  const fetchData = () => {
    fetch("/api/tracker/kitchen", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKitchenItems(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeFromKitchen = (id) => {
    console.log(id);
    fetch(`/api/tracker/kitchen/${id}`, {
      method: "PUT",
    });

    const list = kitchenItems.filter((item) => {
      if (item._id !== id) {
        return item;
      }
    });

    setKitchenItems(list);
  };

  const handleCheckbox = (id) => {
    const list = kitchenItems.map((item) => {
      if (item._id === id) {
        item.inMeal = !item.inMeal;
      }
      return item;
    });
    console.log(list);
  };

  const addToMeal = () => {
    const list = kitchenItems
      .filter((item) => {
        if (item.inMeal) {
          return item;
        }
      })
      .map((item) => {
        return {
          ...item,
          mealAmount: 0,
          mealCost: 0,
        };
      });
    setMealItems(list);
  };

  const count = (id, mode) => {
    const list = mealItems.map((item) => {
      if (item._id === id) {
        const unitCost = item.kitchenPrice / item.kitchenAmount;
        let amount = item.mealAmount;

        if (mode === "add") {
          amount = amount + 1;
        } else {
          amount = amount - 1;
        }
        // const amount = item.mealAmount + 1;
        const cost = amount * unitCost;

        return {
          ...item,
          mealAmount: amount,
          mealCost: cost,
        };
      }
      return item;
    });
    setMealItems(list);
  };

  const increaseMealItemAmount = (id) => {
    count(id, "add");
  };

  const decreaseMealItemAmount = (id) => {
    count(id, "subtract");
  };

  let total = 0;
  for (let i = 0; i < mealItems.length; i++) {
    const item = mealItems[i];
    total = total + item.mealCost;
    console.log(item.mealCost);
  }
  console.log(total);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* <div className="flex justify-between">
          <p>Hello {userName}</p>
          <Button click={handleLogout}>Log Out</Button>
        </div> */}
        <div className="bg-base-100 rounded-xl shadow-md p-6">
          <h2 className="text-3xl  font-semibold mb-6 text-center">Meal</h2>
          <Button onClick={addToMeal} className="btn btn-warning">
            Eat
          </Button>
          <table className="table table-sm table-pin-rows">
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Amount</th>
                <th>Cost</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mealItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox(item._id)}
                      />
                    </td>
                    <td>{item.itemName}</td>
                    <td>
                      <Counter
                        count={item.mealAmount}
                        units={item.units}
                        subtract={() => decreaseMealItemAmount(item._id)}
                        add={() => increaseMealItemAmount(item._id)}
                      />
                    </td>
                    <td>${item.mealCost.toFixed(2)}</td>
                    <td>{item.brand}</td>

                    <td>
                      <Button
                        click={() => removeFromKitchen(item._id)}
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
                <td>${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        {/* <div className="flex justify-between">
          <p>Hello {userName}</p>
          <Button click={handleLogout}>Log Out</Button>
        </div> */}
        <div className="bg-base-100 rounded-xl shadow-md p-6">
          <h2 className="text-3xl  font-semibold mb-6 text-center">Kitchen</h2>
          <Button click={addToMeal} className="btn btn-warning">
            Add Checked Items to Meal
          </Button>
          <table className="table table-sm table-pin-rows">
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Size</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {kitchenItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox(item._id)}
                      />
                    </td>
                    <td>{item.itemName}</td>
                    <td>{item.kitchenPrice}</td>
                    <td>{item.brand}</td>
                    <td>
                      {item.kitchenAmount} {item.units}
                    </td>
                    <td>
                      <Button
                        click={() => removeFromKitchen(item._id)}
                        className="bg-red-700 text-white"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Kitchen;
