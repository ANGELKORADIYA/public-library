const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["member", "librarian", "admin"],
    default: "member",
  },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});


module.exports.loginModel = mongoose.model("login", loginSchema);
