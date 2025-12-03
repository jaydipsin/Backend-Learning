const fs = require("fs");
const path = require("path");

const Products = require("../models/product");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
getFileData = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb({ products: [], totalPrice: 0 });
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class cart {
  productDetail;
  static addProductToCart(id) {
    getFileData((cartProducts) => {
      console.log(cartProducts);
      this.findProductFromFile(id);
      let exsistingProduct;
      if (cartProducts?.products?.length) {
        exsistingProduct = cartProducts.products.find((p) => p.id === id);
      }

      if (exsistingProduct) {
        exsistingProduct.quantity += 1;
        cartProducts.totalPrice +=
          this.productDetail.price * exsistingProduct.quantity;
      } else {
        cartProducts.products.push({
          id,
          quantity: 1,
          price: this.productDetail.price,
        });
        cartProducts.totalPrice += this.productDetail.price;
      }
      fs.writeFile(p, JSON.stringify(cartProducts), (err) => {
        console.log(err);
      });
    });
  }

  static findProductFromFile(id) {
    Products.findById(id, (product) => (this.productDetail = product));
    return this.productDetail;
  }

  static fetchAllProducts(cb) {
    getFileData(cb);
  }
};
