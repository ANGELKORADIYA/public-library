const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');

const { route_login } = require("./routes/route_login");
<<<<<<< HEAD
=======
const { route_book } = require("./routes/route_book");
>>>>>>> 7084703a624126200949995784e3393b0ee3f8a7
const { tokenverification } = require("./middlewares/tokenverification");
const connectDB  = require("./config/db");



connectDB();
app.use(express.json({ limit: '10mb' }));
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/',route_login)
app.use(tokenverification)
<<<<<<< HEAD
=======
app.use('/book',route_book)
>>>>>>> 7084703a624126200949995784e3393b0ee3f8a7

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on ${process.env.baseUrl} at ${process.env.PORT}`);
});
