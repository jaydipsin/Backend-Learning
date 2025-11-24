const path = require("path");
const rootDir = require("../util/path.js");


const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res) => {
  console.log("BODY =>", req.body);
  res.send("Received");
});

module.exports = router;
