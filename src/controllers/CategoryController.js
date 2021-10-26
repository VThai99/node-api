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
const getAllImage = async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:Assets")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
};

const uploadImage = (req, res, next) => {
    console.log(req.file);
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
module.exports = {
  getAllCategory,
  createCategory,
  getAllImage,
  uploadImage,
};
