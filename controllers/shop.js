const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
    console.log(product);
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchAllProducts((cartProducts) => {
    Product.fetchAll((products) => {
      const prods = products.filter((p) => {
        return cartProducts.products.filter((prod) => prod.id === p.id);
      });
      console.log(prods);

      res.render("shop/cart", {
        prods,
        path: "/cart",
        pageTitle: "Your Cart",
      });
    });
  });
};

exports.postProductToCart = (req, res, next) => {
  const id = req.body.productId;
  const price = +req.body.price;
  Cart.addProductToCart(id,price);
  res.redirect("/");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
