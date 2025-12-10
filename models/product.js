const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    try {
      cb(JSON.parse(fileContent));
    } catch (err) {
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const exsistingProduct = products.findIndex((p) => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[exsistingProduct] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      console.log("Product : ", product);
      cb(product);
    });
  }

  static deleteById(id, cb) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((p) => p.id !== id);
      try {
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) {
            console.log("Error while writing file", err);
          }
        });
        return cb();
      } catch (error) {
        console.log(err);
      }
    });
  }

  static editProduct(product) {
    const id = product.id;
    this.findById(id, (res) => {});
  }
};
