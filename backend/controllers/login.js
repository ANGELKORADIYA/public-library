const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { loginModel } = require("../models/schema");
/*
signup takes :-
  password
  confirmpassword
  companyname
*/
module.exports.signup = async function (req, res) {
  try {
    if (
      (req.body.password,
      req.body.confirmpassword && req.body.username && req.body.email)
    ) {
      if (req.body.password == req.body.confirmpassword) {
        let check = await loginModel.findOne({
          email: req.body.email.toLowerCase(),
        });
        if (check) {
          res
            .status(200)
            .json({ message: "There is existing email is there.", okk: false });
        } else {
          const created = await loginModel({
            email: req.body.email.toLowerCase(),
            password: await bcrypt.hash(
              req.body.password,
              Number(process.env.PASSWORD_KEY)
            ),
            username: req.body.username,
            role: req.body.role,
          });
          await created.save();
          res.status(200).json({ message: "Signed up Succesfully", okk: true });
        }
      } else {
        res
          .status(200)
          .json({ message: "password does not match", okk: false });
      }
    } else {
      res.status(200).json({ message: "field is missing", okk: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};

module.exports.login = async (req, res) => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    });
    let check = await loginModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (check && req.body.password != "" && req.body.email != "") {
      if (await bcrypt.compare(req.body.password, check.password)) {
        // if (req.body.page == check.page) {
        let token = jwt.sign({ email: check._id }, process.env.SECRET_KEY);
        res.cookie("token", token, { maxAge: 1000000, httpOnly: true });
        res
          .status(200)
          .json({ token: token, okk: true, message: "Logined Succesfully" });
        // } else {
        // res.status(200).json( "Not Acess";)
        // }
      } else {
        res
          .status(200)
          .json({ message: "email or password is wrong", okk: false });
      }
    } else {
      res.status(200).json({ message: "no email found", okk: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};

module.exports.email = async (req, res) => {
  try {
    let headd = req.headers;
    if (headd.token != "undefined" && headd.hasOwnProperty("token")) {
      const valid = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      const projection = { _id: 0, password: 0, __v: 0 };
      const result = await loginModel.findOne(
        { _id: valid.email },
        { projection }
      );
      if (result) {
        res
          .status(200)
          .json({ email: result.email, role: result.role, okk: true });
      } else {
        res.status(200).json({ message: "no email found", okk: false });
      }
    } else {
      res.status(401).json({ message: "no token", okk: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};

module.exports.signout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date() }).json(`sign outed`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};

//token = req.cookies.token
module.exports.valid = async (req, res) => {
  try {
    if (req.headers.hasOwnProperty("token")) {
      const valid = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      const projection = { _id: 0, password: 0, __v: 0 };
      const result = await loginModel.findOne(
        { _id: new ObjectId(valid.email) },
        { projection }
      );
      if (result) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};

module.exports.tokenemail = async (req, res) => {
  try {
    let headd = req.headers;
    if (headd.hasOwnProperty("token")&&headd.token != "undefined") {
      const valid = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      const projection = { _id: 0, password: 0, __v: 0 };
      const result = await loginModel.findOne(
        { _id: valid.email },
        { projection }
      );
      if (result) {
        return { tokentoemail: result.email, tokentoid: valid.email };
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};
