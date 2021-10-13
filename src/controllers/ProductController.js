const getAllProduct = async (req, res, next) => {
  try {
    var db = req.conn;
    let results = db.query("select * from product", (err, respond) => {
      if (err) console.log("error");
      else
        res.send({
          status: 200,
          message: "success",
          data: respond,
        });
    });
  } catch (err) {
    res.send({
      message: "Something wrong",
    });
  }
};
const createProduct = async (req, res, next) => {
  try {
    var db = req.conn;
    var data = {
      name: req.body.name,
      image: `/image/${req.file.filename}`,
      price: req.body.price,
    };
    let results = db.query(
      "insert into product set ?",
      [data],
      (err, respond) => {
        if (err) console.log("error");
        else
          res.send({
            status: 200,
            message: "create success",
          });
      }
    );
  } catch (err) {
    res.send({
      message: "Something wrong",
    });
  }
};
const getProductId = async (req, res, next) => {
  try {
    var db = req.conn;
    let id = req.params.id;
    let results = db.query(
      `select * from product where id = ${id}`,
      (err, respond) => {
        if (err) console.log("error");
        else {
          res.send({
            status: 200,
            message: "success",
            data: respond,
          });
        }
      }
    );
  } catch (err) {
    res.send({
      message: "Something wrong",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    var db = req.conn;
    let id = req.params.id;
    var data = {
      name: req.body.name,
      image: `/image/${req.file.filename}`,
      price: req.body.price,
    };
    let results = db.query(
      `update product set ? where id = ?`,
      [data, id],
      (err, respond) => {
        if (err) console.log("error");
        else {
          res.send({
            status: 200,
            message: "update success",
          });
        }
      }
    );
  } catch (err) {
    res.send({
      message: "Something wrong",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    var db = req.conn;
    var id = req.params.id;
    let results = db.query(
      "delete from product where id = ?",
      id,
      (err, respond) => {
        if (err) console.log("Error");
        else {
          res.send({
            status: 200,
            message: "Delete success",
          });
        }
      }
    );
  } catch (err) {
    res.send({
      message: "Something wrong",
    });
  }
};
module.exports = {
  getAllProduct,
  createProduct,
  getProductId,
  updateProduct,
  deleteProduct,
};
