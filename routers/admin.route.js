const adminController = require("../controllers/admin.js");

const express = require("express");
const router = express.Router();

router.get("/add-product", adminController.getAddProductPage);

router.get("/products", adminController.getAllProduct);

router.post("/add-product", adminController.postAddProduct);

module.exports = router;
