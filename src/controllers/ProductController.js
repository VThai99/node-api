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
      image: req.file.path,
      price: req.body.price,
      cate_id: req.body.cate_id,
      quantity: req.body.quantity,
    };
    let checkExisCate = db.query(
      "select * from category where id = ?",
      req.body.cate_id,
      (err, cate) => {
        if (err) console.log("error query cate exist");
        else {
          if (cate.length <= 0) {
            res.send({
              status: 404,
              message: "cate id can't found",
            });
          } else {
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
          }
        }
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
      image: req.file.path,
      price: req.body.price,
      cate_id: req.body.cate_id,
      quantity: req.body.quantity,
    };
    let checkExist = db.query(
      "select * from product where id = ?",
      id,
      (err, results) => {
        if (err) console.log("error check exist");
        else {
          if (results.length <= 0) {
            res.send({
              status: 404,
              message: "product not exist",
            });
          } else {
            let checkExisCate = db.query(
              "select * from category where id = ?",
              req.body.cate_id,
              (err, cate) => {
                if (err) console.log("error query cate exist");
                else {
                  if (cate.length <= 0) {
                    res.send({
                      status: 404,
                      message: "cate id can't found",
                    });
                  } else {
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
                  }
                }
              }
            );
          }
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
