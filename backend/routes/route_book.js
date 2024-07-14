const express = require("express");
const route_book = express.Router();

const { addbook,getallbooks } = require("../controllers/book");

route_book.post("/addbook", addbook);
route_book.post("/getallbooks", getallbooks);

module.exports.route_book = route_book;
