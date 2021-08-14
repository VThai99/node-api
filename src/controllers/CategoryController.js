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

module.exports = {
    getAllCategory,
}