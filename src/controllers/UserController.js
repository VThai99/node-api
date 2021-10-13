const bcrypt = require("bcryptjs");
const e = require("express");
const jwt = require("jsonwebtoken");
const createAccount = async (req, res, next) => {
  try {
    var db = req.conn;
    var email = req.body.email;
    const hashPass = await bcrypt.hash(req.body.password, 12);
    var data = {
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    };
    let checkEmail = db.query(
      "select * from user where `email` =?",
      email,
      (err, respond) => {
        if (err) console.log("error");
        else {
          if (respond.length > 0) {
            res.send({
              status: 402,
              message: "Email already registed",
            });
          } else {
            let results = db.query(
              "insert into user set ?",
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
const getAllUser = async (req, res, next) => {
  try {
    var db = req.conn;
    let results = db.query("select * from  user", (err, respond) => {
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
const hashPass = async (value) => {
  return await bcrypt.hash(value, 12);
};
const login = async (req, res, next) => {
  try {
    var db = req.conn;
    var email = req.body.email;
    var password = req.body.password;
    let results = await db.query(
      "SELECT * FROM user WHERE `email`=?",
      email,
      (err, respond) => {
        if (err) {
          res.send({
            status: 404,
            message: "something wrong",
          });
        } else {
          if (respond.length > 0) {
            bcrypt.compare(password, respond[0].password, (err, ress) => {
              if (!ress) {
                res.send({
                  status: false,
                  message: " Email or Password does not match",
                });
              } else {
                const theToken = jwt.sign(
                  { id: respond[0].id },
                  "the-super-strong-secrect",
                  { expiresIn: "1h" }
                );
                res.send({
                  status: 200,
                  message: "ok",
                  data: respond,
                  token: theToken,
                });
              }
            });
          } else {
            res.send({
              status: 404,
              message: "Invalid email address",
            });
          }
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createAccount,
  getAllUser,
  login,
};
