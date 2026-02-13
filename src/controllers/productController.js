const Product = require("../models/Product");

// add product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      userId: req.userId,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      message: "Product added successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error adding product",
      error: err.message,
    });
  }
};

// list my products
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({
      status: "success",
      message: "Products retrieved successfully",
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving products",
      error: err ? err.message : "Unknown error",
    });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found or not authorized",
      });
    }

    res.json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error deleting product",
      error: err ? err.message : "Unknown error",
    });
  }
};
