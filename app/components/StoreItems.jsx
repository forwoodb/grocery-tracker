"use client";
import { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function StoreItems({
  groceryItems,
  userName,
  createGroceryItem,
  deleteItem,
}) {
  const [groceryItem, setGroceryItem] = useState({
    itemName: "",
    price: "",
    priceType: "",
    brand: "",
    size: "",
    units: "",
    location: "",
    inList: false,
  });
  const [editItem, setEditItem] = useState(false);
  const [updateItem, setUpdateItem] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroceryItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editItemID = (item) => {
    setEditItem(true);
    setGroceryItem(item);
    setUpdateItem(item._id);
  };

  const handleLogout = () => {
    fetch("/api/auth/logout");
    router.push("/login");
  };

  const handleCheckbox = (id) => {
    const list = groceryItems.map((item) => {
      if (item._id === id) {
        item.inList = !item.inList;
      }
      return item;
    });
    setGroceryItems(list);
  };

  const addToList = () => {
    let groceryList = groceryItems.filter((item) => {
      if (item.inList === true) {
        return item;
      }
    });

    fetch("/api/tracker/grocery", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(groceryList),
    });

    router.push("/shopping");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between">
          <p>Hello {userName}</p>
          <Button click={handleLogout}>Log Out</Button>
        </div>

        <ItemForm
          edit={editItem}
          item={groceryItem}
          change={handleChange}
          submit={createGroceryItem}
        />
        <div className="bg-base-100 rounded-xl shadow-md p-6">
          <Button click={addToList} className="btn btn-warning">
            Add Checked Items to List
          </Button>
          <table className="table table-sm table-pin-rows">
            {/* <table> */}
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Price</th>
                <th>Price Type</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Location</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groceryItems
                .sort((a, b) => {
                  return a.itemName.localeCompare(b.itemName);
                })
                .map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckbox(item._id)}
                        />
                      </td>
                      <td>{item.itemName}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.priceType}</td>
                      <td>{item.brand}</td>
                      <td>{item.size}</td>
                      <td>{item.location}</td>
                      <td>
                        <Button click={() => editItemID(item)}>Edit</Button>
                      </td>
                      <td>
                        <Button
                          click={() => deleteItem(item._id)}
                          className="bg-red-700 text-white"
                        >
                          Delete
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
}
