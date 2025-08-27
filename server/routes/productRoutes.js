const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

const { protect, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create Product - Admin Only
router.post("/", protect, adminMiddleware, createProduct);

// 🔓 Get All Products - Public
router.get("/", getAllProducts);

// 🔓 Get Single Product by ID - Public
router.get("/:id", getProductById);

module.exports = router;
