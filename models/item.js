const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
      name: String,
      quantity: Number,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
      store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store'}, // referencing a model
      price: Number,
      isPurchased: Boolean,
      photoUrl: String, // string from aws!
    }
  );

module.exports = mongoose.model("Item", itemSchema);
