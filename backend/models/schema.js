const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
const bookSchema = new mongoose.Schema({
  createdBy: { type: ObjectId, ref: "login" },
  isbn: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  quantity: { type: Number, required: true },
  images: { type: Array, require: true },
});

const checkoutSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      isbn: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      checkoutDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
      returnDate: {
        type: Date,
        required: true,
      },
      returned: {
        type: Boolean,
        default: false,
      },
      fines: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  ],
 
 
});

module.exports.loginModel = mongoose.model("login", loginSchema);
module.exports.bookModel = mongoose.model("Book", bookSchema);
module.exports.checkoutModel = mongoose.model("Checkout", checkoutSchema);
