const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/cartegoryRoutes");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lear_node",
});

conn.connect(function (err) {
  if (err) console.log("err connect to db");
  console.log("connect success");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieparser());

app.use("/image", express.static("src/image"));

app.use(function (req, res, next) {
  req.conn = conn;
  next();
});
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
module.exports = app;
