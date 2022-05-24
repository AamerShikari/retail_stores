const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // referencing a model
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // referencing a model
});

module.exports = mongoose.model("shoppingCart", shoppingCartSchema);
