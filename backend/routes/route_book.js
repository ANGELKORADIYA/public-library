const express = require("express");
const route_book = express.Router();

const { addbook,getbooks,getallbooks,checkout,checkouttt ,updatebook,deletebook,returnbook} = require("../controllers/book");

route_book.post("/addbook", addbook);
route_book.post("/getbooks", getbooks);
route_book.post("/updatebook", updatebook);
route_book.post("/deletebook", deletebook);


route_book.post("/getallbooks", getallbooks);
route_book.post("/checkout", checkout);
route_book.post("/checkouttt", checkouttt);
module.exports.route_book = route_book;
