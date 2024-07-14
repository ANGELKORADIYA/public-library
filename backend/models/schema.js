const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["citizen", "police", "admin"],
    default: "citizen",
  },
});


module.exports.loginModel = mongoose.model("login", loginSchema);
