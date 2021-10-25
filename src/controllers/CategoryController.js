// const cloudinary = require('cloudinary').v2
// const streamifier = require('streamifier')
// cloudinary.config({ 
//   cloud_name: 'cloudygod', 
//   api_key: '334367223732826', 
//   api_secret: 'Bjfc6cm80qPbwqkjP2d2QOggwfc'
// });
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
    console.log(req);
    // cloudinary.uploader.upload(req.file.path).then((ress)=>{
    //   res.send({
    //     message: 'success',
    //     data: ress
    //   })
    // }).catch((errr)=>{
    //   res.send({
    //     status: 500,
    //     message: 'failure'
    //   })
    // })

    // aaaaa
    
    // var data = {
    //   name: req.body.name,
    //   logo: `/image/${req.file.filename}`,
    //   video: 'adfdf',
    // };
    // console.log(req.file);
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
