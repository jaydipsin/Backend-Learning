const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error.js");

const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routers/admin.route.js");
const shopRoutes = require("./routers/shop.route.js");
const { error } = require("./controllers/error.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/", (req, res) => {
  res.redirect("/shop");
});

// Error handling
app.use(errorController.get404);

app.listen(3000);
