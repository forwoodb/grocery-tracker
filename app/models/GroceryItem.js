import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: Number,
  priceType: String,
  brand: String,
  size: Number,
  units: String,
  location: String,
  inList: {
    type: Boolean,
    default: false,
  },
  inKitchen: {
    type: Boolean,
    default: false,
  },
  inMeal: {
    type: Boolean,
    default: false,
  },
  kitchenAmount: {
    type: Number,
    default: 0,
  },
  kitchenPrice: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.GroceryItem ||
  mongoose.model("GroceryItem", groceryItemSchema);
