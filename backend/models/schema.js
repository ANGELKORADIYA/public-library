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
<<<<<<< HEAD


module.exports.loginModel = mongoose.model("login", loginSchema);
=======
const bookSchema = new mongoose.Schema({
  createdBy:{type:mongoose.Types.ObjectId,ref:"login"},
  isbn: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  quantity: { type: Number, required: true },
  images:{type:Array,require:true}
});

const bookModel = mongoose.model("Book", bookSchema);
module.exports.loginModel = mongoose.model("login", loginSchema);
module.exports.bookModel = bookModel;

>>>>>>> 7084703a624126200949995784e3393b0ee3f8a7
