const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: String,
    price: Number,
    rating: Number,
    discount: Number,
    availability: String,
    category: String,
    company: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
