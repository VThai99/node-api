const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/cartegoryRoutes");
const userRoutes = require("./src/routes/userRoutes");
const orderRoutes = require("./src/routes/orderRouter");
const brandRoutes = require("./src/routes/brandRoutes");
const importRoutes = require("./src/routes/importRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");
const authorize = require("./src/common/authorization/authorization-middleware");
require("dotenv").config();
const cors = require("cors");
var conn = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/image", express.static("src/image"));

app.use(function (req, res, next) {
  req.conn = conn;
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", authorize(), orderRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/import", importRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/rating", ratingRoutes);
module.exports = app;
