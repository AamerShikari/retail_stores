const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, lowercase: true, unique: true },
      quantity: Number,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
      store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store'}, // referencing a model
      price: Number,
      isPurchased: Boolean,
      photoUrl: String, // string from aws!
    }
  );

module.exports = mongoose.model("Item", itemSchema);
