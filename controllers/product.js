const products = [];

exports.getAddProductPage = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  products.push(req.body);
  res.redirect("/");
};

exports.getAllProduct = (req, res, next) => {
  res.render("shop", {
    prod:products,
    pageTitle: "Shop",
    path: "/",
    hasProduct: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
