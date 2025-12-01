const fs = require("fs");
const path = require("path");
const rootPath = require("./../util/path");

const p = path.join(rootPath, "data", "products.json");
const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(productData) {
    this.title = productData.title;
    this.imageUrl = productData.imageUrl;
    this.price = productData.price;
    this.description = productData.description;
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};
