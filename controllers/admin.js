// const e = require("express");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    product: {},
  });
};

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, (p) => {
    res.render("admin/add-edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: p,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const product = addEditProductPayload(req);
  product.save();
  res.redirect("/");
};

exports.postAddProduct = (req, res, next) => {
  const product = addEditProductPayload(req);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.deleteById(id, () => {
    Cart.deleteProductFromCart(id);
  });
  res.redirect("/admin/products");
};

addEditProductPayload = (req) => {
  let id = req.body.id;

  if (!id) {
    id = null;
  }

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  return (product = new Product(id, title, imageUrl, description, price));
};
