const getAllCategory = async (req, res, next) => {
  try {
    var db = req.conn;
    let results = db.query("select * from category", (err, respond) => {
      if (err) console.log("error");
      else {
        res.send({
          status: 200,
          message: "Success",
          data: respond,
        });
      }
    });
  } catch (err) {
    res.send({
      message: "Something wrong",
    });
  }
};
const createCategory = async (req, res, next) => {
  try {
    var db = req.conn;
    var data = {
      name: req.body.name,
      image: req.file.path,
    };
    let results = db.query(
      "insert into category set ?",
      [data],
      (err, resopond) => {
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
      message: "something wrong",
    });
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    var db = req.conn;
    var id = req.params.id;
    let checkExist = db.query(
      "select * from category where id = ?",
      id,
      (err, results) => {
        if (err) console.log("error check exist");
        else {
          if (results.length <= 0) {
            res.send({
              status: 404,
              message: "not exist",
            });
          } else {
            let results = db.query(
              "delete from category where id = ?",
              id,
              (err, respond) => {
                if (err) console.log("error query");
                else {
                  let deleteAllProduct = db.query(
                    "delete from product where cate_id = ?",
                    id,
                    (err, deleteProduct) => {
                      if (err)
                        console.log("error when delete product with cate id");
                      else {
                        res.send({
                          status: 200,
                          message: "Delete success",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.send({ message: "something wrong" });
  }
};
const updateCategory = async (req, res, next) => {
  try {
    var db = req.conn;
    var id = req.params.id;
    var dataUpdate = {
      name: req.body.name,
      image: req.file.path,
    };
    let checkExist = db.query(
      "select * from category where id = ?",
      id,
      (err, results) => {
        if (err) console.log("error check exist");
        else {
          if (results.length <= 0) {
            res.send({
              status: 404,
              message: "not exist",
            });
          } else {
            let updateQuery = db.query(
              "update category set ? where id = ?",
              [dataUpdate, id],
              (err, responds) => {
                if (err) console.log("error uodate query");
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
  } catch (err) {
    res.send({
      message: "something wrong",
    });
  }
};
const getProductInCate = async (req, res, next) => {
  try {
    var db = req.conn;
    var id = req.params.id;
    let checkExist = db.query(
      "select * from category where id = ?",
      id,
      (err, cate) => {
        if (err) console.log("error check exist");
        else {
          if (cate.length <= 0) {
            res.send({
              status: 404,
              message: "not exist",
            });
          } else {
            let updateQuery = db.query(
              "select * from product where cate_id = ?",
              id,
              (err, products) => {
                if (err) console.log("error query");
                else {
                  res.send({
                    status: 200,
                    message: "update success",
                    data: {
                      category: cate[0],
                      product: products,
                    },
                  });
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.send({ message: "something wrong" });
  }
};
module.exports = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getProductInCate
};
