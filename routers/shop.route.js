const shopController = require("../controllers/shop.js");

const express = require("express");
const router = express.Router();
// For the home page
router.get("/", shopController.getIndexPage);
// For the products list page
router.get("/products", shopController.getAllProduct);
// For the product detail page
router.get("/products", shopController.getAllProduct);
// For the cart page
router.get("/cart", shopController.getCartProducts);
// For the check out page
router.get("/check-out", shopController.checkOutCart);
// For the orders page
router.get("/orders", shopController.getOrdersPage);

module.exports = router;
