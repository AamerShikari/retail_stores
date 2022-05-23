const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, lowercase: true, unique: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}], // referencing a model
      photoUrl: String, // string from aws!
    }
  );

module.exports = mongoose.model("Store", storeSchema);
