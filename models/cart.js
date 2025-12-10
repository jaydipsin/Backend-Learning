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
  static addProductToCart(id, price) {
    getFileData((cartProducts) => {
      let exsistingProduct;
      if (cartProducts?.products?.length) {
        exsistingProduct = cartProducts.products.find((p) => p.id === id);
      }

      if (exsistingProduct) {
        exsistingProduct.quantity += 1;
        cartProducts.totalPrice += price;
      } else {
        cartProducts.products.push({
          id,
          quantity: 1,
          price,
        });
        cartProducts.totalPrice += price;
      }
      fs.writeFile(p, JSON.stringify(cartProducts), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAllProducts(cb) {
    getFileData(cb);
  }

  static deleteProductFromCart(id, cd) {
    getFileData((cartProducts) => {
      const product = cartProducts.products.find((p) => p.id === id);
      if (!product) return;
      const productQty = product.quantity;
      const productPrice = product.price;
      cartProducts.totalPrice -= productPrice * productQty;
      cartProducts.products = cartProducts.products.filter((p) => p.id !== id);
      console.log("p : ", cartProducts);
      fs.writeFile(p, JSON.stringify(cartProducts), (err) => {
        console.log(err);
      });
    });
    return cd();
  }
};
