const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  addProduct,
  getMyProducts,
  deleteProduct,
} = require("../controllers/productController");

router.post("/products", auth, addProduct);
router.get("/products", auth, getMyProducts);
router.delete("/products/:id", auth, deleteProduct);

module.exports = router;
