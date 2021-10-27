const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/cartegoryRoutes");
const userRoutes = require("./src/routes/userRoutes");
require('dotenv').config()
const cors = require("cors");
var conn = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bddaf688c4a62a",
  password: "730c2465",
  database: "heroku_62ef357af56d406",
});
// mysql://bddaf688c4a62a:730c2465@us-cdbr-east-04.cleardb.com/heroku_62ef357af56d406?reconnect=true
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
// app.use("/api/product", productRoutes);
// app.use("/api/category", categoryRoutes);

module.exports = app;
