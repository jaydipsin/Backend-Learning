
const productController = require("../controllers/product.js");

const express = require("express");
const router = express.Router();

router.get("/add-product", productController.getAddProductPage);

router.post("/add-product", productController.postAddProduct);

module.exports = router;
