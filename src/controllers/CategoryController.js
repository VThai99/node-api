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
      logo: req.file.filename,
      trailer: req.file.filename,
    };
    console.log(data);
    // let results = db.query(
    //   "insert into category set ?",
    //   [data],
    //   (err, resopond) => {
    //     if (err) console.log("error");
    //     else
    //       res.send({
    //         status: 200,
    //         message: "create success",
    //       });
    //   }
    // );
  } catch (err) {
    res.send({
      message: "something wrong",
    });
  }
};
module.exports = {
  getAllCategory,
  createCategory
};
