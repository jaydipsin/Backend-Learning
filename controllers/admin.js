const Product = require("../models/product");

exports.getAddProductPage = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const productData = {
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  };
  console.log("This is the product : ", productData);

  const product = new Product(productData);
  product.save();
  res.redirect("/shop/products");
};

exports.getAllProduct = (req, res, next) => {
  Product.fetchAll((productsArr) => {
    const products = productsArr;
    res.render("admin/product-list", {
      prod: products,
      pageTitle: "Admin",
      path: "/admin/products",
    });
  });
};
