import React from "react";
import Form from "next/form";

const ItemForm = ({ edit, item, change, submit }) => {
  return (
    <>
      <div className="bg-base-100 rounded-xl shadow-md p-6 mb-3">
        <h2 className="text-3xl  font-semibold mb-6 text-center">
          {edit ? "Edit Item" : "Store Items"}
        </h2>
        <Form action={submit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="
                flex 
                flex-col 
                gap-1
                "
            >
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                required
                type="text"
                name="itemName"
                id="itemName"
                defaultValue={item.itemName}
                // onChange={change}
                className="input input-warning w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="font-medium">
                Price
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  name="price"
                  id="price"
                  defaultValue={item.price}
                  className="
                    input 
                    input-warning 
                    w-full
                  "
                />
                <select
                  className="select select-warning w-28"
                  name="priceType"
                  id="priceType"
                  defaultValue={item.priceType}
                >
                  <option value="">type</option>
                  <option value="regular">regular</option>
                  <option value="sale">sale</option>
                  <option value="coupon">coupon</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="brand" className="font-medium">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                defaultValue={item.brand}
                className="input input-warning w-full"
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="
                input-group 
                flex 
                flex-col 
                gap-1
              "
            >
              <label htmlFor="name" className="font-medium">
                Size
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="size"
                  id="size"
                  defaultValue={item.size}
                  className="input input-warning w-full"
                />
                <select
                  className="select select-warning w-28"
                  name="units"
                  id="units"
                  defaultValue={item.units}
                >
                  <option value="units">units</option>
                  <option value="servings">servings</option>
                  <option value="oz">oz</option>
                  <option value="tbsp">tbsp</option>
                  <option value="lbs">lbs</option>
                  <option value="gal">gal</option>
                  <option value="ml">ml</option>
                  <option value="l">l</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                defaultValue={item.location}
                className="input input-warning w-full"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-start pt-4">
            <button className="btn btn-warning px-8">
              {edit ? "Update" : "Add"} Item
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ItemForm;
