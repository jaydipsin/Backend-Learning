const Product = require("../models/product");

exports.getCartProducts = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle:"Cart"
  });
};

exports.checkOutCart = (req, res, next) => {
  res.render("shop/check-out", {
    path: "/check-out",
    pageTitle:"Check out"
  });
};

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll((productsArr) => {
    const products = productsArr;
    res.render("shop/index", {
      prod: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getAllProduct = (req, res, next) => {
  Product.fetchAll((productsArr) => {
    const products = productsArr;
    res.render("shop/products-list", {
      prod: products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};